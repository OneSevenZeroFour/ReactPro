# ReactPro
组员：邱旭青（老邱）、杨培钦（小羊）、袁泽林（小小圆）、刘美（Ammy）

##项目名称：云猴全球购
###项目分工

首页：刘美（首页布局，渲染数据，设置路由，跳转活动列表页页面，列表页数据渲染）、杨培钦（首页头部导航跳转列表页，渲染数据）
分类：杨泽林（根据分类进行跳转路由进入分类列表页）
详情页、购物车、个人中心：邱旭青（加入购物车功能、实现购物车页面功能、个人中心资料填写功能）

###首页

####l.轮播图（插件）

####2.首页（配好数据文件，遍历显示）home

	每个分区（大图+商品列表+加载更多<路由跳转进入```活动列表详情页```>
	注意事项：a.页面初始化时，因判断数据是否请求成功设置状态（条件判断）
			b.请求数据设置在state里 this.data初始化数据,得到数据后setState({})
			c.限制两行文字并隐藏
			d.手动触摸滑动，
			
####3.路由跳转（头部分类）home/:kind   kind:种类名
	
 	内容：热门 美妆 母婴 食品 生活 个护 保健
 	注意事项：a.路由重定向<Redirect from="/" to="/home/hot" />  版本问题
 			b.路由切换时的高亮设置,react事件触发传参onClick={this.函数名.bind(this,参数1,参数2)}
 			c.不经过动态路由传参，刷新页面时参数会消失
			
####4.首页活动列表页
	首页点击 大图 or 加载更多 传参 对象（bigImgUrl,kindName,mainColor,headerContent）
	 数据请求，并渲染
	 下拉刷新
