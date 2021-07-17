/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String 관련 함수 확장
// =========================================================================================================================
if (!String.prototype.entityify) {
	String.prototype.entityify = function() {
		return this.replace(/&/g, "&amp;").replace(/</g,
			"&lt;").replace(/>/g, "&gt;");
	};
};
if (!String.prototype.convertDate) {
	String.prototype.convertDate = function() {
		let d = new Date(this)
		return d.format('yyyy-MM-dd hh:mm')
	}
}
if (!String.prototype.quote) {
	String.prototype.quote = function() {
		var c, i, l = this.length,
			o = '"';
		for (i = 0; i < l; i += 1) {
			c = this.charAt(i);
			if (c >= ' ') {
				if (c === '\\' || c === '"') {
					o += '\\';
				}
				o += c;
			} else {
				switch (c) {
					case '\b':
						o += '\\b';
						break;
					case '\f':
						o += '\\f';
						break;
					case '\n':
						o += '\\n';
						break;
					case '\r':
						o += '\\r';
						break;
					case '\t':
						o += '\\t';
						break;
					default:
						c = c.charCodeAt();
						o += '\\u00' + Math.floor(c / 16).toString(16) +
							(c % 16).toString(16);
				}
			}
		}
		return o + '"';
	};
};

if (!String.prototype.supplant) {
	String.prototype.supplant = function(o) {
		return this.replace(/{([^{}]*)}/g,
			function(a, b) {
				var r = o[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			}
		);
	};
};

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
	};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RegExp 관련 함수 확장
// =========================================================================================================================
if (!RegExp.escape) {
	RegExp.escape = function(s) {
		return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Number 관련 함수 확장
// =========================================================================================================================
if (!Number.prototype.padLeft) {
	Number.prototype.padLeft = function(n, str) {
		return Array(n - String(this).length + 1).join(str || '0') + this;
	};
}

if(!Number.prototype.formatMoney) {
	Number.prototype.formatMoney = function(c, d, t) {
		var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Date 관련 함수 확장
// =========================================================================================================================
if (!Date.prototype.format) {
	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"c+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};

		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}

		return format;
	};
};

if (!Date.prototype.addDay) {
	Date.prototype.addDay = function(i) {
		var currentDate; // 계산된 날
		currentDate = this.getDate() + i * 1; // 현재 날짜에 더해(빼)줄 날짜를 계산
		this.setDate(currentDate); // 계산된 날짜로 다시 세팅
		return this;
	};
};

if (!Date.prototype.addMonth) {
	Date.prototype.addMonth = function(i) {
		var curr = this.getMonth() + i; // 현재 날짜에 더해(빼)줄 날짜를 계산
		this.setMonth(curr); // 계산된 날짜로 다시 세팅
		return this;
	};
};

if (!Date.prototype.firstDay) {
	Date.prototype.firstDay = function() {
    var ret = new Date(this.getFullYear(), this.getMonth(),1)
    return ret
	};
};

if (!Date.prototype.lastDay) {
	Date.prototype.lastDay = function() {
    var ret = new Date(this.getFullYear(), this.getMonth()+1,0)
    return ret
	};
};


if (!Date.prototype.addTime) {
	Date.prototype.addTime = function(interval, units) {
		var ret = new Date(this); //don't change original date
		switch (interval.toLowerCase()) {
			case 'year':
				ret.setFullYear(ret.getFullYear() + units);
				break;
			case 'quarter':
				ret.setMonth(ret.getMonth() + 3 * units);
				break;
			case 'month':
				ret.setMonth(ret.getMonth() + units);
				break;
			case 'week':
				ret.setDate(ret.getDate() + 7 * units);
				break;
			case 'day':
				ret.setDate(ret.getDate() + units);
				break;
			case 'hour':
				ret.setTime(ret.getTime() + units * 3600000);
				break;
			case 'minute':
				ret.setTime(ret.getTime() + units * 60000);
				break;
			case 'second':
				ret.setTime(ret.getTime() + units * 1000);
				break;
			default:
				ret = undefined;
				break;
		}
		return ret;
	};
};

