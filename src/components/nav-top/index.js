import {Link} from 'react-router';
import React, {Component} from 'react';
import {Row, Col, Input, Icon, Popover} from 'antd';

import logoImg from "../../../public/image/logo.png";

import "./index.scss";
import {showMessage} from '../common/show';

class NavTop extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			keyword: '',
			link: '',
			visible: false
		};
	}

	componentDidMount() {
	  this.generateCanvas();
  }

	static contextTypes = {
		router: React.PropTypes.object
	};

	generateCanvas = () => {
    let canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 180;
    let ctx = canvas.getContext("2d");
    let particles = [];
    let color=['white','red','orange','yellow','green','blue','indigo','purple'];
    animate();
    function animate(){
      setInterval(function(){
        render();
        area();
      },1000/60)
    }
    canvas.onmousemove = function(event){
      let e = event|| window.event;
        do_spawn(e,9);
    };
    canvas.ontouchmove=function(e){
        do_spawn(e,9);
    };
    function do_spawn(e,n){   //设置孵化器的生产数量
      let x = e.clientX;  //鼠标坐标
      let y = e.clientY;
      for (let i=0;i<n;i++){
        spawn(x,y);
      }
    }
    function spawn(x,y){   //孵化器，生成一个原点对象
      let particle=new Particle();
      particle.init(x,y);
      particles.push(particle);

    }
    function render(){    //把生成的原点渲染出来
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i = 0,len = particles.length; i < len; i++){
        particles[i].draw();
        particles[i].update();
      }
      ctx.font="bold 40px Arial";
      ctx.fillStyle="#3197ef";
      ctx.fillText("Ao",40,100);
      ctx.fillStyle="#000000";
      ctx.fillText("tu",95,100);
      ctx.font="bold 40px Arial";
      ctx.lineWidth=1;
      ctx.strokeText("'s Blog",140,100);
      ctx.font="bold 20px Arial";
      ctx.fillStyle="#3197ef";
      ctx.fillText("别人稍一注意你你就敞开心扉，你这不是坦率，是孤独。",120,140);
    }
    function area(){  //半径足够小的时候删除该点
      let n = 0;
      for( let i = 0, l = particles.length; i < l; i++ ) {
        if (particles[i].r >1 ) {
          particles[n++] = particles[i];
        }
      }
      while( particles.length > Math.min(700,n) ) {
        particles.pop();
      }
    }
    function Particle(){}  //构造函数，小球原型
    Particle.prototype={
      init:function(x,y){  //初始化小球各项数据
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.r = 10*Math.random() + 10 || 40;
        this.color = color[~~(Math.random()*8)];
        this.theta = Math.random()*2*Math.PI;
        this.R = Math.random()*4 + 2;
        this.vx = Math.cos(this.theta)*this.R;
        this.vy = Math.sin(this.theta)*this.R;
      },
      draw:function(){    //画出一个球的方法
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
      },
      update:function(){    //改变球的各项属相的方法
        this.x += this.vx;
        this.y += this.vy;
        this.vx += Math.cos(this.theta)*.1;
        this.vy += Math.sin(this.theta)*.1;
        this.vx *= .94;
        this.vy *= .94;    //给速度设置一个衰减系数
        this.r *=.92;
        this.color = color[~~(Math.random()*8)]; //动态改变圆点的颜色达到闪烁的效果
      }
    };
  };
	
	onSearch = (keyword) => {
		if(keyword.trim() === '') {
			return;
		}
		
		this.setState({ visible: false });
		keyword = keyword.substr(0, 15);
		this.context.router.push(`/search/${keyword}`);
	};

	handleChange = (event) => {
		this.setState({keyword: event.target.value});
	};

	onClick = (event) => {
		 this.setState({
			 link: event.target.getAttribute('data-key')
		 })
	};

	handleVisibleChange = (visible) => {
		this.setState({ visible: !this.state.visible });
	};

	handleMouseOver = () => {
		if(loadlive2d) {
			showMessage(document.querySelector('.live2d-message'), '在找什么东西呢，需要帮忙吗？', 3000);
		}
	};

	render() {
		const links = [
			{key: "home", text: '主页'},
			{key: "article", text: '博文'},
			{key: "timeline", text: '归档'},
			{key: "gather", text: '瞎说'},
			{key: "gossip", text: '记'},
			// {key: "gossip", text: '碎言碎语'}
		];
		
		let Search = Input.Search;
		let currLink = this.state.link;
		const content = (
			<Col sm={0}>
				<div onClick={this.onClick}>
					{
						links.map((item) => (
							item.key === currLink
							? 	<p className="navbar-item active" key={item.key} onClick={this.handleVisibleChange}>
									<Link to={"/" + item.key} data-key={item.key}>{item.text}</Link>
								</p>
							: 	<p className="navbar-item" key={item.key}>
									<Link to={"/" + item.key} data-key={item.key} onClick={this.handleVisibleChange}>{item.text}</Link>
								</p>
						))
					}
					<div style={{padding: "10px"}}>
						<Search
							size="large"
							placeholder="Search"
							value={this.state.keyword}
							onSearch={this.onSearch}
							onChange={this.handleChange}/>
					</div>
				</div>
			</Col>
		);

		return (
			<div className="nav-top-wrap">
        <canvas id="canvas"></canvas>
				<Row>
					<Col xs={0} sm={24}>
						<div className="nav-top">
							<div className="container">
								<ul onClick={this.onClick}>
									{
										links.map((item) => (
											<li className="nav-top-item" key={item.key}>
												<Link to={`/${item.key}`} data-key={item.key}>{item.text}</Link>
											</li>
										))
									}
									<div className="nav-top-search" onMouseOver={this.handleMouseOver}>
										<Search
											size="large"
											placeholder="Search"
											value={this.state.keyword}
											onSearch={this.onSearch}
											onChange={this.handleChange} />
									</div>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default NavTop;