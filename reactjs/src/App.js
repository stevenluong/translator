import React, { Component } from 'react';
import { Button,Grid, Row, Col,Table } from 'react-bootstrap';
//import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = io('https://translator-node.slapps.fr');

class App extends Component {
    constructor() {
        super();

        socket.emit('message', "hello from client");
        this.state = {
            serverOK: false,
            file:'',
            imagePreviewUrl: '',
            readyToSubmit: false,
            result:[],
            status:''
        };

        socket.on('status', (status) => {
            console.log("status",status);
            this.setState({serverOK : true}); 
        });
        socket.on('progress', (progress) => {
            console.log("progress:",progress);
            if(progress.progress){
                this.setState({status:progress.status+'-'+Math.round(progress.progress*100)+"%"});
            }else{
                this.setState({status:progress.status});
                //     this.loading.setContent(progress.status);
            }
        });
        socket.on('result', (result) => {
            console.log("result:",result);
            var r = "";
            r = result.split(/\r?\n/);
            console.log("result:",r);
            this.setState({result:r});
            //this.loading.dismissAll()
            //this.result = result;
        });

    }

    load(e){
        e.preventDefault();
        console.log("TEST");
        let reader = new FileReader();
        let file = e.target.files[0];
        var image = new Image();
        reader.onloadend = () => {
            image.onload = (imageEvent)=> {
                var canvas = document.createElement('canvas');
                var max_size = 2000;
                var width = image.width;
                console.log(width);
                var height = image.height;
                console.log(height);
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                this.setState({
                    file: file,
                    imagePreviewUrl: dataUrl,//reader.result
                    readyToSubmit:true,
                });
                //console.log(reader.result);
                console.log(dataUrl);
            }
            image.src=reader.result;
        }
        reader.readAsDataURL(file)
    }
    send(e){
        e.preventDefault();
        console.log("submit");
        socket.emit('image', this.state.imagePreviewUrl);
        this.setState({
                    readyToSubmit:false,
                });

    }
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} height="400"/>);
        } 
        return (

                <div>
                <p>Server is currently {this.state.serverOK?<span style={{color:"green"}}>Active</span>:<span style={{color:"red"}}>Down</span>}
                </p>
                <form onSubmit={(e)=>this.send(e)}>
                <input 
                type="file" 
                onChange={(e)=>this.load(e)} />
                {this.state.status===""?"":<p>{this.state.status}</p>}
                {this.state.result.map(r=>
                <p>{r}</p>
                                          )}
                {this.state.readyToSubmit?<Button type="submit"
                    onClick={(e)=>this.send(e)}>Submit</Button>:""
                }
                </form>

                <div>
                {$imagePreview}
                </div>
                </div> 
               );
        /*
           var date = this.state.date;
           var beforeDate = new Date(date.getTime());
           beforeDate.setDate(date.getDate()-1);
           var afterDate = new Date(date.getTime());
           afterDate.setDate(date.getDate()+1);
           var d = ("0" + date.getDate()).slice(-2);
           var m = ("0" + (date.getMonth() + 1)).slice(-2);
           var y = date.getFullYear();
           var selectedTitles = [];
           var selectedSources = [];
           this.state.sources.map(source=>{
           if(source.display)
           selectedSources.push(source.name);
           });
           this.state.titles.map(title=>{
           if(selectedSources.indexOf(title.source)>=0)
           selectedTitles.push(title);
           });
           selectedTitles.sort(function(a,b){
           return new Date(b.datetime) - new Date(a.datetime);
           })
           return (
           <div>
           <h1>Apollo</h1>
           <Grid>
           <Row className="show-grid">
           <Col xs={4} xsPush={8} md={4} mdPush={8}>                
           <div>Date : {y+'-'+m+'-'+d}</div>
           <Button onClick={()=>this.updateDate(beforeDate)}>Before</Button><Button onClick={()=>this.updateDate(afterDate)}>After</Button>
           <hr/>
           <div>Sources: {this.state.sources.map(source=>
           <Source 
           key={source.id}
           name={source.name}
           display={source.display}
           onClick={()=>this.toggleSource(source.name)}
           />)}
           </div>
           </Col>
           <Col xs={8} xsPull={4} md={8} mdPull={4}>
           <Table responsive striped hover>
           <thead>
           <tr>
           <th>Date</th>
           <th>Source</th>
           <th>Image</th>
           <th>Title</th>
           </tr>
           </thead>
           <tbody>
           {selectedTitles.map(title=>
           <Title 
           key={title.guid}
           date={title.datetime}
           source={title.source}
           image={title.image_link}
           link={title.link}
           title={title.title}
           />
           )}
           </tbody>
           </Table>
           </Col>
           </Row>
           </Grid>
           </div>
           );
           */
    }
}
/*
   class Title extends Component {
   render() {
   return (
   <tr>
   <td>{time(this.props.date)}</td>
   <td>{this.props.source}</td>
   <td><img src={this.props.image} alt="" height="45"/></td>
   <td><a href={this.props.link}>{this.props.title}</a></td>
   </tr>
   );
   }
   }
   class Source extends Component {
   render() {
   return (
   <Button bsStyle={this.props.display?"primary":"default"} onClick={this.props.onClick}>{this.props.name}</Button>
   );
   }
   }
   function time(date){
   var d = (new Date(date)).toString();
   return d.substring(16,18)+':'+d.substring(19,21);
   };
   */
export default App;
