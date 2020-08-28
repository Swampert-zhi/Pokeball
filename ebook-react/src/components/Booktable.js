import React from "react";
import {Table, Input, Button, Divider, notification, Upload, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import '../css/Table.css'
import { SearchOutlined,PlusOutlined} from '@ant-design/icons';
import {getBooks,postBook,deleteBook,addBook} from "../services/BookService";
import {imageTransform} from "../services/Image";

class Booktable extends React.Component {
    state = {
        dataSource:null,
        searchText: '',
        searchedColumn: '',
        editable:false,
        isRowOpen: false, //当前是否处于编辑状态（有且只有一行可编辑）
        locale: {
            emptyText: "暂无数据"
        },
        editCacheData: [],
        previewVisible:false,
        previewImage: '',
        previewTitle: '',
        fileList:[]
    };

    componentDidMount() {
        const callback =  (data) => {
            this.initRowType(data);
        };
        getBooks(callback);
    }

    initRowType(data) {
        for (let item of data) {
            item["type"] = "view";
        }
        this.updateDataSource(data);
    }

    updateDataSource(newData, isAddDisabled) {
        let isRowOpen =
            typeof isAddDisabled == "boolean"
                ? isAddDisabled
                : newData.some(item => item.type === "new" || item.type === "edit");
        this.setState({
            isRowOpen,
            dataSource: newData
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input ref={node => {this.searchInput = node;}}
                       placeholder={`Search ${dataIndex}`}
                       value={selectedKeys[0]}
                       onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                       onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                       style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#ffeb37' : 'white' }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text,record) => {
            if(record.type==="view"){
                return (this.state.searchedColumn === dataIndex ? (
                        <Highlighter
                            highlightStyle={{ backgroundColor: '#bddcff', padding: 0 }}
                            searchWords={[this.state.searchText]}
                            autoEscape
                            textToHighlight={text.toString()}/>)
                    : (text))}
            else {
                switch(dataIndex){
                    case "title":return <Input  defaultValue={text} onChange={e => this.titleChange(e, record)} className="input"/>;
                    case "author":return <Input defaultValue={text} onChange={e => this.authorChange(e, record)} className="input"/>;
                    case "language":return <Input defaultValue={text} onChange={e => this.languageChange(e, record)} className="input"/>;
                    case "price":return <Input defaultValue={text} placeholder="不可为空" onChange={e => this.priceChange(e, record)} className="input"/>;
                    case "stock":return <Input defaultValue={text} placeholder="不可为空" onChange={e => this.stockChange(e, record)} className="input"/>;
                }
            }
        },
    });

    titleChange(e, record){
        this.updateEditCacheData(record, { title: e.target.value });
    }
    authorChange(e, record){
        this.updateEditCacheData(record, { author: e.target.value });
    }
    languageChange(e, record){
        this.updateEditCacheData(record, { language: e.target.value });
    }
    priceChange(e, record){
        this.updateEditCacheData(record, { price: e.target.value });
    }
    stockChange(e, record){
        this.updateEditCacheData(record, { stock: e.target.value });
    }
    isbnChange(e, record){
        this.updateEditCacheData(record, { isbn: e.target.value });
    }
    descChange(e, record){
        this.updateEditCacheData(record, { description: e.target.value });
    }
    imageChange(e,record){
        this.updateEditCacheData(record, { image: e.target.value });
    }

    edit(record) {
        let newData = this.state.dataSource.filter(item => {
            if (item.bookId === record.bookId) {
                item.type = "edit";
                return item;
            } else if (item.type !== "new") {
                item.type = "view";
                return item;
            }
        });
        this.updateDataSource(newData, true);
        this.setState({
            fileList:[{
                    uid: '-1',
                    name: record.title,
                    status: 'done',
                    url: imageTransform(record.image)
                }],
            editCacheData:record
        })
    }

    updateEditCacheData(record, obj) {
        let cacheData =
            record.bookId === this.state.editCacheData.bookId
                ? { ...this.state.editCacheData, ...obj }
                : { ...record, ...obj };
        this.setState({ editCacheData: cacheData});
    }
    editSubmit(record) {
        const callback =  (data) => {
            notification["success"]({ message: "修改成功！", duration: 1, placement: "bottomRight"});
        };
        // setTimeout(res => {
        //     //将cacheData更新到dataSource
            let newData = this.state.dataSource.map(item => {
                if (item.bookId === this.state.editCacheData.bookId) {
                    item = Object.assign({}, this.state.editCacheData);
                    item.type = "view";
                    postBook(this.state.editCacheData,callback);
                }
                return item;
            });
            record.type = "view";
            this.updateDataSource(newData);

        // }, 200);


    }

    delete(record) {
        const data = [...this.state.dataSource];
        this.setState({ dataSource: data.filter(item => item.bookId !== record.bookId) });
        deleteBook(record.bookId);
        notification["success"]({ message: "删除成功！",duration: 1, placement: "bottomRight"});
    }

    cancel(record){
        let editRow = this.state.dataSource.find(item => item.bookId === record.bookId);
        editRow.type = "view";
        this.updateDataSource(this.state.dataSource);
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleCancel=()=>{
        this.setState({previewVisible:false});
    }

    handlePreview = async file=>{
        this.setState({
            previewVisible:true,
            previewImage: file.url || file.thumbUrl,
            previewTitle: file.name
        })
    }

    beforeUpload = (file) => {
        console.log(this.state.editCacheData);

        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = e => {
            let newData = this.state.editCacheData;
            newData.image = e.target.result;
            // file.thumbUrl = e.target.result;
            this.setState({
                fileList:[{
                    uid:'-1',
                    name: this.state.previewTitle,
                    status: 'done',
                    url: e.target.result,
                }],
                editCacheData: newData,
            })
        };
        return false;
    }


    addRow = () => {
        let newdata = [...this.state.dataSource];
        let newRecord = {
            bookId:null,
            isbn:"",
            title: "",
            author: "",
            language: "",
            price: "",
            stock:"",
            type:"new",
            description:null,
        };

        newdata.push(newRecord);
        this.updateDataSource(newdata);
    };
    addSubmit(record) {

            let newdata = [...this.state.dataSource];
            this.state.editCacheData.type = "view";
            if(!this.state.editCacheData.hasOwnProperty("image"))
                this.state.editCacheData.image = null;

            const callback=(data)=>{
                this.state.editCacheData.bookId = data;
                notification["success"]({ message: "添加成功！" });
            }
            addBook(this.state.editCacheData,callback);

            newdata.pop();
            newdata.push(this.state.editCacheData);
            this.updateDataSource(newdata);
    }
    removeAdd(record) {
        let newdata = [...this.state.dataSource];
        newdata.pop();
        this.updateDataSource(newdata);
    }

    render() {
        const columns = [
            {
                title: '书名',
                dataIndex: 'title',
                key: 'title',
                width: '25%',
                ...this.getColumnSearchProps('title'),
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
                width: '20%',
                ...this.getColumnSearchProps('author'),
            },
            {
                title: '语言',
                dataIndex: 'language',
                key: 'language',
                width:'10%',
                ...this.getColumnSearchProps('language'),
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                width:'15%',
                sorter: {
                    compare: (a, b) => a.price - b.price,
                },
                ...this.getColumnSearchProps('price'),
            },
            {
                title: '库存',
                dataIndex: 'stock',
                key: 'stock',
                width:'10%',
                ...this.getColumnSearchProps('stock'),
            },
            {
                title: "操作",
                render: record => (
                    <span>
                {record.type === "new" && (
                    <span>
                <a href="javascript:;" onClick={e => this.addSubmit(record)}>
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.removeAdd(record)}>
                  取消
                </a>
                    </span>)}
                {record.type === "edit" && (
                    <span>
                <a href="javascript:;" onClick={e => this.editSubmit(record)}>
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.cancel(record)}>
                  取消
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
                    </span>)}
                {record.type === "view" && (
                    <span>
                <a href="javascript:;" onClick={e => this.edit(record)}>
                  编辑
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
                    </span>)}
                    </span>),
            }
        ];
        return (
            <div>
            <Button
            style={this.state.isRowOpen?{ marginBottom: "10px", color:"white",background:"#A6A6A6", border:'none'}
                                       :{ marginBottom: "10px", color:"white",background:"#2f9cfa", border:'none'}}
            disabled={this.state.isRowOpen}
            onClick={this.addRow}>
                添加
            </Button>
            <Table columns={columns}
                   dataSource={this.state.dataSource}
                   rowKey={record=>record.bookId}
                   pagination={{pageSize: 6}}
                   expandable={{
                       expandRowByClick:!this.state.isRowOpen,
                       expandedRowRender: (record) => record.type=="view"
                           ?<div>
                               <p>ISBN：{record.isbn}</p>
                               <p>简介：<br/>{record.description}</p>
                               <span>
                                   封面：
                                   <img src={imageTransform(record.image)}
                                        style={{width:120, height:150,marginLeft:10}}/>
                               </span>
                           </div>
                           :<div>
                               <p>ISBN：</p>
                               <Input placeholder="不可为空" defaultValue={record.isbn} onChange={e => this.isbnChange(e, record)} className="input"/>
                               <p>简介：</p>
                               <Input.TextArea
                                   autoSize={{minRows:4}}
                                   defaultValue={record.description}
                                   onChange={e => this.descChange(e, record)}
                                   className="input"/>
                                   <span style={{marginTop:20}}>
                                       封面：
                               <Upload
                                   beforeUpload={this.beforeUpload}
                                   listType="picture-card"
                                   fileList={this.state.fileList}
                                   onPreview={this.handlePreview}
                               >
                                   <div>
                                       <PlusOutlined />
                                       <div>Upload</div>
                                   </div>
                               </Upload>
                               <Modal
                                   visible={this.state.previewVisible}
                                   title={this.state.previewTitle}
                                   footer={null}
                                   onCancel={this.handleCancel}
                               >
                                   <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                               </Modal>
                                   </span>
                           </div>
                   }}/>
        </div>
        );
    }
}

export default Booktable
