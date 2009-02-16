// vim:set ts=4:
/*`
 * The JS Time library 0.1
 * Licensend under the MIT Licence
 */

(function(){

var window = this;

var Time = window.Time = function( arg ) { // let Time be global
	return this;
};

Time.instant = function() {
	return new AbsoluteTimeContext();
};

Time.at = function(arg) {
	if( typeof(arg) === 'number' ) {
		var millis = arg;
		return new AbsoluteTimeContext().at(millis);
	} else if( typeof(arg) === 'object' ) {
		return new ChronologyContext(arg);
	}
};

var AbsoluteTimeContext = function() {
	this.millis = new Date().getTime();
	return this;
};

AbsoluteTimeContext.prototype.at = function(millis) {
	this.millis = millis;
	return this;
};

AbsoluteTimeContext.prototype.toMillis = function(millis) {
	return this.millis;
};

var ChronologyContext = function(spec) {
	_extend(this, spec);
	return this;
};

ChronologyContext.prototype.toISOString = function() {
	return this.year + "-" 
	       + _zeroPad( this.month, 2 ) + "-"
	       + _zeroPad( this.day, 2 ) + "-"
	       + " "
	       + _zeroPad( this.hour, 2 ) + ":"
	       + _zeroPad( this.minute, 2 ) + ":"
	       + _zeroPad( this.second, 2 )
	       + Time.utcOffsetToISOString( this.utcOffset );
};

ChronologyContext.prototype.in = function() {

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
