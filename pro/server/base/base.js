module.exports = function(msg, status, data){
	return {
		status: status || false,
		msg: msg || '',
		data: data || null
	}
}