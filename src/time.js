// vim:set ts=4:
/*`
 * The JS Time library 0.1
 * Licensend under the MIT Licence
 */

(function(){

var window = this;

var Time = window.Time = function( arg ) { // let Time be global
	if( typeof(arg) === 'string' ) {
		// Code from http://dansnetwork.com/2008/11/01/javascript-iso8601rfc3339-date-parser/
		var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
		var tempDate = new Date();
		if (arg.toString().match(new RegExp(regexp))) {
			var d = arg.match(new RegExp(regexp));
			var offset = 0;
			tempDate.setUTCDate(1);
			tempDate.setUTCFullYear(parseInt(d[1],10));
			tempDate.setUTCMonth(parseInt(d[3],10) - 1);
			tempDate.setUTCDate(parseInt(d[5],10));
			tempDate.setUTCHours(parseInt(d[7],10));
			tempDate.setUTCMinutes(parseInt(d[9],10));
			tempDate.setUTCSeconds(parseInt(d[11],10));
			if (d[12])
				tempDate.setUTCMilliseconds(parseFloat(d[12]) * 1000);
			else
				tempDate.setUTCMilliseconds(0);
			if (d[13] != 'Z') {
				offset = (d[15] * 60) + parseInt(d[17],10);
				offset *= ((d[14] == '-') ? -1 : 1);
				tempDate.setTime(tempDate.getTime() - offset * 60 * 1000);
			}
		} else {
			tempDate.setTime(Date.parse(arg));
		}
		return Time.millis( tempDate.getTime() );
	} else if( typeof(arg) === 'object' ) {
		if( arg instanceof Date ) {
			return Time.millis( arg.getTime() );
		}
	}
	return this;
};


Time.instant = function() {
	return new AbsoluteTimeContext();
};

Time.at = function(arg) {
	if( typeof(arg) === 'object' ) {
		return new ChronologyContext(arg);
	}
};

Time.unix = function(arg) {
	return new AbsoluteTimeContext().unix(arg);
}

Time.millis = function(arg) {
	return new AbsoluteTimeContext().millis(arg);
}

var AbsoluteTimeContext = function() {
	this._millis = new Date().getTime();
	return this;
};

AbsoluteTimeContext.prototype.unix = function(timestamp) {
	this._millis = timestamp * 1000;
	return this;
};

AbsoluteTimeContext.prototype.millis = function(arg) {
	this._millis = arg;
	return this;
};

AbsoluteTimeContext.prototype.toMillis = function() {
	return this._millis;
};

var ChronologyContext = function(spec) {
	_extend(this, spec);
	return this;
};

ChronologyContext.prototype.toString = function() {
	return this.year + "-" 
	       + _zeroPad( this.month, 2 ) + "-"
	       + _zeroPad( this.day, 2 ) + "-"
	       + " "
	       + _zeroPad( this.hour, 2 ) + ":"
	       + _zeroPad( this.minute, 2 ) + ":"
	       + _zeroPad( this.second, 2 )
	       + Time.utcOffsetToISOString( this.utcOffset );
};

Time.utcOffsetToISOString = function( utcOffsetMillis ) {

};


var _zeroPad = function( x ) {
	if( x < 9 ) {
		return "0" + x;
	} else {
		return "" + x;
	}
};

var _extend = function() { // borrowed from jQuery.extend
    // copy reference to target object
    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
	deep = target;
	target = arguments[1] || {};
	// skip the boolean and the target
	i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) )
	target = {};

    // extend jQuery itself if only one argument is passed
    if ( length == i ) {
	target = this;
	--i;
    }

    for ( ; i < length; i++ )
	// Only deal with non-null/undefined values
	if ( (options = arguments[ i ]) != null )
	    // Extend the base object
	    for ( var name in options ) {
		var src = target[ name ], copy = options[ name ];

		// Prevent never-ending loop
		if ( target === copy )
		    continue;

		// Recurse if we're merging object values
		if ( deep && copy && typeof copy === "object" && !copy.nodeType )
		    target[ name ] = jQuery.extend( deep, 
			// Never move original objects, clone them
			src || ( copy.length != null ? [ ] : { } )
		    , copy );

		// Don't bring in undefined values
		else if ( copy !== undefined )
		    target[ name ] = copy;

	    }

    // Return the modified object
    return target;
};



})();
