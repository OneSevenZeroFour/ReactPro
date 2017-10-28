import merge from 'merge';

export const cookie = {
	set(cObj) {
		let obj = {
			name: 'default',
			val: '',
			expires: '',
			path: '/'
		}
		var date = new Date();
		obj.expires = new Date(date.setDate(date.getDate() + 7));
		
		let nObj = merge(obj, cObj);

		let cookieStr = `${nObj.name}=${nObj.val};expires=${nObj.expires};path=${nObj.path}`;
		console.log(cookieStr)
		// 写入
		document.cookie = cookieStr;
	},
	get(name) {

		// 先获取所有cookie
		var cookie = document.cookie;
		if (cookie.length === 0) {
			return '';
		}
		// 拆分成数组
		cookie = cookie.split('; ');

		// 遍历cookie，找到想要的cookie值
		var res = '';
		cookie.forEach(function (item) {
			var arr = item.split('=');

			if (arr[0] === name) {
				res = arr[1];
			}
		});

		return res;
	},
	remove(name) {
		// 利用设置过期时间达到删除的效果。
		var now = new Date();
		now.setDate(now.getDate() - 100);

		// document.cookie = name +'=xxx;expires=' + now.toUTCString();
		this.set({
			name,
			expires:now
		});
	}
}