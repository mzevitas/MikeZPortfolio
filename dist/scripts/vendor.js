/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(Q,W,t){'use strict';function R(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.15/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Sa(b){if(null==b||Ta(b))return!1;var a=b.length;return b.nodeType===
qa&&a?!0:C(b)||H(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(G(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(H(b)||Sa(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Ed(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function mc(b){return function(a,c){b(c,a)}}function Fd(){return++ob}function nc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function w(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var l=f[g];b[l]=e[l]}}nc(b,a);return b}function aa(b){return parseInt(b,10)}function Ob(b,a){return w(Object.create(b),a)}function E(){}function ra(b){return b}function ea(b){return function(){return b}}function x(b){return"undefined"===
typeof b}function y(b){return"undefined"!==typeof b}function J(b){return null!==b&&"object"===typeof b}function C(b){return"string"===typeof b}function Y(b){return"number"===typeof b}function ga(b){return"[object Date]"===Ca.call(b)}function G(b){return"function"===typeof b}function Ua(b){return"[object RegExp]"===Ca.call(b)}function Ta(b){return b&&b.window===b}function Va(b){return b&&b.$evalAsync&&b.$watch}function Wa(b){return"boolean"===typeof b}function oc(b){return!(!b||!(b.nodeName||b.prop&&
b.attr&&b.find))}function Gd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function va(b){return z(b.nodeName||b[0]&&b[0].nodeName)}function Xa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Da(b,a,c,d){if(Ta(b)||Va(b))throw Ja("cpws");if(a){if(b===a)throw Ja("cpi");c=c||[];d=d||[];if(J(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(H(b))for(var f=a.length=0;f<b.length;f++)e=Da(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);
else{var g=a.$$hashKey;H(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Da(b[f],null,c,d),J(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);nc(a,g)}}else if(a=b)H(b)?a=Da(b,[],c,d):ga(b)?a=new Date(b.getTime()):Ua(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):J(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Da(b,e,c,d));return a}function sa(b,a){if(H(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(J(b))for(c in a=a||{},
b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ha(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(H(b)){if(!H(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ha(b[d],a[d]))return!1;return!0}}else{if(ga(b))return ga(a)?ha(b.getTime(),a.getTime()):!1;if(Ua(b))return Ua(a)?b.toString()==a.toString():!1;if(Va(b)||Va(a)||Ta(b)||Ta(a)||H(a)||ga(a)||Ua(a))return!1;c={};for(d in b)if("$"!==
d.charAt(0)&&!G(b[d])){if(!ha(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==t&&!G(a[d]))return!1;return!0}return!1}function Ya(b,a,c){return b.concat(Za.call(a,c))}function pc(b,a){var c=2<arguments.length?Za.call(arguments,2):[];return!G(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Ya(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Hd(b,a){var c=a;"string"===typeof b&&
"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ta(a)?c="$WINDOW":a&&W===a?c="$DOCUMENT":Va(a)&&(c="$SCOPE");return c}function $a(b,a){if("undefined"===typeof b)return t;Y(a)||(a=a?2:null);return JSON.stringify(b,Hd,a)}function qc(b){return C(b)?JSON.parse(b):b}function wa(b){b=A(b).clone();try{b.empty()}catch(a){}var c=A("<div>").append(b).html();try{return b[0].nodeType===pb?z(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+z(b)})}catch(d){return z(c)}}function rc(b){try{return decodeURIComponent(b)}catch(a){}}
function sc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=rc(c[0]),y(d)&&(b=y(c[1])?rc(c[1]):!0,tc.call(a,d)?H(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Pb(b){var a=[];r(b,function(b,d){H(b)?r(b,function(b){a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))}):a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))});return a.length?a.join("&"):""}function qb(b){return Ea(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ea(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Id(b,a){var c,d,e=rb.length;b=A(b);for(d=0;d<e;++d)if(c=rb[d]+a,C(c=b.attr(c)))return c;return null}function Jd(b,a){var c,d,e={};r(rb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(rb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Id(c,"strict-di"),
a(c,d?[d]:[],e))}function uc(b,a,c){J(c)||(c={});c=w({strictDi:!1},c);var d=function(){b=A(b);if(b.injector()){var d=b[0]===W?"document":wa(b);throw Ja("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=ab(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;Q&&e.test(Q.name)&&(c.debugInfoEnabled=!0,Q.name=Q.name.replace(e,""));if(Q&&!f.test(Q.name))return d();Q.name=Q.name.replace(f,"");ca.resumeBootstrap=function(b){r(b,function(b){a.push(b)});return d()};G(ca.resumeDeferredBootstrap)&&ca.resumeDeferredBootstrap()}function Kd(){Q.name="NG_ENABLE_DEBUG_INFO!"+Q.name;Q.location.reload()}function Ld(b){b=ca.element(b).injector();if(!b)throw Ja("test");return b.get("$$testability")}
function vc(b,a){a=a||"_";return b.replace(Md,function(b,d){return(d?a:"")+b.toLowerCase()})}function Nd(){var b;wc||((ta=Q.jQuery)&&ta.fn.on?(A=ta,w(ta.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=ta.cleanData,ta.cleanData=function(a){var c;if(Qb)Qb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ta._data(e,"events"))&&c.$destroy&&ta(e).triggerHandler("$destroy");b(a)}):A=T,ca.element=A,wc=!0)}function Rb(b,a,c){if(!b)throw Ja("areq",
a||"?",c||"required");return b}function sb(b,a,c){c&&H(b)&&(b=b[b.length-1]);Rb(G(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Ja("badname",a);}function xc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&G(b)?pc(e,b):b}function tb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return A(c)}function ia(){return Object.create(null)}
function Od(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=R("$injector"),d=R("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||R;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return u}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),u={_invokeQueue:b,_configBlocks:d,
_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return u})}})}function Pd(b){w(b,{bootstrap:uc,copy:Da,extend:w,equals:ha,
element:A,forEach:r,injector:ab,noop:E,bind:pc,toJson:$a,fromJson:qc,identity:ra,isUndefined:x,isDefined:y,isString:C,isFunction:G,isObject:J,isNumber:Y,isElement:oc,isArray:H,version:Qd,isDate:ga,lowercase:z,uppercase:ub,callbacks:{counter:0},getTestability:Ld,$$minErr:R,$$csp:bb,reloadWithDebugInfo:Kd});cb=Od(Q);try{cb("ngLocale")}catch(a){cb("ngLocale",[]).provider("$locale",Rd)}cb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Sd});a.provider("$compile",yc).directive({a:Td,
input:zc,textarea:zc,form:Ud,script:Vd,select:Wd,style:Xd,option:Yd,ngBind:Zd,ngBindHtml:$d,ngBindTemplate:ae,ngClass:be,ngClassEven:ce,ngClassOdd:de,ngCloak:ee,ngController:fe,ngForm:ge,ngHide:he,ngIf:ie,ngInclude:je,ngInit:ke,ngNonBindable:le,ngPluralize:me,ngRepeat:ne,ngShow:oe,ngStyle:pe,ngSwitch:qe,ngSwitchWhen:re,ngSwitchDefault:se,ngOptions:te,ngTransclude:ue,ngModel:ve,ngList:we,ngChange:xe,pattern:Ac,ngPattern:Ac,required:Bc,ngRequired:Bc,minlength:Cc,ngMinlength:Cc,maxlength:Dc,ngMaxlength:Dc,
ngValue:ye,ngModelOptions:ze}).directive({ngInclude:Ae}).directive(vb).directive(Ec);a.provider({$anchorScroll:Be,$animate:Ce,$browser:De,$cacheFactory:Ee,$controller:Fe,$document:Ge,$exceptionHandler:He,$filter:Fc,$interpolate:Ie,$interval:Je,$http:Ke,$httpBackend:Le,$location:Me,$log:Ne,$parse:Oe,$rootScope:Pe,$q:Qe,$$q:Re,$sce:Se,$sceDelegate:Te,$sniffer:Ue,$templateCache:Ve,$templateRequest:We,$$testability:Xe,$timeout:Ye,$window:Ze,$$rAF:$e,$$asyncCallback:af,$$jqLite:bf})}])}function db(b){return b.replace(cf,
function(a,b,d,e){return e?d.toUpperCase():d}).replace(df,"Moz$1")}function Gc(b){b=b.nodeType;return b===qa||!b||9===b}function Hc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Sb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(ef.exec(b)||["",""])[1].toLowerCase();d=ja[d]||ja._default;c.innerHTML=d[1]+b.replace(ff,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Ya(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});
return e}function T(b){if(b instanceof T)return b;var a;C(b)&&(b=N(b),a=!0);if(!(this instanceof T)){if(a&&"<"!=b.charAt(0))throw Tb("nosel");return new T(b)}if(a){a=W;var c;b=(c=gf.exec(b))?[a.createElement(c[1])]:(c=Hc(b,a))?c.childNodes:[]}Ic(this,b)}function Ub(b){return b.cloneNode(!0)}function wb(b,a){a||xb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)xb(c[d])}function Jc(b,a,c,d){if(y(d))throw Tb("offargs");var e=(d=yb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),
function(a){if(y(c)){var d=e[a];Xa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function xb(b,a){var c=b.ng339,d=c&&zb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Jc(b)),delete zb[c],b.ng339=t))}function yb(b,a){var c=b.ng339,c=c&&zb[c];a&&!c&&(b.ng339=c=++hf,c=zb[c]={events:{},data:{},handle:t});return c}function Vb(b,a,c){if(Gc(b)){var d=y(c),e=!d&&a&&!J(a),
f=!a;b=(b=yb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];w(b,a)}}}function Ab(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Bb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",N((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+N(a)+" "," ")))})}function Cb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");
r(a.split(" "),function(a){a=N(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",N(c))}}function Ic(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Kc(b,a){return Db(b,"$"+(a||"ngController")+"Controller")}function Db(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=H(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=A.data(b,a[d]))!==t)return c;b=b.parentNode||
11===b.nodeType&&b.host}}function Lc(b){for(wb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Mc(b,a){a||wb(b);var c=b.parentNode;c&&c.removeChild(b)}function jf(b,a){a=a||Q;if("complete"===a.document.readyState)a.setTimeout(b);else A(a).on("load",b)}function Nc(b,a){var c=Eb[a.toLowerCase()];return c&&Oc[va(b)]&&c}function kf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Pc[a]}function lf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=
a[e||c.type],g=f?f.length:0;if(g){if(x(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=sa(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function bf(){this.$get=function(){return w(T,{hasClass:function(b,a){b.attr&&(b=b[0]);
return Ab(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return Cb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return Bb(b,a)}})}}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Fd)():c+":"+b}function eb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function mf(b){return(b=b.toString().replace(Qc,"").match(Rc))?"function("+(b[1]||"").replace(/[\s\r\n]+/,
" ")+")":"fn"}function ab(b,a){function c(a){return function(b,c){if(J(b))r(b,mc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(G(b)||H(b))b=q.instantiate(b);if(!b.$get)throw Fa("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,this);if(x(c))throw Fa("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,
e[2])}}if(!n.get(a)){n.put(a,!0);try{C(a)?(c=cb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):G(a)?b.push(q.invoke(a)):H(a)?b.push(q.invoke(a)):sb(a,"module")}catch(e){throw H(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Fa("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Fa("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),
b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[],h=ab.$$annotate(b,a,g),l,q,p;q=0;for(l=h.length;q<l;q++){p=h[q];if("string"!==typeof p)throw Fa("itkn",p);k.push(f&&f.hasOwnProperty(p)?f[p]:d(p,g))}H(b)&&(b=b[l]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((H(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return J(a)||G(a)?a:d},get:d,annotate:ab.$$annotate,has:function(a){return p.hasOwnProperty(a+
"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],n=new eb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ea(b),!1)}),constant:c(function(a,b){La(a,"constant");p[a]=b;u[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},q=p.$injector=h(p,function(a,b){ca.isString(b)&&k.push(b);
throw Fa("unpr",k.join(" <- "));}),u={},s=u.$injector=h(u,function(a,b){var c=q.get(a+"Provider",b);return s.invoke(c.$get,c,t,a)});r(g(b),function(a){s.invoke(a||E)});return s}function Be(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===va(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;G(c)?c=c():oc(c)?(c=c[0],c="fixed"!==
a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Y(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||jf(function(){d.$evalAsync(g)})});return g}]}function af(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:
function(b){return a(b,0,!1)}}]}function nf(b,a,c,d){function e(a){try{a.apply(null,Za.call(arguments,1))}finally{if(m--,0===m)for(;F.length;)try{F.pop()()}catch(b){c.error(b)}}}function f(a,b){(function da(){r(Z,function(a){a()});L=b(da,a)})()}function g(){h();l()}function h(){a:{try{B=u.state;break a}catch(a){}B=void 0}B=x(B)?null:B;ha(B,O)&&(B=O);O=B}function l(){if(D!==n.url()||I!==B)D=n.url(),I=B,r(X,function(a){a(n.url(),B)})}function k(a){try{return decodeURIComponent(a)}catch(b){return a}}
var n=this,p=a[0],q=b.location,u=b.history,s=b.setTimeout,M=b.clearTimeout,v={};n.isMock=!1;var m=0,F=[];n.$$completeOutstandingRequest=e;n.$$incOutstandingRequestCount=function(){m++};n.notifyWhenNoOutstandingRequests=function(a){r(Z,function(a){a()});0===m?a():F.push(a)};var Z=[],L;n.addPollFn=function(a){x(L)&&f(100,s);Z.push(a);return a};var B,I,D=q.href,S=a.find("base"),P=null;h();I=B;n.url=function(a,c,e){x(e)&&(e=null);q!==b.location&&(q=b.location);u!==b.history&&(u=b.history);if(a){var f=
I===e;if(D===a&&(!d.history||f))return n;var g=D&&Ga(D)===Ga(a);D=a;I=e;!d.history||g&&f?(g||(P=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(u[c?"replaceState":"pushState"](e,"",a),h(),I=B);return n}return P||q.href.replace(/%27/g,"'")};n.state=function(){return B};var X=[],ba=!1,O=null;n.onUrlChange=function(a){if(!ba){if(d.history)A(b).on("popstate",g);A(b).on("hashchange",g);ba=!0}X.push(a);return a};n.$$checkUrlChange=l;n.baseHref=function(){var a=S.attr("href");
return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var fa={},y="",ka=n.baseHref();n.cookies=function(a,b){var d,e,f,g;if(a)b===t?p.cookie=encodeURIComponent(a)+"=;path="+ka+";expires=Thu, 01 Jan 1970 00:00:00 GMT":C(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+ka).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),fa={},f=0;f<d.length;f++)e=d[f],g=
e.indexOf("="),0<g&&(a=k(e.substring(0,g)),fa[a]===t&&(fa[a]=k(e.substring(g+1))));return fa}};n.defer=function(a,b){var c;m++;c=s(function(){delete v[c];e(a)},b||0);v[c]=!0;return c};n.defer.cancel=function(a){return v[a]?(delete v[a],M(a),e(E),!0):!1}}function De(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new nf(b,d,a,c)}]}function Ee(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=
b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw R("$cacheFactory")("iid",b);var g=0,h=w({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,n={},p=null,q=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=n[a]||(n[a]={key:a});e(c)}if(!x(b))return a in l||g++,l[a]=b,g>k&&this.remove(q.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete n[a]}delete l[a];
g--},removeAll:function(){l={};g=0;n={};p=q=null},destroy:function(){n=h=l=null;delete a[b]},info:function(){return w({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Ve(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function yc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw la("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===
f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d={},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Gd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,l=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){La(a,"directive");C(a)?(Rb(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);G(h)?h={compile:ea(h)}:!h.compile&&h.link&&
(h.compile=ea(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";J(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,mc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};
var k=!0;this.debugInfoEnabled=function(a){return y(a)?(k=a,this):k};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,M,v,m,F,Z,L,B){function I(a,b){try{a.addClass(b)}catch(c){}}function D(a,b,c,d,e){a instanceof A||(a=A(a));r(a,function(b,c){b.nodeType==pb&&b.nodeValue.match(/\S+/)&&(a[c]=A(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);D.$$addScopeClass(a);
var g=null;return function(b,c,d){Rb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==va(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?A(Xb(g,A("<div>").append(a).html())):c?Ka.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);D.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,
c,d,e){var f,k,l,q,p,s,M;if(m)for(M=Array(c.length),q=0;q<h.length;q+=3)f=h[q],M[f]=c[f];else M=c;q=0;for(p=h.length;q<p;)k=M[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(l=a.$new(),D.$$addScopeInfo(A(k),l)):l=a,s=c.transcludeOnThisElement?P(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?P(a,b):null,c(f,l,k,d,s)):f&&f(a,k.childNodes,t,e)}for(var h=[],k,l,q,p,m,s=0;s<a.length;s++){k=new Yb;l=X(a[s],[],k,0===s?d:t,e);(f=l.length?fa(l,a[s],k,b,c,null,[],[],f):null)&&
f.scope&&D.$$addScopeClass(k.$$element);k=f&&f.terminal||!(q=a[s].childNodes)||!q.length?null:S(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(s,f,k),p=!0,m=m||f;f=null}return p?g:null}function P(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function X(a,b,c,d,g){var h=c.$attr,k;switch(a.nodeType){case qa:ka(b,xa(va(a)),"E",d,g);for(var l,
q,p,m=a.attributes,s=0,M=m&&m.length;s<M;s++){var u=!1,L=!1;l=m[s];k=l.name;q=N(l.value);l=xa(k);if(p=U.test(l))k=k.replace(Sc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var B=l.replace(/(Start|End)$/,"");x(B)&&l===B+"Start"&&(u=k,L=k.substr(0,k.length-5)+"end",k=k.substr(0,k.length-6));l=xa(k.toLowerCase());h[l]=k;if(p||!c.hasOwnProperty(l))c[l]=q,Nc(a,l)&&(c[l]=!0);Oa(a,b,q,l,p);ka(b,l,"A",d,g,u,L)}a=a.className;J(a)&&(a=a.animVal);if(C(a)&&""!==a)for(;k=f.exec(a);)l=xa(k[2]),
ka(b,l,"C",d,g)&&(c[l]=N(k[3])),a=a.substr(k.index+k[0].length);break;case pb:za(b,a.nodeValue);break;case 8:try{if(k=e.exec(a.nodeValue))l=xa(k[1]),ka(b,l,"M",d,g)&&(c[l]=N(k[2]))}catch(v){}}b.sort(da);return b}function ba(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw la("uterdir",b,c);a.nodeType==qa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return A(d)}function O(a,b,c){return function(d,e,f,g,h){e=ba(e[0],
b,c);return a(d,e,f,g,h)}}function fa(a,d,e,f,g,k,l,p,m){function s(a,b,c,d){if(a){c&&(a=O(a,c,d));a.require=K.require;a.directiveName=da;if(P===K||K.$$isolateScope)a=Y(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=O(b,c,d));b.require=K.require;b.directiveName=da;if(P===K||K.$$isolateScope)b=Y(b,{isolateScope:!0});p.push(b)}}function L(a,b,c,d){var e,f="data",g=!1,k=c,l;if(C(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===l[1]&&(f="inheritedData",
k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw la("ctreq",b,a);return e||null}H(b)&&(e=[],r(b,function(b){e.push(L(a,b,c,d))}));return e}function B(a,c,f,g,h){function k(a,b,c){var d;Va(a)||(c=b,b=a,a=t);E&&(d=F);c||(c=E?X.parent():X);return h(a,b,d,c,Wb)}var m,s,u,I,F,gb,X,O;d===f?(O=e,X=e.$$element):(X=A(f),O=new Yb(X,e));P&&(I=c.$new(!0));h&&(gb=k,gb.$$boundTransclude=h);S&&(Z={},F={},r(S,function(a){var b={$scope:a===
P||a.$$isolateScope?I:c,$element:X,$attrs:O,$transclude:gb};u=a.controller;"@"==u&&(u=O[a.name]);b=v(u,b,!0,a.controllerAs);F[a.name]=b;E||X.data("$"+a.name+"Controller",b.instance);Z[a.name]=b}));if(P){D.$$addScopeInfo(X,I,!0,!(ma&&(ma===P||ma===P.$$originalDirective)));D.$$addScopeClass(X,!0);g=Z&&Z[P.name];var ba=I;g&&g.identifier&&!0===P.bindToController&&(ba=g.instance);r(I.$$isolateBindings=P.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":O.$observe(e,
function(a){ba[d]=a});O.$$observers[e].$$scope=c;O[e]&&(ba[d]=b(O[e])(c));break;case "=":if(f&&!O[e])break;h=M(O[e]);l=h.literal?ha:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=ba[d]=h(c);throw la("nonassign",O[e],P.name);};g=ba[d]=h(c);f=function(a){l(a,ba[d])||(l(a,g)?k(c,a=ba[d]):ba[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(O[e],f):c.$watch(M(O[e],f),null,h.literal);I.$on("$destroy",f);break;case "&":h=M(O[e]),ba[d]=function(a){return h(c,a)}}})}Z&&
(r(Z,function(a){a()}),Z=null);g=0;for(m=l.length;g<m;g++)s=l[g],$(s,s.isolateScope?I:c,X,O,s.require&&L(s.directiveName,s.require,X,F),gb);var Wb=c;P&&(P.template||null===P.templateUrl)&&(Wb=I);a&&a(Wb,f.childNodes,t,h);for(g=p.length-1;0<=g;g--)s=p[g],$(s,s.isolateScope?I:c,X,O,s.require&&L(s.directiveName,s.require,X,F),gb)}m=m||{};for(var I=-Number.MAX_VALUE,F,S=m.controllerDirectives,Z,P=m.newIsolateScopeDirective,ma=m.templateDirective,fa=m.nonTlbTranscludeDirective,ka=!1,x=!1,E=m.hasElementTranscludeDirective,
w=e.$$element=A(d),K,da,V,fb=f,za,z=0,Q=a.length;z<Q;z++){K=a[z];var Oa=K.$$start,U=K.$$end;Oa&&(w=ba(d,Oa,U));V=t;if(I>K.priority)break;if(V=K.scope)K.templateUrl||(J(V)?(Na("new/isolated scope",P||F,K,w),P=K):Na("new/isolated scope",P,K,w)),F=F||K;da=K.name;!K.templateUrl&&K.controller&&(V=K.controller,S=S||{},Na("'"+da+"' controller",S[da],K,w),S[da]=K);if(V=K.transclude)ka=!0,K.$$tlb||(Na("transclusion",fa,K,w),fa=K),"element"==V?(E=!0,I=K.priority,V=w,w=e.$$element=A(W.createComment(" "+da+": "+
e[da]+" ")),d=w[0],T(g,Za.call(V,0),d),fb=D(V,f,I,k&&k.name,{nonTlbTranscludeDirective:fa})):(V=A(Ub(d)).contents(),w.empty(),fb=D(V,f));if(K.template)if(x=!0,Na("template",ma,K,w),ma=K,V=G(K.template)?K.template(w,e):K.template,V=Tc(V),K.replace){k=K;V=Sb.test(V)?Uc(Xb(K.templateNamespace,N(V))):[];d=V[0];if(1!=V.length||d.nodeType!==qa)throw la("tplrt",da,"");T(g,w,d);Q={$attr:{}};V=X(d,[],Q);var aa=a.splice(z+1,a.length-(z+1));P&&y(V);a=a.concat(V).concat(aa);R(e,Q);Q=a.length}else w.html(V);if(K.templateUrl)x=
!0,Na("template",ma,K,w),ma=K,K.replace&&(k=K),B=of(a.splice(z,a.length-z),w,e,g,ka&&fb,l,p,{controllerDirectives:S,newIsolateScopeDirective:P,templateDirective:ma,nonTlbTranscludeDirective:fa}),Q=a.length;else if(K.compile)try{za=K.compile(w,e,fb),G(za)?s(null,za,Oa,U):za&&s(za.pre,za.post,Oa,U)}catch(pf){c(pf,wa(w))}K.terminal&&(B.terminal=!0,I=Math.max(I,K.priority))}B.scope=F&&!0===F.scope;B.transcludeOnThisElement=ka;B.elementTranscludeOnThisElement=E;B.templateOnThisElement=x;B.transclude=fb;
m.hasElementTranscludeDirective=E;return B}function y(a){for(var b=0,c=a.length;b<c;b++)a[b]=Ob(a[b],{$$isolateScope:!0})}function ka(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var m=0,s=e.length;m<s;m++)try{q=e[m],(g===t||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(k&&(q=Ob(q,{$$start:k,$$end:l})),b.push(q),h=q)}catch(M){c(M)}}return h}function x(b){if(d.hasOwnProperty(b))for(var c=a.get(b+"Directive"),e=0,f=c.length;e<f;e++)if(b=c[e],b.multiElement)return!0;
return!1}function R(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(I(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function of(a,b,c,d,e,f,g,h){var k=[],l,q,p=b[0],m=a.shift(),M=Ob(m,{templateUrl:null,transclude:null,
replace:null,$$originalDirective:m}),u=G(m.templateUrl)?m.templateUrl(b,c):m.templateUrl,L=m.templateNamespace;b.empty();s(Z.getTrustedResourceUrl(u)).then(function(s){var B,v;s=Tc(s);if(m.replace){s=Sb.test(s)?Uc(Xb(L,N(s))):[];B=s[0];if(1!=s.length||B.nodeType!==qa)throw la("tplrt",m.name,u);s={$attr:{}};T(d,b,B);var D=X(B,[],s);J(m.scope)&&y(D);a=D.concat(a);R(c,s)}else B=p,b.html(s);a.unshift(M);l=fa(a,B,c,e,b,m,f,g,h);r(d,function(a,c){a==B&&(d[c]=b[0])});for(q=S(b[0].childNodes,e);k.length;){s=
k.shift();v=k.shift();var F=k.shift(),O=k.shift(),D=b[0];if(!s.$$destroyed){if(v!==p){var Z=v.className;h.hasElementTranscludeDirective&&m.replace||(D=Ub(B));T(F,A(v),D);I(A(D),Z)}v=l.transcludeOnThisElement?P(s,l.transclude,O):O;l(q,s,D,d,v)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?k.push(b,c,d,a):(l.transcludeOnThisElement&&(a=P(b,l.transclude,e)),l(q,b,c,d,a)))}}function da(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Na(a,
b,c,d){if(b)throw la("multidir",b.name,c.name,a,wa(d));}function za(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&D.$$addBindingClass(a);return function(a,c){var e=c.parent();b||D.$$addBindingClass(e);D.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Xb(a,b){a=z(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}
function Q(a,b){if("srcdoc"==b)return Z.HTML;var c=va(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return Z.RESOURCE_URL}function Oa(a,c,d,e,f){var h=Q(a,e);f=g[e]||f;var k=b(d,!0,h,f);if(k){if("multiple"===e&&"select"===va(a))throw la("selmulti",wa(a));c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers={});if(l.test(e))throw la("nodomevents");var m=g[e];m!==d&&(k=m&&b(m,!0,h,f),d=m);k&&(g[e]=k(a),(c[e]||(c[e]=[])).$$inter=
!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(k,function(a,b){"class"===e&&a!=b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function T(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();a.appendChild(d);A(c).data(A(d).data());ta?(Qb=!0,ta.cleanData([d])):delete A.cache[d[A.expando]];
d=1;for(e=b.length;d<e;d++)f=b[d],A(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Y(a,b){return w(function(){return a.apply(null,arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,wa(d))}}var Yb=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};Yb.prototype={$normalize:xa,$addClass:function(a){a&&0<a.length&&L.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&
L.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Vc(a,b);c&&c.length&&L.addClass(this.$$element,c);(c=Vc(b,a))&&c.length&&L.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Nc(f,a),h=kf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=vc(a,"-"));g=va(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=B(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g=
"",h=N(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var q=2*l,g=g+B(N(h[q]),!0),g=g+(" "+N(h[q+1]));h=N(h[2*l]).split(/\s/);g+=B(N(h[0]),!0);2===h.length&&(g+=" "+N(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ia()),e=d[a]||(d[a]=[]);e.push(b);
m.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Xa(e,b)}}};var V=b.startSymbol(),ma=b.endSymbol(),Tc="{{"==V||"}}"==ma?ra:function(a){return a.replace(/\{\{/g,V).replace(/}}/g,ma)},U=/^ngAttr[A-Z]/;D.$$addBindingInfo=k?function(a,b){var c=a.data("$binding")||[];H(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:E;D.$$addBindingClass=k?function(a){I(a,"ng-binding")}:E;D.$$addScopeInfo=k?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",
b)}:E;D.$$addScopeClass=k?function(a,b){I(a,b?"ng-isolate-scope":"ng-scope")}:E;return D}]}function xa(b){return db(b.replace(Sc,""))}function Vc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Uc(b){b=A(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&qf.call(b,a,1);return b}function Fe(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,
"controller");J(a)?w(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!J(a.$scope))throw R("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,l,k){var n,p,q;l=!0===l;k&&C(k)&&(q=k);if(C(g)){k=g.match(c);if(!k)throw rf("ctrlfmt",g);p=k[1];q=q||k[3];g=b.hasOwnProperty(p)?b[p]:xc(h.$scope,p,!0)||(a?xc(e,p,!0):t);sb(g,p,!0)}if(l)return l=(H(g)?g[g.length-1]:g).prototype,n=Object.create(l||null),q&&f(h,q,n,p||g.name),w(function(){d.invoke(g,
n,h,p);return n},{instance:n,identifier:q});n=d.instantiate(g,h,p);q&&f(h,q,n,p||g.name);return n}}]}function Ge(){this.$get=["$window",function(b){return A(b.document)}]}function He(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Zb(b,a){if(C(b)){var c=b.replace(sf,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(Wc))||(d=(d=c.match(tf))&&uf[d[0]].test(c));d&&(b=qc(c))}}return b}function Xc(b){var a=ia(),c,d,e;if(!b)return a;r(b.split("\n"),
function(b){e=b.indexOf(":");c=z(N(b.substr(0,e)));d=N(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Yc(b){var a=J(b)?b:t;return function(c){a||(a=Xc(b));return c?(c=a[z(c)],void 0===c&&(c=null),c):a}}function Zc(b,a,c,d){if(G(d))return d(b,a,c);r(d,function(d){b=d(b,a,c)});return b}function Ke(){var b=this.defaults={transformResponse:[Zb],transformRequest:[function(a){return J(a)&&"[object File]"!==Ca.call(a)&&"[object Blob]"!==Ca.call(a)&&"[object FormData]"!==Ca.call(a)?$a(a):
a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:sa($b),put:sa($b),patch:sa($b)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,l){function k(a){function c(a){var b=w({},a);b.data=a.data?Zc(a.data,a.headers,a.status,e.transformResponse):a.data;a=a.status;return 200<=a&&300>a?
b:h.reject(b)}function d(a){var b,c={};r(a,function(a,d){G(a)?(b=a(),null!=b&&(c[d]=b)):c[d]=a});return c}if(!ca.isObject(a))throw R("$http")("badreq",a);var e=w({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},a);e.headers=function(a){var c=b.headers,e=w({},a.headers),f,g,c=w({},c.common,c[z(a.method)]);a:for(f in c){a=z(f);for(g in e)if(z(g)===a)continue a;e[f]=c[f]}return d(e)}(a);e.method=ub(e.method);var f=[function(a){var d=a.headers,e=Zc(a.data,Yc(d),
t,a.transformRequest);x(e)&&r(d,function(a,b){"content-type"===z(b)&&delete d[b]});x(a.withCredentials)&&!x(b.withCredentials)&&(a.withCredentials=b.withCredentials);return n(a,e).then(c,c)},t],g=h.when(e);for(r(u,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,e)});return g};g.error=
function(a){g.then(null,function(b){a(b.data,b.status,b.headers,e)});return g};return g}function n(c,f){function l(b,c,d,e){function f(){m(c,b,d,e)}I&&(200<=b&&300>b?I.put(P,[b,c,Xc(d),e]):I.remove(P));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?L.resolve:L.reject)({data:a,status:b,headers:Yc(d),config:c,statusText:e})}function n(a){m(a.data,a.status,sa(a.headers()),a.statusText)}function u(){var a=k.pendingRequests.indexOf(c);-1!==a&&k.pendingRequests.splice(a,
1)}var L=h.defer(),B=L.promise,I,D,S=c.headers,P=p(c.url,c.params);k.pendingRequests.push(c);B.then(u,u);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(I=J(c.cache)?c.cache:J(b.cache)?b.cache:q);I&&(D=I.get(P),y(D)?D&&G(D.then)?D.then(n,n):H(D)?m(D[1],D[0],sa(D[2]),D[3]):m(D,200,{},"OK"):I.put(P,B));x(D)&&((D=$c(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(S[c.xsrfHeaderName||b.xsrfHeaderName]=D),d(c.method,P,f,l,S,c.timeout,c.withCredentials,c.responseType));
return B}function p(a,b){if(!b)return a;var c=[];Ed(b,function(a,b){null===a||x(a)||(H(a)||(a=[a]),r(a,function(a){J(a)&&(a=ga(a)?a.toISOString():$a(a));c.push(Ea(b)+"="+Ea(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),u=[];r(c,function(a){u.unshift(C(a)?l.get(a):l.invoke(a))});k.pendingRequests=[];(function(a){r(arguments,function(a){k[a]=function(b,c){return k(w(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){k[a]=
function(b,c,d){return k(w(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");k.defaults=b;return k}]}function vf(){return new Q.XMLHttpRequest}function Le(){this.$get=["$browser","$window","$document",function(b,a,c){return wf(b,vf,b.defer,a.angular.callbacks,c[0])}]}function wf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),n=null;f.type="text/javascript";f.src=a;f.async=!0;n=function(a){f.removeEventListener("load",n,!1);f.removeEventListener("error",n,!1);e.body.removeChild(f);
f=null;var g=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,g="error"===a.type?404:200);c&&c(g,u)};f.addEventListener("load",n,!1);f.addEventListener("error",n,!1);e.body.appendChild(f);return n}return function(e,h,l,k,n,p,q,u){function s(){m&&m();F&&F.abort()}function M(a,d,e,f,g){L!==t&&c.cancel(L);m=F=null;a(d,e,f,g);b.$$completeOutstandingRequest(E)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==z(e)){var v="_"+(d.counter++).toString(36);d[v]=function(a){d[v].data=
a;d[v].called=!0};var m=f(h.replace("JSON_CALLBACK","angular.callbacks."+v),v,function(a,b){M(k,a,d[v].data,"",b);d[v]=E})}else{var F=a();F.open(e,h,!0);r(n,function(a,b){y(a)&&F.setRequestHeader(b,a)});F.onload=function(){var a=F.statusText||"",b="response"in F?F.response:F.responseText,c=1223===F.status?204:F.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);M(k,c,b,F.getAllResponseHeaders(),a)};e=function(){M(k,-1,null,null,"")};F.onerror=e;F.onabort=e;q&&(F.withCredentials=!0);if(u)try{F.responseType=
u}catch(Z){if("json"!==u)throw Z;}F.send(l||null)}if(0<p)var L=c(s,p);else p&&G(p.then)&&p.then(s)}}function Ie(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,u,s){function M(c){return c.replace(k,b).replace(n,a)}function v(a){try{var b=a;a=u?e.getTrusted(u,b):e.valueOf(b);var c;if(s&&!y(a))c=a;else if(null==a)c="";
else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=$a(a)}c=a}return c}catch(g){c=ac("interr",f,g.toString()),d(c)}}s=!!s;for(var m,F,r=0,L=[],B=[],I=f.length,D=[],S=[];r<I;)if(-1!=(m=f.indexOf(b,r))&&-1!=(F=f.indexOf(a,m+h)))r!==m&&D.push(M(f.substring(r,m))),r=f.substring(m+h,F),L.push(r),B.push(c(r,v)),r=F+l,S.push(D.length),D.push("");else{r!==I&&D.push(M(f.substring(r)));break}if(u&&1<D.length)throw ac("noconcat",f);if(!g||L.length){var P=function(a){for(var b=0,c=
L.length;b<c;b++){if(s&&x(a[b]))return;D[S[b]]=a[b]}return D.join("")};return w(function(a){var b=0,c=L.length,e=Array(c);try{for(;b<c;b++)e[b]=B[b](a);return P(e)}catch(g){a=ac("interr",f,g.toString()),d(a)}},{exp:f,expressions:L,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(B,function(c,e){var f=P(c);G(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,l=a.length,k=new RegExp(b.replace(/./g,f),"g"),n=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=
function(){return a};return g}]}function Je(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var n=a.setInterval,p=a.clearInterval,q=0,u=y(k)&&!k,s=(u?d:c).defer(),M=s.promise;l=y(l)?l:0;M.then(null,null,e);M.$$intervalId=n(function(){s.notify(q++);0<l&&q>=l&&(s.resolve(q),p(M.$$intervalId),delete f[M.$$intervalId]);u||b.$apply()},h);f[M.$$intervalId]=s;return M}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),
delete f[b.$$intervalId],!0):!1};return e}]}function Rd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a",ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"]},pluralCat:function(b){return 1===b?"one":"other"}}}}function bc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=qb(b[a]);
return b.join("/")}function ad(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=aa(c.port)||xf[c.protocol]||null}function bd(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=sc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ya(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ga(b){var a=b.indexOf("#");
return-1==a?b:b.substr(0,a)}function Fb(b){return b.replace(/(#.+)|#$/,"$1")}function cc(b){return b.substr(0,Ga(b).lastIndexOf("/")+1)}function dc(b,a){this.$$html5=!0;a=a||"";var c=cc(b);ad(b,this);this.$$parse=function(a){var b=ya(c,a);if(!C(b))throw Gb("ipthprfx",a,c);bd(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Pb(this.$$search),b=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=
function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=ya(b,d))!==t?(g=f,g=(f=ya(a,f))!==t?c+(ya("/",f)||f):b+g):(f=ya(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function ec(b,a){var c=cc(b);ad(b,this);this.$$parse=function(d){d=ya(b,d)||ya(c,d);var e;"#"===d.charAt(0)?(e=ya(a,d),x(e)&&(e=d)):e=this.$$html5?d:"";bd(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};
this.$$compose=function(){var c=Pb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ga(b)==Ga(a)?(this.$$parse(a),!0):!1}}function cd(b,a){this.$$html5=!0;ec.apply(this,arguments);var c=cc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ga(d)?f=d:(g=ya(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=
function(){var c=Pb(this.$$search),e=this.$$hash?"#"+qb(this.$$hash):"";this.$$url=bc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Hb(b){return function(){return this[b]}}function dd(b,a){return function(c){if(x(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Me(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Wa(b)?(a.enabled=b,this):J(b)?(Wa(b.enabled)&&(a.enabled=
b.enabled),Wa(b.requireBase)&&(a.requireBase=b.requireBase),Wa(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,n;n=d.baseHref();var p=d.url(),q;if(a.enabled){if(!n&&a.requireBase)throw Gb("nobase");
q=p.substring(0,p.indexOf("/",p.indexOf("//")+2))+(n||"/");n=e.history?dc:cd}else q=Ga(p),n=ec;k=new n(q,"#"+b);k.$$parseLinkUrl(p,p);k.$$state=d.state();var u=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=A(b.target);"a"!==va(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");J(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Aa(h.animVal).href);
u.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Fb(k.absUrl())!=Fb(p)&&d.url(k.absUrl(),!0);var s=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(s=!1,l(d,e)))});c.$$phase||c.$digest()});
c.$watch(function(){var a=Fb(d.url()),b=Fb(k.absUrl()),f=d.state(),g=k.$$replace,q=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(s||q)s=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=f):(q&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function Ne(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof
Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||E;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,
arguments)}}()}}]}function ua(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw na("isecfld",a);return b}function oa(b,a){if(b){if(b.constructor===b)throw na("isecfn",a);if(b.window===b)throw na("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw na("isecdom",a);if(b===Object)throw na("isecobj",a);}return b}function fc(b){return b.constant}function hb(b,a,c,d,e){oa(b,e);oa(a,e);c=c.split(".");for(var f,
g=0;1<c.length;g++){f=ua(c.shift(),e);var h=0===g&&a&&a[f]||b[f];h||(h={},b[f]=h);b=oa(h,e)}f=ua(c.shift(),e);oa(b[f],e);return b[f]=d}function Pa(b){return"constructor"==b}function ed(b,a,c,d,e,f,g){ua(b,f);ua(a,f);ua(c,f);ua(d,f);ua(e,f);var h=function(a){return oa(a,f)},l=g||Pa(b)?h:ra,k=g||Pa(a)?h:ra,n=g||Pa(c)?h:ra,p=g||Pa(d)?h:ra,q=g||Pa(e)?h:ra;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=l(h[b]);if(!a)return h;if(null==h)return t;h=k(h[a]);if(!c)return h;if(null==
h)return t;h=n(h[c]);if(!d)return h;if(null==h)return t;h=p(h[d]);return e?null==h?t:h=q(h[e]):h}}function yf(b,a){return function(c,d){return b(c,d,oa,a)}}function zf(b,a,c){var d=a.expensiveChecks,e=d?Af:Bf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ed(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ed(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var l="";d&&(l+="s = eso(s, fe);\nl = eso(l, fe);\n");var k=d;r(g,function(a,b){ua(a,
c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Pa(a))e="eso("+e+", fe)",k=!0;l+="if(s == null) return undefined;\ns="+e+";\n"});l+="return s;";a=new Function("s","l","eso","fe",l);a.toString=ea(l);k&&(a=yf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c,d){return hb(a,d,b,c,b)};return e[b]=f}function gc(b){return G(b.valueOf)?b.valueOf():Cf.call(b)}function Oe(){var b=ia(),a=ia();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,
c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=gc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&
gc(b));return h},b,c)}for(var l=[],q=0,p=e.length;q<p;q++)l[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&gc(k)}b&&(h=d(a));return h},b,c)}function l(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;G(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function k(a,b,c,d){function e(a){var b=!0;r(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},
function(a,c,d){g=a;G(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function n(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){G(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==k&&c!==l?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=
[a]);return c}var q={csp:d.csp,expensiveChecks:!1},u={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var m,r,t;switch(typeof d){case "string":t=d=d.trim();var L=g?a:b;m=L[t];m||(":"===d.charAt(0)&&":"===d.charAt(1)&&(r=!0,d=d.substring(2)),g=g?u:q,m=new hc(g),m=(new ib(m,c,g)).parse(d),m.constant?m.$$watchDelegate=n:r?(m=e(m),m.$$watchDelegate=m.literal?k:l):m.inputs&&(m.$$watchDelegate=h),L[t]=m);return p(m,f);case "function":return p(d,f);default:return p(E,f)}}}]}function Qe(){this.$get=
["$rootScope","$exceptionHandler",function(b,a){return fd(function(a){b.$evalAsync(a)},a)}]}function Re(){this.$get=["$browser","$exceptionHandler",function(b,a){return fd(function(a){b.defer(a)},a)}]}function fd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;
c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{G(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=R("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&
f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(J(b)||G(b))d=b&&b.then;G(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=
b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(G(b)?b(c):c)}catch(h){a(h)}}})}};var l=function(a,b){var c=new g;b?c.resolve(a):
c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{G(c)&&(d=c())}catch(e){return l(e,!1)}return d&&G(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},n=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function u(a){if(!G(a))throw h("norslvr",a);if(!(this instanceof u))return new u(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;
b.reject(a);return b.promise};p.when=n;p.all=function(a){var b=new g,c=0,d=H(a)?[]:{};r(a,function(a,e){c++;n(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function $e(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=
c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Pe(){function b(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++ob;this.$$ChildScope=null}b.prototype=a;return b}var a=10,c=R("$rootScope"),d=null,e=null;this.digestTtl=function(b){arguments.length&&(a=b);return a};this.$get=["$injector","$exceptionHandler",
"$parse","$browser",function(f,g,h,l){function k(a){a.currentScope.$$destroyed=!0}function n(){this.$id=++ob;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function p(a){if(v.$$phase)throw c("inprog",v.$$phase);v.$$phase=a}function q(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];
while(a=a.$parent)}function u(){}function s(){for(;t.length;)try{t.shift()()}catch(a){g(a)}e=null}function M(){null===e&&(e=l.defer(function(){v.$apply(s)}))}n.prototype={constructor:n,$new:function(a,c){var d;c=c||this;a?(d=new n,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=b(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(a||c!=this)&&d.$on("$destroy",k);return d},
$watch:function(a,b,c){var e=h(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,c,e);var f=this.$$watchers,g={fn:b,last:u,get:e,exp:a,eq:!!c};d=null;G(b)||(g.fn=E);f||(f=this.$$watchers=[]);f.unshift(g);return function(){Xa(f,g);d=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],
function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!x(e)){if(J(e))if(Sa(e))for(f!==p&&(f=p,u=f.length=0,l++),a=e.length,u!==a&&(l++,f.length=u=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==n&&(f=n={},u=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=
f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(u++,f[b]=g,l++));if(u>a)for(b in l++,f)e.hasOwnProperty(b)||(u--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,g,k=1<b.length,l=0,q=h(a,c),p=[],n={},m=!0,u=0;return this.$watch(q,function(){m?(m=!1,b(e,e,d)):b(e,g,d);if(k)if(J(e))if(Sa(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)tc.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var b,f,h,k,q,n,r=a,t,O=[],M,y;p("$digest");l.$$checkUrlChange();
this===v&&null!==e&&(l.defer.cancel(e),s());d=null;do{n=!1;for(t=this;m.length;){try{y=m.shift(),y.scope.$eval(y.expression,y.locals)}catch(w){g(w)}d=null}a:do{if(k=t.$$watchers)for(q=k.length;q--;)try{if(b=k[q])if((f=b.get(t))!==(h=b.last)&&!(b.eq?ha(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))n=!0,d=b,b.last=b.eq?Da(f,null):f,b.fn(f,h===u?f:h,t),5>r&&(M=4-r,O[M]||(O[M]=[]),O[M].push({msg:G(b.exp)?"fn: "+(b.exp.name||b.exp.toString()):b.exp,newVal:f,oldVal:h}));else if(b===
d){n=!1;break a}}catch(A){g(A)}if(!(k=t.$$childHead||t!==this&&t.$$nextSibling))for(;t!==this&&!(k=t.$$nextSibling);)t=t.$parent}while(t=k);if((n||m.length)&&!r--)throw v.$$phase=null,c("infdig",a,O);}while(n||m.length);for(v.$$phase=null;F.length;)try{F.shift()()}catch(x){g(x)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==v){for(var b in this.$$listenerCount)q(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=
this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=E;this.$on=this.$watch=this.$watchGroup=function(){return E};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,
b){return h(a)(this,b)},$evalAsync:function(a,b){v.$$phase||m.length||l.defer(function(){m.length&&v.$digest()});m.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){F.push(a)},$apply:function(a){try{return p("$apply"),this.$eval(a)}catch(b){g(b)}finally{v.$$phase=null;try{v.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&t.push(b);M()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||
(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,q(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=Ya([h],arguments,1),l,q;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(q=d.length;l<q;l++)if(d[l])try{d[l].apply(null,k)}catch(p){g(p)}else d.splice(l,1),l--,q--;if(f)return h.currentScope=
null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=Ya([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,f)}catch(k){g(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=
c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var v=new n,m=v.$$asyncQueue=[],F=v.$$postDigestQueue=[],t=v.$$applyAsyncQueue=[];return v}]}function Sd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;return""===f||f.match(e)?c:"unsafe:"+
f}}}function Df(b){if("self"===b)return b;if(C(b)){if(-1<b.indexOf("***"))throw Ba("iwcard",b);b=gd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(Ua(b))return new RegExp("^"+b.source+"$");throw Ba("imatcher");}function hd(b){var a=[];y(b)&&r(b,function(b){a.push(Df(b))});return a}function Te(){this.SCE_CONTEXTS=pa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=hd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&
(a=hd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?$c(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ba("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[pa.HTML]=e(g);h[pa.CSS]=e(g);h[pa.URL]=
e(g);h[pa.JS]=e(g);h[pa.RESOURCE_URL]=e(h[pa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ba("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===pa.RESOURCE_URL){var g=Aa(e.toString()),p,q,u=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){u=!0;break}if(u)for(p=
0,q=a.length;p<q;p++)if(d(a[p],g)){u=!1;break}if(u)return e;throw Ba("insecurl",e.toString());}if(c===pa.HTML)return f(e);throw Ba("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Se(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Qa)throw Ba("iequirks");var d=sa(pa);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=
d.getTrusted=function(a,b){return b},d.valueOf=ra);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(pa,function(a,b){var c=z(b);d[db("parse_as_"+c)]=function(b){return e(a,b)};d[db("get_trusted_"+c)]=function(b){return f(a,b)};d[db("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Ue(){this.$get=["$window","$document",function(b,a){var c={},d=aa((/android (\d+)/.exec(z((b.navigator||
{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,n=!1;if(l){for(var p in l)if(k=h.exec(p)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);n=!!("animation"in l||g+"Animation"in l);!d||k&&n||(k=C(f.body.style.webkitTransition),n=C(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===
a&&11>=Qa)return!1;if(x(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:bb(),vendorPrefix:g,transitions:k,animations:n,android:d}}]}function We(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;H(g)?g=g.filter(function(a){return a!==Zb}):g===Zb&&(g=null);return a.get(e,{cache:b,transformResponse:g})["finally"](function(){d.totalPendingRequests--}).then(function(a){return a.data},
function(a){if(!f)throw la("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Xe(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=ca.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+gd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],
h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ye(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){var n=y(k)&&!k,p=(n?d:c).defer(),q=p.promise;l=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}n||
b.$apply()},l);q.$$timeoutId=l;g[l]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Qa&&($.setAttribute("href",b),b=$.href);$.setAttribute("href",b);return{href:$.href,protocol:$.protocol?$.protocol.replace(/:$/,""):"",host:$.host,search:$.search?$.search.replace(/^\?/,""):"",hash:$.hash?$.hash.replace(/^#/,""):"",hostname:$.hostname,port:$.port,pathname:"/"===
$.pathname.charAt(0)?$.pathname:"/"+$.pathname}}function $c(b){b=C(b)?Aa(b):b;return b.protocol===id.protocol&&b.host===id.host}function Ze(){this.$get=ea(Q)}function Fc(b){function a(c,d){if(J(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",jd);a("date",kd);a("filter",Ef);a("json",Ff);a("limitTo",Gf);a("lowercase",Hf);a("number",ld);a("orderBy",md);a("uppercase",
If)}function Ef(){return function(b,a,c){if(!H(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=Jf(a,c,d);break;default:return b}return b.filter(a)}}function Jf(b,a,c){var d=J(b)&&"$"in b;!0===a?a=ha:G(a)||(a=function(a,b){if(J(a)||J(b))return!1;a=z(""+a);b=z(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!J(e)?Ha(e,b.$,a,!1):Ha(e,b,a,c)}}function Ha(b,a,c,d,e){var f=null!==b?typeof b:"null",g=null!==a?typeof a:
"null";if("string"===g&&"!"===a.charAt(0))return!Ha(b,a.substring(1),c,d);if(H(b))return b.some(function(b){return Ha(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&Ha(b[h],a,c,!0))return!0;return e?!1:Ha(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!G(e)&&!x(e)&&(f="$"===h,!Ha(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){x(d)&&(d=a.CURRENCY_SYM);x(e)&&
(e=a.PATTERNS[1].maxFrac);return null==b?b:nd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function ld(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:nd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function nd(b,a,c,d,e){if(!isFinite(b)||J(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",l=[],k=!1;if(-1!==g.indexOf("e")){var n=g.match(/([\d\.]+)e(-?)(\d+)/);n&&"-"==n[2]&&n[3]>e+1?b=0:(h=g,k=!0)}if(k)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(od)[1]||
"").length;x(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(od),k=g[0],g=g[1]||"",p=0,q=a.lgSize,u=a.gSize;if(k.length>=q+u)for(p=k.length-q,n=0;n<p;n++)0===(p-n)%u&&0!==n&&(h+=c),h+=k.charAt(n);for(n=p;n<k.length;n++)0===(k.length-n)%q&&0!==n&&(h+=c),h+=k.charAt(n);for(;g.length<e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,e))}0===b&&(f=!1);l.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return l.join("")}function Ib(b,a,
c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function U(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ib(e,a,d)}}function Jb(b,a){return function(c,d){var e=c["get"+b](),f=ub(a?"SHORT"+b:b);return d[f][e]}}function pd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function qd(b){return function(a){var c=pd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+
(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Ib(a,b)}}function ic(b,a){return 0>=b.getFullYear()?a.ERAS[0]:a.ERAS[1]}function kd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=aa(b[9]+b[10]),g=aa(b[9]+b[11]));h.call(a,aa(b[1]),aa(b[2])-1,aa(b[3]));f=aa(b[4]||0)-f;g=aa(b[5]||0)-g;h=aa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;C(c)&&(c=Kf.test(c)?aa(c):a(c));Y(c)&&(c=new Date(c));if(!ga(c))return c;for(;e;)(k=Lf.exec(e))?(h=Ya(h,k,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){l=Mf[a];g+=l?l(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ff(){return function(b,a){x(a)&&(a=2);return $a(b,a)}}function Gf(){return function(b,
a){Y(b)&&(b=b.toString());return H(b)||C(b)?(a=Infinity===Math.abs(Number(a))?Number(a):aa(a))?0<a?b.slice(0,a):b.slice(a):C(b)?"":[]:b}}function md(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function g(a){return null===a?"null":"function"===typeof a.valueOf&&(a=a.valueOf(),f(a))||"function"===typeof a.toString&&(a=a.toString(),f(a))?a:""}function h(a,b){var c=
typeof a,d=typeof b;c===d&&"object"===c&&(a=g(a),b=g(b));return c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Sa(a))return a;c=H(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||ra;if(C(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(h,c);d=b(a);if(d.constant){var f=d();return e(function(a,b){return h(a[f],b[f])},c)}}return e(function(a,b){return h(d(a),d(b))},c)});return Za.call(a).sort(e(function(a,
b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){G(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ea(b)}function rd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Kb;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,
function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});r(f.$$success,function(b,c){f.$setValidity(c,null,a)});Xa(g,a)};sd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];
d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Xa(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Ra);d.addClass(b,Lb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Ra,Lb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");
f.$submitted=!0;h.$setSubmitted()}}function jc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function jb(b,a,c,d,e,f){var g=z(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=N(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",
l);else{var k,n=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||n(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",n)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)}}function Mb(b,a){return function(c,d){var e,f;if(ga(c))return c;if(C(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Nf.test(c))return new Date(c);b.lastIndex=
0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function kb(b,a,c,d){return function(e,f,g,h,l,k,n){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?ga(a)?a:c(a):t}td(e,f,g,h);
jb(e,f,g,h,l,k);var u=h&&h.$options&&h.$options.timezone,s;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,s),"UTC"===u&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(a&&!ga(a))throw Nb("datefmt",a);if(p(a)){if((s=a)&&"UTC"===u){var b=6E4*s.getTimezoneOffset();s=new Date(s.getTime()+b)}return n("date")(a,d,u)}s=null;return""});if(y(g.min)||g.ngMin){var r;h.$validators.min=function(a){return!p(a)||x(r)||c(a)>=r};
g.$observe("min",function(a){r=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var v;h.$validators.max=function(a){return!p(a)||x(v)||c(a)<=v};g.$observe("max",function(a){v=q(a);h.$validate()})}}}function td(b,a,c,d){(d.$$hasNativeValidators=J(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function ud(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw R("ngModel")("constexpr",c,d);return b(a)}return e}function kc(b,a){b="ngClass"+b;return["$animate",
function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],n=0;n<b.length;n++)if(e==b[n])continue a;c.push(e)}return c}function e(a){if(!H(a)){if(C(a))return a.split(" ");if(J(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===
a||f.$index%2===a){var k=e(b||[]);if(!n){var u=l(k,1);h.$addClass(u)}else if(!ha(b,n)){var s=e(n),u=d(k,s),k=d(s,k),u=l(u,1),k=l(k,-1);u&&u.length&&c.addClass(g,u);k&&k.length&&c.removeClass(g,k)}}n=sa(b)}var n;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function sd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),
f[a]=!0):!b&&f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+vc(b,"-"):"";a(lb+b,!0===c);a(vd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[vd]=!(f[lb]=e.hasClass(lb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),wd(d.$pending)&&(d.$pending=t));Wa(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(xd,
!0),d.$valid=d.$invalid=t,c("",null)):(a(xd,!1),d.$valid=wd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function wd(b){if(b)for(var a in b)return!1;return!0}var Of=/^\/(.+)\/([a-z]*)$/,z=function(b){return C(b)?b.toLowerCase():b},tc=Object.prototype.hasOwnProperty,ub=function(b){return C(b)?b.toUpperCase():b},Qa,A,ta,Za=[].slice,qf=[].splice,Pf=[].push,Ca=Object.prototype.toString,Ja=R("ng"),ca=Q.angular||
(Q.angular={}),cb,ob=0;Qa=W.documentMode;E.$inject=[];ra.$inject=[];var H=Array.isArray,N=function(b){return C(b)?b.trim():b},gd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},bb=function(){if(y(bb.isActive_))return bb.isActive_;var b=!(!W.querySelector("[ng-csp]")&&!W.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return bb.isActive_=b},rb=["ng-","data-ng-","ng:","x-ng-"],Md=/[A-Z]/g,wc=!1,Qb,qa=1,pb=3,Qd={full:"1.3.15",major:1,
minor:3,dot:15,codeName:"locality-filtration"};T.expando="ng339";var zb=T.cache={},hf=1;T._data=function(b){return this.cache[b[this.expando]]||{}};var cf=/([\:\-\_]+(.))/g,df=/^moz([A-Z])/,Qf={mouseleave:"mouseout",mouseenter:"mouseover"},Tb=R("jqLite"),gf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Sb=/<|&#?\w+;/,ef=/<([\w:]+)/,ff=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>",
"</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ja.optgroup=ja.option;ja.tbody=ja.tfoot=ja.colgroup=ja.caption=ja.thead;ja.th=ja.td;var Ka=T.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===W.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),T(Q).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=
b?A(this[b]):A(this[this.length+b])},length:0,push:Pf,sort:[].sort,splice:[].splice},Eb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){Eb[z(b)]=b});var Oc={};r("input select option textarea button form details".split(" "),function(b){Oc[b]=!0});var Pc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Vb,removeData:xb},function(b,a){T[a]=b});r({data:Vb,inheritedData:Db,scope:function(b){return A.data(b,"$scope")||
Db(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return A.data(b,"$isolateScope")||A.data(b,"$isolateScopeNoTemplate")},controller:Kc,injector:function(b){return Db(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Ab,css:function(b,a,c){a=db(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=z(a);if(Eb[d])if(y(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||E).specified?
d:t;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(x(b)){var d=a.nodeType;return d===qa||d===pb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(x(a)){if(b.multiple&&"select"===va(b)){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(x(a))return b.innerHTML;
wb(b,!0);b.innerHTML=a},empty:Lc},function(b,a){T.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Lc&&(2==b.length&&b!==Ab&&b!==Kc?a:d)===t){if(J(a)){for(e=0;e<g;e++)if(b===Vb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:xb,on:function a(c,d,e,f){if(y(f))throw Tb("onargs");if(Gc(c)){var g=yb(c,!0);f=g.events;var h=g.handle;h||(h=
g.handle=lf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Qf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Jc,one:function(a,c,d){a=A(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;wb(a);r(new T(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,
a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===qa&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===qa||11===d){c=new T(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===qa){var d=a.firstChild;r(new T(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=A(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},
remove:Mc,detach:function(a){Mc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new T(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Cb,removeClass:Bb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;x(f)&&(f=!Ab(a,c));(f?Cb:Bb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Ub,
triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=yb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:E,type:g,target:a},c.type&&(e=w(e,c)),c=sa(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,
f)})}},function(a,c){T.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)x(g)?(g=a(this[h],c,e,f),y(g)&&(g=A(g))):Ic(g,a(this[h],c,e,f));return y(g)?g:this};T.prototype.bind=T.prototype.on;T.prototype.unbind=T.prototype.off});eb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];return c}};var Rc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Rf=/,/,Sf=/^\s*(_?)(\S+?)\1\s*$/,
Qc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Fa=R("$injector");ab.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=[];if(a.length){if(c)throw C(d)&&d||(d=a.name||mf(a)),Fa("strictdi",d);c=a.toString().replace(Qc,"");c=c.match(Rc);r(c[1].split(Rf),function(a){a.replace(Sf,function(a,c,d){e.push(d)})})}a.$inject=e}}else H(a)?(c=a.length-1,sb(a[c],"fn"),e=a.slice(0,c)):sb(a,"fn",!0);return e};var Tf=R("$animate"),Ce=["$provide",function(a){this.$$selectors={};this.register=function(c,
d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Tf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ia();
r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function l(){n||(n=a.defer(),d(function(){n.resolve();n=null}));return n.promise}function k(a,c){if(ca.isObject(c)){var d=w(c.from||{},c.to||{});a.css(d)}}var n;return{animate:function(a,c,d){k(a,{from:c,to:d});return l()},enter:function(a,c,d,e){k(a,
e);d?d.after(a):c.prepend(a);return l()},leave:function(a,c){k(a,c);a.remove();return l()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=A(a);c=C(c)?c:H(c)?c.join(" "):"";r(a,function(a){Cb(a,c)});k(a,d);return l()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=A(a);c=C(c)?c:H(c)?c.join(" "):"";r(a,function(a){Bb(a,c)});k(a,d);return l()},setClass:function(a,
c,d,e){var k=this,l=!1;a=A(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ca.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=H(c)?c:c.split(" ");d=H(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,
c);d&&this.$$removeClassImmediately(a,d);k(a,e);return l()},enabled:E,cancel:E}}]}],la=R("$compile");yc.$inject=["$provide","$$sanitizeUriProvider"];var Sc=/^((?:x|data)[\:\-_])/i,rf=R("$controller"),Wc="application/json",$b={"Content-Type":Wc+";charset=utf-8"},tf=/^\[|^\{(?!\{)/,uf={"[":/]$/,"{":/}$/},sf=/^\)\]\}',?\n/,ac=R("$interpolate"),Uf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,xf={http:80,https:443,ftp:21},Gb=R("$location"),Vf={$$html5:!1,$$replace:!1,absUrl:Hb("$$absUrl"),url:function(a){if(x(a))return this.$$url;
var c=Uf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Hb("$$protocol"),host:Hb("$$host"),port:Hb("$$port"),path:dd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(C(a)||Y(a))a=a.toString(),this.$$search=sc(a);else if(J(a))a=Da(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=
a;else throw Gb("isrcharg");break;default:x(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([cd,ec,dc],function(a){a.prototype=Object.create(Vf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==dc||!this.$$html5)throw Gb("nostate");this.$$state=x(c)?null:c;return this}});var na=R("$parse"),Wf=Function.prototype.call,
Xf=Function.prototype.apply,Yf=Function.prototype.bind,mb=ia();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;mb[c]=a});mb["this"]=function(a){return a};mb["this"].sharedGetter=!0;var nb=w(ia(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},
"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},
"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Zf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},hc=function(a){this.options=a};hc.prototype={constructor:hc,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,
"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=nb[c],f=nb[d];nb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},
isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw na("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<
this.text.length;){var d=z(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=
this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):
d+=Zf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var ib=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};ib.ZERO=w(function(){return 0},{sharedGetter:!0,constant:!0});ib.prototype={constructor:ib,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);
a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier&&this.peek().text in mb?a=mb[this.consume().text]:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,
d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw na("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw na("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===
f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw na("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=nb[a];return w(function(a,f){return d(a,f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=nb[c];return w(function(c,e){return f(c,e,a,d)},{constant:a.constant&&
d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return zf(a,this.options,this.text)},constant:function(){var a=this.consume().value;return w(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,
d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return w(function(f,h){var l=a(f,h);if(e){e[0]=l;for(l=d.length;l--;)e[l+1]=d[l](f,h);return c.apply(t,e)}return c(l)},{constant:!c.$stateful&&f.every(fc),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},
assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),w(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&(c=this.assignment(),this.consume(":"))){var d=this.assignment();return w(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},
logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a=this.binaryFn(a,c.text,this.relational());return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,
this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(ib.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=
this.identifier();return w(function(d,e,f){d=f||a(d,e);return null==d?t:c(d)},{assign:function(d,e,f){var g=a(d,f);g||a.assign(d,g={},f);return c.assign(g,e)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return w(function(e,f){var g=a(e,f),h=d(e,f);ua(h,c);return g?oa(g[h],c):t},{assign:function(e,f,g){var h=ua(d(e,g),c),l=oa(a(e,g),c);l||a.assign(e,l={},g);return l[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());
while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var l=c?c(g,h):y(c)?t:g,k=a(g,h,l)||E;if(f)for(var n=d.length;n--;)f[n]=oa(d[n](g,h),e);oa(l,e);if(k){if(k.constructor===k)throw na("isecfn",e);if(k===Wf||k===Xf||k===Yf)throw na("isecff",e);}l=k.apply?k.apply(l,f):k(f[0],f[1],f[2],f[3],f[4]);f&&(f.length=0);return oa(l,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))
}this.consume("]");return w(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(fc),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return w(function(d,f){for(var g={},h=0,l=c.length;h<l;h++)g[a[h]]=
c[h](d,f);return g},{literal:!0,constant:c.every(fc),inputs:c})}};var Bf=ia(),Af=ia(),Cf=Object.prototype.valueOf,Ba=R("$sce"),pa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},la=R("$compile"),$=W.createElement("a"),id=Aa(Q.location.href);Fc.$inject=["$provide"];jd.$inject=["$locale"];ld.$inject=["$locale"];var od=".",Mf={yyyy:U("FullYear",4),yy:U("FullYear",2,0,!0),y:U("FullYear",1),MMMM:Jb("Month"),MMM:Jb("Month",!0),MM:U("Month",2,1),M:U("Month",1,1),dd:U("Date",2),d:U("Date",
1),HH:U("Hours",2),H:U("Hours",1),hh:U("Hours",2,-12),h:U("Hours",1,-12),mm:U("Minutes",2),m:U("Minutes",1),ss:U("Seconds",2),s:U("Seconds",1),sss:U("Milliseconds",3),EEEE:Jb("Day"),EEE:Jb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ib(Math[0<a?"floor":"ceil"](a/60),2)+Ib(Math.abs(a%60),2))},ww:qd(2),w:qd(1),G:ic,GG:ic,GGG:ic,GGGG:function(a,c){return 0>=a.getFullYear()?c.ERANAMES[0]:c.ERANAMES[1]}},Lf=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
Kf=/^\-?\d+$/;kd.$inject=["$locale"];var Hf=ea(z),If=ea(ub);md.$inject=["$parse"];var Td=ea({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===Ca.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),vb={};r(Eb,function(a,c){if("multiple"!=a){var d=xa("ng-"+c);vb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],
function(a){g.$set(c,!!a)})}}}}});r(Pc,function(a,c){vb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Of))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=xa("ng-"+a);vb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ca.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",
g=null);f.$observe(c,function(c){c?(f.$set(h,c),Qa&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Kb={$addControl:E,$$renameControl:function(a,c){a.$name=c},$removeControl:E,$setValidity:E,$setDirty:E,$setPristine:E,$setSubmitted:E};rd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var yd=function(a){return["$timeout",function(c){return{name:"form",restrict:a?"EAC":"E",controller:rd,compile:function(d,e){d.addClass(Ra).addClass(lb);var f=e.name?"name":a&&e.ngForm?"ngForm":
!1;return{pre:function(a,d,e,k){if(!("action"in e)){var n=function(c){a.$apply(function(){k.$commitViewValue();k.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",n,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",n,!1)},0,!1)})}var p=k.$$parentForm;f&&(hb(a,null,k.$name,k,k.$name),e.$observe(f,function(c){k.$name!==c&&(hb(a,null,k.$name,t,k.$name),p.$$renameControl(k,c),hb(a,null,k.$name,k,k.$name))}));d.on("$destroy",function(){p.$removeControl(k);
f&&hb(a,null,e[f],t,k.$name);w(k,Kb)})}}}}}]},Ud=yd(),ge=yd(!0),Nf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,$f=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,ag=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,bg=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,zd=/^(\d{4})-(\d{2})-(\d{2})$/,Ad=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,lc=/^(\d{4})-W(\d\d)$/,Bd=/^(\d{4})-(\d\d)$/,
Cd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Dd={text:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e)},date:kb("date",zd,Mb(zd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":kb("datetimelocal",Ad,Mb(Ad,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:kb("time",Cd,Mb(Cd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:kb("week",lc,function(a,c){if(ga(a))return a;if(C(a)){lc.lastIndex=0;var d=lc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=pd(e),f=7*(f-1);c&&(d=c.getHours(),g=
c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:kb("month",Bd,Mb(Bd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){td(a,c,d,e);jb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:bg.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!Y(a))throw Nb("numfmt",a);a=a.toString()}return a});if(y(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||
x(h)||a>=h};d.$observe("min",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));h=Y(a)&&!isNaN(a)?a:t;e.$validate()})}if(y(d.max)||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||x(l)||a<=l};d.$observe("max",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));l=Y(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||$f.test(d)}},email:function(a,c,d,e,f,g){jb(a,c,d,e,f,g);jc(e);
e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||ag.test(d)}},radio:function(a,c,d,e){x(d.name)&&c.attr("name",++ob);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=ud(l,a,"ngTrueValue",d.ngTrueValue,!0),n=ud(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&
a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ha(a,k)});e.$parsers.push(function(a){return a?k:n})},hidden:E,button:E,submit:E,reset:E,file:E},zc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Dd[z(h.type)]||Dd.text)(f,g,h,l[0],c,a,d,e)}}}}],cg=/^(true|false|\d+)$/,ye=function(){return{restrict:"A",priority:100,compile:function(a,
c){return cg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},Zd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],ae=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));
c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],$d=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],xe=ea({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
be=kc("",!0),de=kc("Odd",0),ce=kc("Even",1),ee=Ia({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),fe=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ec={},dg={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=xa("ng-"+a);Ec[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=
d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};dg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ie=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=W.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=
tb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],je=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ca.noop,compile:function(f,g){var h=g.ngInclude||g.src,l=g.onload||"",k=g.autoscroll;return function(f,g,q,r,s){var t=0,v,m,F,w=function(){m&&(m.remove(),m=null);v&&(v.$destroy(),v=null);F&&(d.leave(F).then(function(){m=null}),m=F,F=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=
function(){!y(k)||k&&!f.$eval(k)||c()},m=++t;e?(a(e,!0).then(function(a){if(m===t){var c=f.$new();r.template=a;a=s(c,function(a){w();d.enter(a,null,g).then(h)});v=c;F=a;v.$emit("$includeContentLoaded",e);f.$eval(l)}},function(){m===t&&(w(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(w(),r.template=null)})}}}}],Ae=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Hc(f.template,
W).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ke=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),we=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?N(f):f;e.$parsers.push(function(a){if(!x(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?N(a):a)});return c}});e.$formatters.push(function(a){return H(a)?
a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},lb="ng-valid",vd="ng-invalid",Ra="ng-pristine",Lb="ng-dirty",xd="ng-pending",Nb=new R("ngModel"),eg=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,n){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;
this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=n(d.name||"",!1)(a);var p=f(d.ngModel),q=p.assign,u=p,s=q,M=null,v,m=this;this.$$setOptions=function(a){if((m.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");u=function(a){var d=p(a);G(d)&&(d=c(a));return d};s=function(a,c){G(p(a))?g(a,{$$$p:m.$modelValue}):q(a,m.$modelValue)}}else if(!p.assign)throw Nb("nonassign",d.ngModel,wa(e));
};this.$render=E;this.$isEmpty=function(a){return x(a)||""===a||null===a||a!==a};var F=e.inheritedData("$formController")||Kb,w=0;sd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:F,$animate:g});this.$setPristine=function(){m.$dirty=!1;m.$pristine=!0;g.removeClass(e,Lb);g.addClass(e,Ra)};this.$setDirty=function(){m.$dirty=!0;m.$pristine=!1;g.removeClass(e,Ra);g.addClass(e,Lb);F.$setDirty()};this.$setUntouched=function(){m.$touched=!1;m.$untouched=!0;g.setClass(e,
"ng-untouched","ng-touched")};this.$setTouched=function(){m.$touched=!0;m.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(M);m.$viewValue=m.$$lastCommittedViewValue;m.$render()};this.$validate=function(){if(!Y(m.$modelValue)||!isNaN(m.$modelValue)){var a=m.$$rawModelValue,c=m.$valid,d=m.$modelValue,e=m.$options&&m.$options.allowInvalid;m.$$runValidators(a,m.$$lastCommittedViewValue,function(f){e||c===f||(m.$modelValue=f?a:t,m.$modelValue!==d&&m.$$writeModelToScope())})}};
this.$$runValidators=function(a,c,d){function e(){var d=!0;r(m.$validators,function(e,f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(r(m.$asyncValidators,function(a,c){g(c,null)}),!1)}function f(){var d=[],e=!0;r(m.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!G(k.then))throw Nb("$asyncValidators",k);g(h,t);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},E):h(!0)}function g(a,c){l===w&&m.$setValidity(a,c)}function h(a){l===w&&d(a)}w++;var l=
w;(function(){var a=m.$$parserName||"parse";if(v===t)g(a,null);else return v||(r(m.$validators,function(a,c){g(c,null)}),r(m.$asyncValidators,function(a,c){g(c,null)})),g(a,v),v;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=m.$viewValue;h.cancel(M);if(m.$$lastCommittedViewValue!==a||""===a&&m.$$hasNativeValidators)m.$$lastCommittedViewValue=a,m.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=m.$$lastCommittedViewValue;if(v=
x(c)?t:!0)for(var d=0;d<m.$parsers.length;d++)if(c=m.$parsers[d](c),x(c)){v=!1;break}Y(m.$modelValue)&&isNaN(m.$modelValue)&&(m.$modelValue=u(a));var e=m.$modelValue,f=m.$options&&m.$options.allowInvalid;m.$$rawModelValue=c;f&&(m.$modelValue=c,m.$modelValue!==e&&m.$$writeModelToScope());m.$$runValidators(c,m.$$lastCommittedViewValue,function(a){f||(m.$modelValue=a?c:t,m.$modelValue!==e&&m.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,m.$modelValue);r(m.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};
this.$setViewValue=function(a,c){m.$viewValue=a;m.$options&&!m.$options.updateOnDefault||m.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=m.$options;e&&y(e.debounce)&&(e=e.debounce,Y(e)?d=e:Y(e[c])?d=e[c]:Y(e["default"])&&(d=e["default"]));h.cancel(M);d?M=h(function(){m.$commitViewValue()},d):l.$$phase?m.$commitViewValue():a.$apply(function(){m.$commitViewValue()})};a.$watch(function(){var c=u(a);if(c!==m.$modelValue){m.$modelValue=m.$$rawModelValue=c;v=t;for(var d=
m.$formatters,e=d.length,f=c;e--;)f=d[e](f);m.$viewValue!==f&&(m.$viewValue=m.$$lastCommittedViewValue=f,m.$render(),m.$$runValidators(c,f,E))}return c})}],ve=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:eg,priority:1,compile:function(c){c.addClass(Ra).addClass("ng-untouched").addClass(lb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Kb;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,
a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],fg=/(\s+|^)default(\s+|$)/,ze=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?(this.$options.updateOnDefault=
!1,this.$options.updateOn=N(this.$options.updateOn.replace(fg,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},le=Ia({terminal:!0,priority:1E3}),me=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function l(a){g.text(a||"")}var k=h.count,n=h.$attr.when&&g.attr(h.$attr.when),p=h.offset||0,q=f.$eval(n)||{},u={},n=c.startSymbol(),s=c.endSymbol(),t=n+k+"-"+p+s,v=ca.noop,m;r(h,function(a,c){var d=
e.exec(c);d&&(d=(d[1]?"-":"")+z(d[2]),q[d]=g.attr(h.$attr[c]))});r(q,function(a,e){u[e]=c(a.replace(d,t))});f.$watch(k,function(c){c=parseFloat(c);var d=isNaN(c);d||c in q||(c=a.pluralCat(c-p));c===m||d&&isNaN(m)||(v(),v=f.$watch(u[c],l),m=c)})}}}],ne=["$parse","$animate",function(a,c){var d=R("ngRepeat"),e=function(a,c,d,e,k,n,p){a[d]=e;k&&(a[k]=n);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",
priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=W.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var n=k[1],p=k[2],q=k[3],u=k[4],k=n.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",n);var s=k[3]||k[1],y=k[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(q)))throw d("badident",
q);var v,m,w,x,E={$id:Ma};u?v=a(u):(w=function(a,c){return Ma(c)},x=function(a){return a});return function(a,f,g,k,n){v&&(m=function(c,d,e){y&&(E[y]=c);E[s]=d;E.$index=e;return v(a,E)});var u=ia();a.$watchCollection(p,function(g){var k,p,v=f[0],D,E=ia(),G,H,L,S,J,C,z;q&&(a[q]=g);if(Sa(g))J=g,p=m||w;else{p=m||x;J=[];for(z in g)g.hasOwnProperty(z)&&"$"!=z.charAt(0)&&J.push(z);J.sort()}G=J.length;z=Array(G);for(k=0;k<G;k++)if(H=g===J?k:J[k],L=g[H],S=p(H,L,k),u[S])C=u[S],delete u[S],E[S]=C,z[k]=C;else{if(E[S])throw r(z,
function(a){a&&a.scope&&(u[a.id]=a)}),d("dupes",h,S,L);z[k]={id:S,scope:t,clone:t};E[S]=!0}for(D in u){C=u[D];S=tb(C.clone);c.leave(S);if(S[0].parentNode)for(k=0,p=S.length;k<p;k++)S[k].$$NG_REMOVED=!0;C.scope.$destroy()}for(k=0;k<G;k++)if(H=g===J?k:J[k],L=g[H],C=z[k],C.scope){D=v;do D=D.nextSibling;while(D&&D.$$NG_REMOVED);C.clone[0]!=D&&c.move(tb(C.clone),null,A(v));v=C.clone[C.clone.length-1];e(C.scope,k,s,L,y,H,G)}else n(function(a,d){C.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,
null,A(v));v=f;C.clone=a;E[C.id]=C;e(C.scope,k,s,L,y,H,G)});u=E})}}}}],oe=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],he=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],pe=Ia(function(a,c,d){a.$watchCollection(d.ngStyle,
function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)})}),qe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],n=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var s=tb(h[d].clone);k[d].$destroy();(l[d]=a.leave(s)).then(n(l,d))}h.length=0;k.length=0;(g=
f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=W.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],re=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),se=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,
link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),ue=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw R("ngTransclude")("orphan",wa(c));f(function(a){c.empty();c.append(a)})}}),Vd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],gg=R("ngOptions"),te=ea({restrict:"A",terminal:!0}),Wd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
e={$setViewValue:E};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},n=e,p;l.databound=d.ngModel;l.init=function(a,c,d){n=a;p=d};l.addOption=function(c,d){La(c,'"option value"');k[c]=!0;n.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],n.$viewValue===a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c=
"? "+Ma(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=E})}],link:function(e,g,h,l){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(C.parent()&&C.remove(),c.val(a),""===a&&v.prop("selected",!0)):x(a)&&v?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){C.parent()&&C.remove();d.$setViewValue(c.val())})})}function n(a,c,d){var e;
d.$render=function(){var a=new eb(d.$viewValue);r(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){ha(e,d.$viewValue)||(e=sa(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){T[x]=d;G&&(T[G]=c);return a(e,T)}function k(a){var c;if(u)if(I&&H(a)){c=new eb([]);for(var d=0;d<a.length;d++)c.put(h(I,null,a[d]),!0)}else c=
new eb(a);else I&&(a=h(I,null,a));return function(d,e){var f;f=I?I:B?B:z;return u?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){m||(e.$$postDigest(p),m=!0)}function n(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){m=!1;var a={"":[]},c=[""],d,l,s,t,v;s=g.$viewValue;t=L(e)||[];var B=G?Object.keys(t).sort():t,x,A,H,z,O={};v=k(s);var N=!1,U,W;Q={};for(z=0;H=B.length,z<H;z++){x=z;if(G&&(x=B[z],"$"===x.charAt(0)))continue;A=t[x];d=h(J,x,A)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=v(x,A);N=N||d;A=h(C,x,A);
A=y(A)?A:"";W=I?I(e,T):G?B[z]:z;I&&(Q[W]=x);l.push({id:W,label:A,selected:d})}u||(w||null===s?a[""].unshift({id:"",label:"",selected:!N}):N||a[""].unshift({id:"?",label:"",selected:!0}));x=0;for(B=c.length;x<B;x++){d=c[x];l=a[d];R.length<=x?(s={element:E.clone().attr("label",d),label:l.label},t=[s],R.push(t),f.append(s.element)):(t=R[x],s=t[0],s.label!=d&&s.element.attr("label",s.label=d));N=null;z=0;for(H=l.length;z<H;z++)d=l[z],(v=t[z+1])?(N=v.element,v.label!==d.label&&(n(O,v.label,!1),n(O,d.label,
!0),N.text(v.label=d.label),N.prop("label",v.label)),v.id!==d.id&&N.val(v.id=d.id),N[0].selected!==d.selected&&(N.prop("selected",v.selected=d.selected),Qa&&N.prop("selected",v.selected))):(""===d.id&&w?U=w:(U=F.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),t.push(v={element:U,label:d.label,id:d.id,selected:d.selected}),n(O,d.label,!0),N?N.after(U):s.element.append(U),N=U);for(z++;t.length>z;)d=t.pop(),n(O,d.label,!1),d.element.remove()}for(;R.length>
x;){l=R.pop();for(z=1;z<l.length;++z)n(O,l[z].label,!1);l[0].element.remove()}r(O,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var v;if(!(v=s.match(d)))throw gg("iexp",s,wa(f));var C=c(v[2]||v[1]),x=v[4]||v[6],A=/ as /.test(v[0])&&v[1],B=A?c(A):null,G=v[5],J=c(v[3]||""),z=c(v[2]?v[1]:x),L=c(v[7]),I=v[8]?c(v[8]):null,Q={},R=[[{element:f,label:""}]],T={};w&&(a(w)(e),w.removeClass("ng-scope"),w.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=L(e)||[],c;if(u)c=[],r(f.val(),
function(d){d=I?Q[d]:d;c.push("?"===d?t:""===d?null:h(B?B:z,d,a[d]))});else{var d=I?Q[f.val()]:f.val();c="?"===d?t:""===d?null:h(B?B:z,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(L,l);e.$watchCollection(function(){var a=L(e),c;if(a&&H(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);u&&e.$watchCollection(function(){return g.$modelValue},l)}if(l[1]){var q=l[0];l=l[1];var u=h.multiple,
s=h.ngOptions,w=!1,v,m=!1,F=A(W.createElement("option")),E=A(W.createElement("optgroup")),C=F.clone();h=0;for(var B=g.children(),G=B.length;h<G;h++)if(""===B[h].value){v=w=B.eq(h);break}q.init(l,w,C);u&&(l.$isEmpty=function(a){return!a||0===a.length});s?p(e,g,l):u?n(e,g,l):k(e,g,l,q)}}}}],Yd=["$interpolate",function(a){var c={addOption:E,removeOption:E};return{restrict:"E",priority:100,compile:function(d,e){if(x(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=
d.parent(),n=k.data("$selectController")||k.parent().data("$selectController");n&&n.databound||(n=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&n.removeOption(c);n.addOption(a,d)}):n.addOption(e.value,d);d.on("$destroy",function(){n.removeOption(e.value)})}}}}],Xd=ea({restrict:"E",terminal:!1}),Bc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},
Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){C(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw R("ngPattern")("noregexp",g,a,wa(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||x(f)||f.test(a)}}}}},Dc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=aa(a);f=isNaN(a)?-1:a;e.$validate()});
e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Cc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}};Q.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Nd(),Pd(ca),A(W).ready(function(){Jd(W,uc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(q,d,C){'use strict';function v(r,k,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,c,y){function z(){l&&(h.cancel(l),l=null);m&&(m.$destroy(),m=null);n&&(l=h.leave(n),l.then(function(){l=null}),n=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),c=r.current;n=y(b,function(b){h.enter(b,null,n||f).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||k()});z()});m=c.scope=b;m.$emit("$viewContentLoaded");
m.$eval(w)}else z()}var m,n,l,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,k,h){return{restrict:"ECA",priority:-400,link:function(a,f){var b=h.current,c=b.locals;f.html(c.$template);var y=d(f.contents());b.controller&&(c.$scope=a,c=k(b.controller,c),b.controllerAs&&(a[b.controllerAs]=c),f.data("$ngControllerController",c),f.children().data("$ngControllerController",c));y(a)}}}q=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return d.extend(Object.create(a),
f)}function k(a,d){var b=d.caseInsensitiveMatch,c={originalPath:a,regexp:a},h=c.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");c.regexp=new RegExp("^"+a+"$",b?"i":"");return c}var h={};this.when=function(a,f){var b=d.copy(f);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);h[a]=d.extend(b,a&&k(a,b));if(a){var c="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";h[c]=d.extend({redirectTo:a},k(c,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,c,k,q,x){function m(b){var e=s.current;
(v=(p=l())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!w)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function n(){var u=s.current,e=p;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),c.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,g;d.forEach(a,function(b,e){a[e]=d.isString(b)?k.get(b):k.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(g=e.templateUrl)&&(d.isFunction(g)&&(g=g(e.params)),g=x.getTrustedResourceUrl(g),d.isDefined(g)&&(e.loadedTemplateUrl=g,b=q(g)));d.isDefined(b)&&(a.$template=b);return c.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function l(){var a,b;d.forEach(h,function(c,h){var g;if(g=!b){var k=f.path();g=c.keys;var m={};if(c.regexp)if(k=c.regexp.exec(k)){for(var l=1,n=k.length;l<n;++l){var p=g[l-1],q=k[l];p&&q&&(m[p.name]=q)}g=m}else g=null;else g=null;g=a=g}g&&(b=r(c,{params:d.extend({},f.search(),a),pathParams:a}),b.$$route=c)});return b||h[null]&&r(h[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
h=f[1];c.push(b[h]);c.push(f[2]||"");delete b[h]}});return c.join("")}var w=!1,p,v,s={routes:h,reload:function(){w=!0;a.$evalAsync(function(){m();n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",m);a.$on("$locationChangeSuccess",n);return s}]});var B=d.$$minErr("ngRoute");q.provider("$routeParams",function(){this.$get=function(){return{}}});
q.directive("ngView",v);q.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){function c(a){var b="length"in a&&a.length,c=_.type(a);return"function"===c||_.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}function d(a,b,c){if(_.isFunction(b))return _.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return _.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(ha.test(b))return _.filter(b,a,c);b=_.filter(b,a)}return _.grep(a,function(a){return U.call(b,a)>=0!==c})}function e(a,b){for(;(a=a[b])&&1!==a.nodeType;);return a}function f(a){var b=oa[a]={};return _.each(a.match(na)||[],function(a,c){b[c]=!0}),b}function g(){Z.removeEventListener("DOMContentLoaded",g,!1),a.removeEventListener("load",g,!1),_.ready()}function h(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=_.expando+h.uid++}function i(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(ua,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:ta.test(c)?_.parseJSON(c):c}catch(e){}sa.set(a,b,c)}else c=void 0;return c}function j(){return!0}function k(){return!1}function l(){try{return Z.activeElement}catch(a){}}function m(a,b){return _.nodeName(a,"table")&&_.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function n(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function o(a){var b=Ka.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function p(a,b){for(var c=0,d=a.length;d>c;c++)ra.set(a[c],"globalEval",!b||ra.get(b[c],"globalEval"))}function q(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(ra.hasData(a)&&(f=ra.access(a),g=ra.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)_.event.add(b,e,j[e][c])}sa.hasData(a)&&(h=sa.access(a),i=_.extend({},h),sa.set(b,i))}}function r(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&_.nodeName(a,b)?_.merge([a],c):c}function s(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ya.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}function t(b,c){var d,e=_(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:_.css(e[0],"display");return e.detach(),f}function u(a){var b=Z,c=Oa[a];return c||(c=t(a,b),"none"!==c&&c||(Na=(Na||_("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=Na[0].contentDocument,b.write(),b.close(),c=t(a,b),Na.detach()),Oa[a]=c),c}function v(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||_.contains(a.ownerDocument,a)||(g=_.style(a,b)),Qa.test(g)&&Pa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function w(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}function x(a,b){if(b in a)return b;for(var c=b[0].toUpperCase()+b.slice(1),d=b,e=Xa.length;e--;)if(b=Xa[e]+c,b in a)return b;return d}function y(a,b,c){var d=Ta.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function z(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=_.css(a,c+wa[f],!0,e)),d?("content"===c&&(g-=_.css(a,"padding"+wa[f],!0,e)),"margin"!==c&&(g-=_.css(a,"border"+wa[f]+"Width",!0,e))):(g+=_.css(a,"padding"+wa[f],!0,e),"padding"!==c&&(g+=_.css(a,"border"+wa[f]+"Width",!0,e)));return g}function A(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g="border-box"===_.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=v(a,b,f),(0>e||null==e)&&(e=a.style[b]),Qa.test(e))return e;d=g&&(Y.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+z(a,b,c||(g?"border":"content"),d,f)+"px"}function B(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=ra.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&xa(d)&&(f[g]=ra.access(d,"olddisplay",u(d.nodeName)))):(e=xa(d),"none"===c&&e||ra.set(d,"olddisplay",e?c:_.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function C(a,b,c,d,e){return new C.prototype.init(a,b,c,d,e)}function D(){return setTimeout(function(){Ya=void 0}),Ya=_.now()}function E(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=wa[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function F(a,b,c){for(var d,e=(cb[b]||[]).concat(cb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function G(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},n=a.style,o=a.nodeType&&xa(a),p=ra.get(a,"fxshow");c.queue||(h=_._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,_.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[n.overflow,n.overflowX,n.overflowY],j=_.css(a,"display"),k="none"===j?ra.get(a,"olddisplay")||u(a.nodeName):j,"inline"===k&&"none"===_.css(a,"float")&&(n.display="inline-block")),c.overflow&&(n.overflow="hidden",l.always(function(){n.overflow=c.overflow[0],n.overflowX=c.overflow[1],n.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],$a.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(o?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;o=!0}m[d]=p&&p[d]||_.style(a,d)}else j=void 0;if(_.isEmptyObject(m))"inline"===("none"===j?u(a.nodeName):j)&&(n.display=j);else{p?"hidden"in p&&(o=p.hidden):p=ra.access(a,"fxshow",{}),f&&(p.hidden=!o),o?_(a).show():l.done(function(){_(a).hide()}),l.done(function(){var b;ra.remove(a,"fxshow");for(b in m)_.style(a,b,m[b])});for(d in m)g=F(o?p[d]:0,d,l),d in p||(p[d]=g.start,o&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function H(a,b){var c,d,e,f,g;for(c in a)if(d=_.camelCase(c),e=b[d],f=a[c],_.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=_.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function I(a,b,c){var d,e,f=0,g=bb.length,h=_.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Ya||D(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:_.extend({},b),opts:_.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Ya||D(),duration:c.duration,tweens:[],createTween:function(b,c){var d=_.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(H(k,j.opts.specialEasing);g>f;f++)if(d=bb[f].call(j,a,k,j.opts))return d;return _.map(k,F,j),_.isFunction(j.opts.start)&&j.opts.start.call(a,j),_.fx.timer(_.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function J(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(na)||[];if(_.isFunction(c))for(;d=f[e++];)"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function K(a,b,c,d){function e(h){var i;return f[h]=!0,_.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||g||f[j]?g?!(i=j):void 0:(b.dataTypes.unshift(j),e(j),!1)}),i}var f={},g=a===tb;return e(b.dataTypes[0])||!f["*"]&&e("*")}function L(a,b){var c,d,e=_.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&_.extend(!0,a,d),a}function M(a,b,c){for(var d,e,f,g,h=a.contents,i=a.dataTypes;"*"===i[0];)i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function N(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];for(f=k.shift();f;)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}function O(a,b,c,d){var e;if(_.isArray(b))_.each(b,function(b,e){c||yb.test(a)?d(a,e):O(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==_.type(b))d(a,b);else for(e in b)O(a+"["+e+"]",b[e],c,d)}function P(a){return _.isWindow(a)?a:9===a.nodeType&&a.defaultView}var Q=[],R=Q.slice,S=Q.concat,T=Q.push,U=Q.indexOf,V={},W=V.toString,X=V.hasOwnProperty,Y={},Z=a.document,$="2.1.4",_=function(a,b){return new _.fn.init(a,b)},aa=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ba=/^-ms-/,ca=/-([\da-z])/gi,da=function(a,b){return b.toUpperCase()};_.fn=_.prototype={jquery:$,constructor:_,selector:"",length:0,toArray:function(){return R.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:R.call(this)},pushStack:function(a){var b=_.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return _.each(this,a,b)},map:function(a){return this.pushStack(_.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(R.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:T,sort:Q.sort,splice:Q.splice},_.extend=_.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||_.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(_.isPlainObject(d)||(e=_.isArray(d)))?(e?(e=!1,f=c&&_.isArray(c)?c:[]):f=c&&_.isPlainObject(c)?c:{},g[b]=_.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},_.extend({expando:"jQuery"+($+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===_.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!_.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==_.type(a)||a.nodeType||_.isWindow(a)?!1:a.constructor&&!X.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?V[W.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=_.trim(a),a&&(1===a.indexOf("use strict")?(b=Z.createElement("script"),b.text=a,Z.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(ba,"ms-").replace(ca,da)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,d){var e,f=0,g=a.length,h=c(a);if(d){if(h)for(;g>f&&(e=b.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=b.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=b.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=b.call(a[f],f,a[f]),e===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(aa,"")},makeArray:function(a,b){var d=b||[];return null!=a&&(c(Object(a))?_.merge(d,"string"==typeof a?[a]:a):T.call(d,a)),d},inArray:function(a,b,c){return null==b?-1:U.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,d){var e,f=0,g=a.length,h=c(a),i=[];if(h)for(;g>f;f++)e=b(a[f],f,d),null!=e&&i.push(e);else for(f in a)e=b(a[f],f,d),null!=e&&i.push(e);return S.apply([],i)},guid:1,proxy:function(a,b){var c,d,e;return"string"==typeof b&&(c=a[b],b=a,a=c),_.isFunction(a)?(d=R.call(arguments,2),e=function(){return a.apply(b||this,d.concat(R.call(arguments)))},e.guid=a.guid=a.guid||_.guid++,e):void 0},now:Date.now,support:Y}),_.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){V["[object "+b+"]"]=b.toLowerCase()});var ea=/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
function(a){function b(a,b,c,d){var e,f,g,h,i,j,l,n,o,p;if((b?b.ownerDocument||b:O)!==G&&F(b),b=b||G,c=c||[],h=b.nodeType,"string"!=typeof a||!a||1!==h&&9!==h&&11!==h)return c;if(!d&&I){if(11!==h&&(e=sa.exec(a)))if(g=e[1]){if(9===h){if(f=b.getElementById(g),!f||!f.parentNode)return c;if(f.id===g)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(g))&&M(b,f)&&f.id===g)return c.push(f),c}else{if(e[2])return $.apply(c,b.getElementsByTagName(a)),c;if((g=e[3])&&v.getElementsByClassName)return $.apply(c,b.getElementsByClassName(g)),c}if(v.qsa&&(!J||!J.test(a))){if(n=l=N,o=b,p=1!==h&&a,1===h&&"object"!==b.nodeName.toLowerCase()){for(j=z(a),(l=b.getAttribute("id"))?n=l.replace(ua,"\\$&"):b.setAttribute("id",n),n="[id='"+n+"'] ",i=j.length;i--;)j[i]=n+m(j[i]);o=ta.test(a)&&k(b.parentNode)||b,p=j.join(",")}if(p)try{return $.apply(c,o.querySelectorAll(p)),c}catch(q){}finally{l||b.removeAttribute("id")}}}return B(a.replace(ia,"$1"),b,c,d)}function c(){function a(c,d){return b.push(c+" ")>w.cacheLength&&delete a[b.shift()],a[c+" "]=d}var b=[];return a}function d(a){return a[N]=!0,a}function e(a){var b=G.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function f(a,b){for(var c=a.split("|"),d=a.length;d--;)w.attrHandle[c[d]]=b}function g(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||V)-(~a.sourceIndex||V);if(d)return d;if(c)for(;c=c.nextSibling;)if(c===b)return-1;return a?1:-1}function h(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function i(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function j(a){return d(function(b){return b=+b,d(function(c,d){for(var e,f=a([],c.length,b),g=f.length;g--;)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function k(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}function l(){}function m(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function n(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=Q++;return b.first?function(b,c,f){for(;b=b[d];)if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[P,f];if(g){for(;b=b[d];)if((1===b.nodeType||e)&&a(b,c,g))return!0}else for(;b=b[d];)if(1===b.nodeType||e){if(i=b[N]||(b[N]={}),(h=i[d])&&h[0]===P&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function o(a){return a.length>1?function(b,c,d){for(var e=a.length;e--;)if(!a[e](b,c,d))return!1;return!0}:a[0]}function p(a,c,d){for(var e=0,f=c.length;f>e;e++)b(a,c[e],d);return d}function q(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function r(a,b,c,e,f,g){return e&&!e[N]&&(e=r(e)),f&&!f[N]&&(f=r(f,g)),d(function(d,g,h,i){var j,k,l,m=[],n=[],o=g.length,r=d||p(b||"*",h.nodeType?[h]:h,[]),s=!a||!d&&b?r:q(r,m,a,h,i),t=c?f||(d?a:o||e)?[]:g:s;if(c&&c(s,t,h,i),e)for(j=q(t,n),e(j,[],h,i),k=j.length;k--;)(l=j[k])&&(t[n[k]]=!(s[n[k]]=l));if(d){if(f||a){if(f){for(j=[],k=t.length;k--;)(l=t[k])&&j.push(s[k]=l);f(null,t=[],j,i)}for(k=t.length;k--;)(l=t[k])&&(j=f?aa(d,l):m[k])>-1&&(d[j]=!(g[j]=l))}}else t=q(t===g?t.splice(o,t.length):t),f?f(null,g,t,i):$.apply(g,t)})}function s(a){for(var b,c,d,e=a.length,f=w.relative[a[0].type],g=f||w.relative[" "],h=f?1:0,i=n(function(a){return a===b},g,!0),j=n(function(a){return aa(b,a)>-1},g,!0),k=[function(a,c,d){var e=!f&&(d||c!==C)||((b=c).nodeType?i(a,c,d):j(a,c,d));return b=null,e}];e>h;h++)if(c=w.relative[a[h].type])k=[n(o(k),c)];else{if(c=w.filter[a[h].type].apply(null,a[h].matches),c[N]){for(d=++h;e>d&&!w.relative[a[d].type];d++);return r(h>1&&o(k),h>1&&m(a.slice(0,h-1).concat({value:" "===a[h-2].type?"*":""})).replace(ia,"$1"),c,d>h&&s(a.slice(h,d)),e>d&&s(a=a.slice(d)),e>d&&m(a))}k.push(c)}return o(k)}function t(a,c){var e=c.length>0,f=a.length>0,g=function(d,g,h,i,j){var k,l,m,n=0,o="0",p=d&&[],r=[],s=C,t=d||f&&w.find.TAG("*",j),u=P+=null==s?1:Math.random()||.1,v=t.length;for(j&&(C=g!==G&&g);o!==v&&null!=(k=t[o]);o++){if(f&&k){for(l=0;m=a[l++];)if(m(k,g,h)){i.push(k);break}j&&(P=u)}e&&((k=!m&&k)&&n--,d&&p.push(k))}if(n+=o,e&&o!==n){for(l=0;m=c[l++];)m(p,r,g,h);if(d){if(n>0)for(;o--;)p[o]||r[o]||(r[o]=Y.call(i));r=q(r)}$.apply(i,r),j&&!d&&r.length>0&&n+c.length>1&&b.uniqueSort(i)}return j&&(P=u,C=s),p};return e?d(g):g}var u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N="sizzle"+1*new Date,O=a.document,P=0,Q=0,R=c(),S=c(),T=c(),U=function(a,b){return a===b&&(E=!0),0},V=1<<31,W={}.hasOwnProperty,X=[],Y=X.pop,Z=X.push,$=X.push,_=X.slice,aa=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},ba="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ca="[\\x20\\t\\r\\n\\f]",da="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ea=da.replace("w","w#"),fa="\\["+ca+"*("+da+")(?:"+ca+"*([*^$|!~]?=)"+ca+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ea+"))|)"+ca+"*\\]",ga=":("+da+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+fa+")*)|.*)\\)|)",ha=new RegExp(ca+"+","g"),ia=new RegExp("^"+ca+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ca+"+$","g"),ja=new RegExp("^"+ca+"*,"+ca+"*"),ka=new RegExp("^"+ca+"*([>+~]|"+ca+")"+ca+"*"),la=new RegExp("="+ca+"*([^\\]'\"]*?)"+ca+"*\\]","g"),ma=new RegExp(ga),na=new RegExp("^"+ea+"$"),oa={ID:new RegExp("^#("+da+")"),CLASS:new RegExp("^\\.("+da+")"),TAG:new RegExp("^("+da.replace("w","w*")+")"),ATTR:new RegExp("^"+fa),PSEUDO:new RegExp("^"+ga),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ca+"*(even|odd|(([+-]|)(\\d*)n|)"+ca+"*(?:([+-]|)"+ca+"*(\\d+)|))"+ca+"*\\)|)","i"),bool:new RegExp("^(?:"+ba+")$","i"),needsContext:new RegExp("^"+ca+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ca+"*((?:-\\d)?\\d*)"+ca+"*\\)|)(?=[^-]|$)","i")},pa=/^(?:input|select|textarea|button)$/i,qa=/^h\d$/i,ra=/^[^{]+\{\s*\[native \w/,sa=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ta=/[+~]/,ua=/'|\\/g,va=new RegExp("\\\\([\\da-f]{1,6}"+ca+"?|("+ca+")|.)","ig"),wa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},xa=function(){F()};try{$.apply(X=_.call(O.childNodes),O.childNodes),X[O.childNodes.length].nodeType}catch(ya){$={apply:X.length?function(a,b){Z.apply(a,_.call(b))}:function(a,b){for(var c=a.length,d=0;a[c++]=b[d++];);a.length=c-1}}}v=b.support={},y=b.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},F=b.setDocument=function(a){var b,c,d=a?a.ownerDocument||a:O;return d!==G&&9===d.nodeType&&d.documentElement?(G=d,H=d.documentElement,c=d.defaultView,c&&c!==c.top&&(c.addEventListener?c.addEventListener("unload",xa,!1):c.attachEvent&&c.attachEvent("onunload",xa)),I=!y(d),v.attributes=e(function(a){return a.className="i",!a.getAttribute("className")}),v.getElementsByTagName=e(function(a){return a.appendChild(d.createComment("")),!a.getElementsByTagName("*").length}),v.getElementsByClassName=ra.test(d.getElementsByClassName),v.getById=e(function(a){return H.appendChild(a).id=N,!d.getElementsByName||!d.getElementsByName(N).length}),v.getById?(w.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&I){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},w.filter.ID=function(a){var b=a.replace(va,wa);return function(a){return a.getAttribute("id")===b}}):(delete w.find.ID,w.filter.ID=function(a){var b=a.replace(va,wa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),w.find.TAG=v.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):v.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){for(;c=f[e++];)1===c.nodeType&&d.push(c);return d}return f},w.find.CLASS=v.getElementsByClassName&&function(a,b){return I?b.getElementsByClassName(a):void 0},K=[],J=[],(v.qsa=ra.test(d.querySelectorAll))&&(e(function(a){H.appendChild(a).innerHTML="<a id='"+N+"'></a><select id='"+N+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&J.push("[*^$]="+ca+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||J.push("\\["+ca+"*(?:value|"+ba+")"),a.querySelectorAll("[id~="+N+"-]").length||J.push("~="),a.querySelectorAll(":checked").length||J.push(":checked"),a.querySelectorAll("a#"+N+"+*").length||J.push(".#.+[+~]")}),e(function(a){var b=d.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&J.push("name"+ca+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||J.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),J.push(",.*:")})),(v.matchesSelector=ra.test(L=H.matches||H.webkitMatchesSelector||H.mozMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&e(function(a){v.disconnectedMatch=L.call(a,"div"),L.call(a,"[s!='']:x"),K.push("!=",ga)}),J=J.length&&new RegExp(J.join("|")),K=K.length&&new RegExp(K.join("|")),b=ra.test(H.compareDocumentPosition),M=b||ra.test(H.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},U=b?function(a,b){if(a===b)return E=!0,0;var c=!a.compareDocumentPosition-!b.compareDocumentPosition;return c?c:(c=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&c||!v.sortDetached&&b.compareDocumentPosition(a)===c?a===d||a.ownerDocument===O&&M(O,a)?-1:b===d||b.ownerDocument===O&&M(O,b)?1:D?aa(D,a)-aa(D,b):0:4&c?-1:1)}:function(a,b){if(a===b)return E=!0,0;var c,e=0,f=a.parentNode,h=b.parentNode,i=[a],j=[b];if(!f||!h)return a===d?-1:b===d?1:f?-1:h?1:D?aa(D,a)-aa(D,b):0;if(f===h)return g(a,b);for(c=a;c=c.parentNode;)i.unshift(c);for(c=b;c=c.parentNode;)j.unshift(c);for(;i[e]===j[e];)e++;return e?g(i[e],j[e]):i[e]===O?-1:j[e]===O?1:0},d):G},b.matches=function(a,c){return b(a,null,null,c)},b.matchesSelector=function(a,c){if((a.ownerDocument||a)!==G&&F(a),c=c.replace(la,"='$1']"),!(!v.matchesSelector||!I||K&&K.test(c)||J&&J.test(c)))try{var d=L.call(a,c);if(d||v.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return b(c,G,null,[a]).length>0},b.contains=function(a,b){return(a.ownerDocument||a)!==G&&F(a),M(a,b)},b.attr=function(a,b){(a.ownerDocument||a)!==G&&F(a);var c=w.attrHandle[b.toLowerCase()],d=c&&W.call(w.attrHandle,b.toLowerCase())?c(a,b,!I):void 0;return void 0!==d?d:v.attributes||!I?a.getAttribute(b):(d=a.getAttributeNode(b))&&d.specified?d.value:null},b.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},b.uniqueSort=function(a){var b,c=[],d=0,e=0;if(E=!v.detectDuplicates,D=!v.sortStable&&a.slice(0),a.sort(U),E){for(;b=a[e++];)b===a[e]&&(d=c.push(e));for(;d--;)a.splice(c[d],1)}return D=null,a},x=b.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(1===e||9===e||11===e){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=x(a)}else if(3===e||4===e)return a.nodeValue}else for(;b=a[d++];)c+=x(b);return c},w=b.selectors={cacheLength:50,createPseudo:d,match:oa,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(va,wa),a[3]=(a[3]||a[4]||a[5]||"").replace(va,wa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||b.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&b.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return oa.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&ma.test(c)&&(b=z(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(va,wa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=R[a+" "];return b||(b=new RegExp("(^|"+ca+")"+a+"("+ca+"|$)"))&&R(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,c,d){return function(e){var f=b.attr(e,a);return null==f?"!="===c:c?(f+="","="===c?f===d:"!="===c?f!==d:"^="===c?d&&0===f.indexOf(d):"*="===c?d&&f.indexOf(d)>-1:"$="===c?d&&f.slice(-d.length)===d:"~="===c?(" "+f.replace(ha," ")+" ").indexOf(d)>-1:"|="===c?f===d||f.slice(0,d.length+1)===d+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){for(;p;){for(l=b;l=l[p];)if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){for(k=q[N]||(q[N]={}),j=k[a]||[],n=j[0]===P&&j[1],m=j[0]===P&&j[2],l=n&&q.childNodes[n];l=++n&&l&&l[p]||(m=n=0)||o.pop();)if(1===l.nodeType&&++m&&l===b){k[a]=[P,n,m];break}}else if(s&&(j=(b[N]||(b[N]={}))[a])&&j[0]===P)m=j[1];else for(;(l=++n&&l&&l[p]||(m=n=0)||o.pop())&&((h?l.nodeName.toLowerCase()!==r:1!==l.nodeType)||!++m||(s&&((l[N]||(l[N]={}))[a]=[P,m]),l!==b)););return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,c){var e,f=w.pseudos[a]||w.setFilters[a.toLowerCase()]||b.error("unsupported pseudo: "+a);return f[N]?f(c):f.length>1?(e=[a,a,"",c],w.setFilters.hasOwnProperty(a.toLowerCase())?d(function(a,b){for(var d,e=f(a,c),g=e.length;g--;)d=aa(a,e[g]),a[d]=!(b[d]=e[g])}):function(a){return f(a,0,e)}):f}},pseudos:{not:d(function(a){var b=[],c=[],e=A(a.replace(ia,"$1"));return e[N]?d(function(a,b,c,d){for(var f,g=e(a,null,d,[]),h=a.length;h--;)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,d,f){return b[0]=a,e(b,null,f,c),b[0]=null,!c.pop()}}),has:d(function(a){return function(c){return b(a,c).length>0}}),contains:d(function(a){return a=a.replace(va,wa),function(b){return(b.textContent||b.innerText||x(b)).indexOf(a)>-1}}),lang:d(function(a){return na.test(a||"")||b.error("unsupported lang: "+a),a=a.replace(va,wa).toLowerCase(),function(b){var c;do if(c=I?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===H},focus:function(a){return a===G.activeElement&&(!G.hasFocus||G.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!w.pseudos.empty(a)},header:function(a){return qa.test(a.nodeName)},input:function(a){return pa.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:j(function(){return[0]}),last:j(function(a,b){return[b-1]}),eq:j(function(a,b,c){return[0>c?c+b:c]}),even:j(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:j(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:j(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:j(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},w.pseudos.nth=w.pseudos.eq;for(u in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[u]=h(u);for(u in{submit:!0,reset:!0})w.pseudos[u]=i(u);return l.prototype=w.filters=w.pseudos,w.setFilters=new l,z=b.tokenize=function(a,c){var d,e,f,g,h,i,j,k=S[a+" "];if(k)return c?0:k.slice(0);for(h=a,i=[],j=w.preFilter;h;){(!d||(e=ja.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),d=!1,(e=ka.exec(h))&&(d=e.shift(),f.push({value:d,type:e[0].replace(ia," ")}),h=h.slice(d.length));for(g in w.filter)!(e=oa[g].exec(h))||j[g]&&!(e=j[g](e))||(d=e.shift(),f.push({value:d,type:g,matches:e}),h=h.slice(d.length));if(!d)break}return c?h.length:h?b.error(a):S(a,i).slice(0)},A=b.compile=function(a,b){var c,d=[],e=[],f=T[a+" "];if(!f){for(b||(b=z(a)),c=b.length;c--;)f=s(b[c]),f[N]?d.push(f):e.push(f);f=T(a,t(e,d)),f.selector=a}return f},B=b.select=function(a,b,c,d){var e,f,g,h,i,j="function"==typeof a&&a,l=!d&&z(a=j.selector||a);if(c=c||[],1===l.length){if(f=l[0]=l[0].slice(0),f.length>2&&"ID"===(g=f[0]).type&&v.getById&&9===b.nodeType&&I&&w.relative[f[1].type]){if(b=(w.find.ID(g.matches[0].replace(va,wa),b)||[])[0],!b)return c;j&&(b=b.parentNode),a=a.slice(f.shift().value.length)}for(e=oa.needsContext.test(a)?0:f.length;e--&&(g=f[e],!w.relative[h=g.type]);)if((i=w.find[h])&&(d=i(g.matches[0].replace(va,wa),ta.test(f[0].type)&&k(b.parentNode)||b))){if(f.splice(e,1),a=d.length&&m(f),!a)return $.apply(c,d),c;break}}return(j||A(a,l))(d,b,!I,c,ta.test(a)&&k(b.parentNode)||b),c},v.sortStable=N.split("").sort(U).join("")===N,v.detectDuplicates=!!E,F(),v.sortDetached=e(function(a){return 1&a.compareDocumentPosition(G.createElement("div"))}),e(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||f("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),v.attributes&&e(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||f("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),e(function(a){return null==a.getAttribute("disabled")})||f(ba,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),b}(a);_.find=ea,_.expr=ea.selectors,_.expr[":"]=_.expr.pseudos,_.unique=ea.uniqueSort,_.text=ea.getText,_.isXMLDoc=ea.isXML,_.contains=ea.contains;var fa=_.expr.match.needsContext,ga=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ha=/^.[^:#\[\.,]*$/;_.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?_.find.matchesSelector(d,a)?[d]:[]:_.find.matches(a,_.grep(b,function(a){return 1===a.nodeType}))},_.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(_(a).filter(function(){for(b=0;c>b;b++)if(_.contains(e[b],this))return!0}));for(b=0;c>b;b++)_.find(a,e[b],d);return d=this.pushStack(c>1?_.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(d(this,a||[],!1))},not:function(a){return this.pushStack(d(this,a||[],!0))},is:function(a){return!!d(this,"string"==typeof a&&fa.test(a)?_(a):a||[],!1).length}});var ia,ja=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ka=_.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:ja.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||ia).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof _?b[0]:b,_.merge(this,_.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:Z,!0)),ga.test(c[1])&&_.isPlainObject(b))for(c in b)_.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=Z.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=Z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):_.isFunction(a)?"undefined"!=typeof ia.ready?ia.ready(a):a(_):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),_.makeArray(a,this))};ka.prototype=_.fn,ia=_(Z);var la=/^(?:parents|prev(?:Until|All))/,ma={children:!0,contents:!0,next:!0,prev:!0};_.extend({dir:function(a,b,c){for(var d=[],e=void 0!==c;(a=a[b])&&9!==a.nodeType;)if(1===a.nodeType){if(e&&_(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),_.fn.extend({has:function(a){var b=_(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(_.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=fa.test(a)||"string"!=typeof a?_(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&_.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?_.unique(f):f)},index:function(a){return a?"string"==typeof a?U.call(_(a),this[0]):U.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(_.unique(_.merge(this.get(),_(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}}),_.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return _.dir(a,"parentNode")},parentsUntil:function(a,b,c){return _.dir(a,"parentNode",c)},next:function(a){return e(a,"nextSibling")},prev:function(a){return e(a,"previousSibling")},nextAll:function(a){return _.dir(a,"nextSibling")},prevAll:function(a){return _.dir(a,"previousSibling")},nextUntil:function(a,b,c){return _.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return _.dir(a,"previousSibling",c)},siblings:function(a){return _.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return _.sibling(a.firstChild)},contents:function(a){return a.contentDocument||_.merge([],a.childNodes)}},function(a,b){_.fn[a]=function(c,d){var e=_.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=_.filter(d,e)),this.length>1&&(ma[a]||_.unique(e),la.test(a)&&e.reverse()),this.pushStack(e)}});var na=/\S+/g,oa={};_.Callbacks=function(a){a="string"==typeof a?oa[a]||f(a):_.extend({},a);var b,c,d,e,g,h,i=[],j=!a.once&&[],k=function(f){for(b=a.memory&&f,c=!0,h=e||0,e=0,g=i.length,d=!0;i&&g>h;h++)if(i[h].apply(f[0],f[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,i&&(j?j.length&&k(j.shift()):b?i=[]:l.disable())},l={add:function(){if(i){var c=i.length;!function f(b){_.each(b,function(b,c){var d=_.type(c);"function"===d?a.unique&&l.has(c)||i.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),d?g=i.length:b&&(e=c,k(b))}return this},remove:function(){return i&&_.each(arguments,function(a,b){for(var c;(c=_.inArray(b,i,c))>-1;)i.splice(c,1),d&&(g>=c&&g--,h>=c&&h--)}),this},has:function(a){return a?_.inArray(a,i)>-1:!(!i||!i.length)},empty:function(){return i=[],g=0,this},disable:function(){return i=j=b=void 0,this},disabled:function(){return!i},lock:function(){return j=void 0,b||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return!i||c&&!j||(b=b||[],b=[a,b.slice?b.slice():b],d?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!c}};return l},_.extend({Deferred:function(a){var b=[["resolve","done",_.Callbacks("once memory"),"resolved"],["reject","fail",_.Callbacks("once memory"),"rejected"],["notify","progress",_.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return _.Deferred(function(c){_.each(b,function(b,f){var g=_.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&_.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?_.extend(a,d):d}},e={};return d.pipe=d.then,_.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b,c,d,e=0,f=R.call(arguments),g=f.length,h=1!==g||a&&_.isFunction(a.promise)?g:0,i=1===h?a:_.Deferred(),j=function(a,c,d){return function(e){c[a]=this,d[a]=arguments.length>1?R.call(arguments):e,d===b?i.notifyWith(c,d):--h||i.resolveWith(c,d)}};if(g>1)for(b=new Array(g),c=new Array(g),d=new Array(g);g>e;e++)f[e]&&_.isFunction(f[e].promise)?f[e].promise().done(j(e,d,f)).fail(i.reject).progress(j(e,c,b)):--h;return h||i.resolveWith(d,f),i.promise()}});var pa;_.fn.ready=function(a){return _.ready.promise().done(a),this},_.extend({isReady:!1,readyWait:1,holdReady:function(a){a?_.readyWait++:_.ready(!0)},ready:function(a){(a===!0?--_.readyWait:_.isReady)||(_.isReady=!0,a!==!0&&--_.readyWait>0||(pa.resolveWith(Z,[_]),_.fn.triggerHandler&&(_(Z).triggerHandler("ready"),_(Z).off("ready"))))}}),_.ready.promise=function(b){return pa||(pa=_.Deferred(),"complete"===Z.readyState?setTimeout(_.ready):(Z.addEventListener("DOMContentLoaded",g,!1),a.addEventListener("load",g,!1))),pa.promise(b)},_.ready.promise();var qa=_.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===_.type(c)){e=!0;for(h in c)_.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,_.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(_(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};_.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType},h.uid=1,h.accepts=_.acceptData,h.prototype={key:function(a){if(!h.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=h.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,_.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(_.isEmptyObject(f))_.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,_.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{_.isArray(b)?d=b.concat(b.map(_.camelCase)):(e=_.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(na)||[])),c=d.length;for(;c--;)delete g[d[c]]}},hasData:function(a){return!_.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var ra=new h,sa=new h,ta=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ua=/([A-Z])/g;_.extend({hasData:function(a){return sa.hasData(a)||ra.hasData(a)},data:function(a,b,c){return sa.access(a,b,c)},removeData:function(a,b){sa.remove(a,b)},_data:function(a,b,c){return ra.access(a,b,c)},_removeData:function(a,b){ra.remove(a,b)}}),_.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=sa.get(f),1===f.nodeType&&!ra.get(f,"hasDataAttrs"))){for(c=g.length;c--;)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=_.camelCase(d.slice(5)),i(f,d,e[d])));ra.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){sa.set(this,a)}):qa(this,function(b){var c,d=_.camelCase(a);if(f&&void 0===b){if(c=sa.get(f,a),void 0!==c)return c;if(c=sa.get(f,d),void 0!==c)return c;if(c=i(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=sa.get(this,d);sa.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&sa.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){sa.remove(this,a)})}}),_.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=ra.get(a,b),c&&(!d||_.isArray(c)?d=ra.access(a,b,_.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=_.queue(a,b),d=c.length,e=c.shift(),f=_._queueHooks(a,b),g=function(){_.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return ra.get(a,c)||ra.access(a,c,{empty:_.Callbacks("once memory").add(function(){ra.remove(a,[b+"queue",c])})})}}),_.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?_.queue(this[0],a):void 0===b?this:this.each(function(){var c=_.queue(this,a,b);_._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&_.dequeue(this,a)})},dequeue:function(a){return this.each(function(){_.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=_.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};for("string"!=typeof a&&(b=a,a=void 0),a=a||"fx";g--;)c=ra.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var va=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,wa=["Top","Right","Bottom","Left"],xa=function(a,b){return a=b||a,"none"===_.css(a,"display")||!_.contains(a.ownerDocument,a)},ya=/^(?:checkbox|radio)$/i;!function(){var a=Z.createDocumentFragment(),b=a.appendChild(Z.createElement("div")),c=Z.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),Y.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",Y.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var za="undefined";Y.focusinBubbles="onfocusin"in a;var Aa=/^key/,Ba=/^(?:mouse|pointer|contextmenu)|click/,Ca=/^(?:focusinfocus|focusoutblur)$/,Da=/^([^.]*)(?:\.(.+)|)$/;_.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=ra.get(a);if(q)for(c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=_.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return typeof _!==za&&_.event.triggered!==b.type?_.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(na)||[""],j=b.length;j--;)h=Da.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=_.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=_.event.special[n]||{},k=_.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&_.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),_.event.global[n]=!0)},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=ra.hasData(a)&&ra.get(a);if(q&&(i=q.events)){for(b=(b||"").match(na)||[""],j=b.length;j--;)if(h=Da.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){for(l=_.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;f--;)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||_.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)_.event.remove(a,n+b[j],c,d,!0);_.isEmptyObject(i)&&(delete q.handle,ra.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,j,k,l,m=[d||Z],n=X.call(b,"type")?b.type:b,o=X.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||Z,3!==d.nodeType&&8!==d.nodeType&&!Ca.test(n+_.event.triggered)&&(n.indexOf(".")>=0&&(o=n.split("."),n=o.shift(),o.sort()),j=n.indexOf(":")<0&&"on"+n,b=b[_.expando]?b:new _.Event(n,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=o.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),
c=null==c?[b]:_.makeArray(c,[b]),l=_.event.special[n]||{},e||!l.trigger||l.trigger.apply(d,c)!==!1)){if(!e&&!l.noBubble&&!_.isWindow(d)){for(i=l.delegateType||n,Ca.test(i+n)||(g=g.parentNode);g;g=g.parentNode)m.push(g),h=g;h===(d.ownerDocument||Z)&&m.push(h.defaultView||h.parentWindow||a)}for(f=0;(g=m[f++])&&!b.isPropagationStopped();)b.type=f>1?i:l.bindType||n,k=(ra.get(g,"events")||{})[b.type]&&ra.get(g,"handle"),k&&k.apply(g,c),k=j&&g[j],k&&k.apply&&_.acceptData(g)&&(b.result=k.apply(g,c),b.result===!1&&b.preventDefault());return b.type=n,e||b.isDefaultPrevented()||l._default&&l._default.apply(m.pop(),c)!==!1||!_.acceptData(d)||j&&_.isFunction(d[n])&&!_.isWindow(d)&&(h=d[j],h&&(d[j]=null),_.event.triggered=n,d[n](),_.event.triggered=void 0,h&&(d[j]=h)),b.result}},dispatch:function(a){a=_.event.fix(a);var b,c,d,e,f,g=[],h=R.call(arguments),i=(ra.get(this,"events")||{})[a.type]||[],j=_.event.special[a.type]||{};if(h[0]=a,a.delegateTarget=this,!j.preDispatch||j.preDispatch.call(this,a)!==!1){for(g=_.event.handlers.call(this,a,i),b=0;(e=g[b++])&&!a.isPropagationStopped();)for(a.currentTarget=e.elem,c=0;(f=e.handlers[c++])&&!a.isImmediatePropagationStopped();)(!a.namespace_re||a.namespace_re.test(f.namespace))&&(a.handleObj=f,a.data=f.data,d=((_.event.special[f.origType]||{}).handle||f.handler).apply(e.elem,h),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()));return j.postDispatch&&j.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?_(e,this).index(i)>=0:_.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||Z,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[_.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];for(g||(this.fixHooks[e]=g=Ba.test(e)?this.mouseHooks:Aa.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new _.Event(f),b=d.length;b--;)c=d[b],a[c]=f[c];return a.target||(a.target=Z),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==l()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===l()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&_.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return _.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=_.extend(new _.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?_.event.trigger(e,null,b):_.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},_.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},_.Event=function(a,b){return this instanceof _.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?j:k):this.type=a,b&&_.extend(this,b),this.timeStamp=a&&a.timeStamp||_.now(),void(this[_.expando]=!0)):new _.Event(a,b)},_.Event.prototype={isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=j,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=j,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=j,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},_.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){_.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!_.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),Y.focusinBubbles||_.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){_.event.simulate(b,a.target,_.event.fix(a),!0)};_.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=ra.access(d,b);e||d.addEventListener(a,c,!0),ra.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=ra.access(d,b)-1;e?ra.access(d,b,e):(d.removeEventListener(a,c,!0),ra.remove(d,b))}}}),_.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=k;else if(!d)return this;return 1===e&&(f=d,d=function(a){return _().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=_.guid++)),this.each(function(){_.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,_(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=k),this.each(function(){_.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){_.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?_.event.trigger(a,b,c,!0):void 0}});var Ea=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Fa=/<([\w:]+)/,Ga=/<|&#?\w+;/,Ha=/<(?:script|style|link)/i,Ia=/checked\s*(?:[^=]|=\s*.checked.)/i,Ja=/^$|\/(?:java|ecma)script/i,Ka=/^true\/(.*)/,La=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};Ma.optgroup=Ma.option,Ma.tbody=Ma.tfoot=Ma.colgroup=Ma.caption=Ma.thead,Ma.th=Ma.td,_.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=_.contains(a.ownerDocument,a);if(!(Y.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||_.isXMLDoc(a)))for(g=r(h),f=r(a),d=0,e=f.length;e>d;d++)s(f[d],g[d]);if(b)if(c)for(f=f||r(a),g=g||r(h),d=0,e=f.length;e>d;d++)q(f[d],g[d]);else q(a,h);return g=r(h,"script"),g.length>0&&p(g,!i&&r(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===_.type(e))_.merge(l,e.nodeType?[e]:e);else if(Ga.test(e)){for(f=f||k.appendChild(b.createElement("div")),g=(Fa.exec(e)||["",""])[1].toLowerCase(),h=Ma[g]||Ma._default,f.innerHTML=h[1]+e.replace(Ea,"<$1></$2>")+h[2],j=h[0];j--;)f=f.lastChild;_.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));for(k.textContent="",m=0;e=l[m++];)if((!d||-1===_.inArray(e,d))&&(i=_.contains(e.ownerDocument,e),f=r(k.appendChild(e),"script"),i&&p(f),c))for(j=0;e=f[j++];)Ja.test(e.type||"")&&c.push(e);return k},cleanData:function(a){for(var b,c,d,e,f=_.event.special,g=0;void 0!==(c=a[g]);g++){if(_.acceptData(c)&&(e=c[ra.expando],e&&(b=ra.cache[e]))){if(b.events)for(d in b.events)f[d]?_.event.remove(c,d):_.removeEvent(c,d,b.handle);ra.cache[e]&&delete ra.cache[e]}delete sa.cache[c[sa.expando]]}}}),_.fn.extend({text:function(a){return qa(this,function(a){return void 0===a?_.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=m(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=m(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?_.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||_.cleanData(r(c)),c.parentNode&&(b&&_.contains(c.ownerDocument,c)&&p(r(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(_.cleanData(r(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return _.clone(this,a,b)})},html:function(a){return qa(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Ha.test(a)&&!Ma[(Fa.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ea,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(_.cleanData(r(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,_.cleanData(r(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=S.apply([],a);var c,d,e,f,g,h,i=0,j=this.length,k=this,l=j-1,m=a[0],p=_.isFunction(m);if(p||j>1&&"string"==typeof m&&!Y.checkClone&&Ia.test(m))return this.each(function(c){var d=k.eq(c);p&&(a[0]=m.call(this,c,d.html())),d.domManip(a,b)});if(j&&(c=_.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(e=_.map(r(c,"script"),n),f=e.length;j>i;i++)g=c,i!==l&&(g=_.clone(g,!0,!0),f&&_.merge(e,r(g,"script"))),b.call(this[i],g,i);if(f)for(h=e[e.length-1].ownerDocument,_.map(e,o),i=0;f>i;i++)g=e[i],Ja.test(g.type||"")&&!ra.access(g,"globalEval")&&_.contains(h,g)&&(g.src?_._evalUrl&&_._evalUrl(g.src):_.globalEval(g.textContent.replace(La,"")))}return this}}),_.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){_.fn[a]=function(a){for(var c,d=[],e=_(a),f=e.length-1,g=0;f>=g;g++)c=g===f?this:this.clone(!0),_(e[g])[b](c),T.apply(d,c.get());return this.pushStack(d)}});var Na,Oa={},Pa=/^margin/,Qa=new RegExp("^("+va+")(?!px)[a-z%]+$","i"),Ra=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};!function(){function b(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",g.innerHTML="",e.appendChild(f);var b=a.getComputedStyle(g,null);c="1%"!==b.top,d="4px"===b.width,e.removeChild(f)}var c,d,e=Z.documentElement,f=Z.createElement("div"),g=Z.createElement("div");g.style&&(g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",Y.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",f.appendChild(g),a.getComputedStyle&&_.extend(Y,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return null==d&&b(),d},reliableMarginRight:function(){var b,c=g.appendChild(Z.createElement("div"));return c.style.cssText=g.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.removeChild(c),b}}))}(),_.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Sa=/^(none|table(?!-c[ea]).+)/,Ta=new RegExp("^("+va+")(.*)$","i"),Ua=new RegExp("^([+-])=("+va+")","i"),Va={position:"absolute",visibility:"hidden",display:"block"},Wa={letterSpacing:"0",fontWeight:"400"},Xa=["Webkit","O","Moz","ms"];_.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=v(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=_.camelCase(b),i=a.style;return b=_.cssProps[h]||(_.cssProps[h]=x(i,h)),g=_.cssHooks[b]||_.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ua.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(_.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||_.cssNumber[h]||(c+="px"),Y.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=_.camelCase(b);return b=_.cssProps[h]||(_.cssProps[h]=x(a.style,h)),g=_.cssHooks[b]||_.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=v(a,b,d)),"normal"===e&&b in Wa&&(e=Wa[b]),""===c||c?(f=parseFloat(e),c===!0||_.isNumeric(f)?f||0:e):e}}),_.each(["height","width"],function(a,b){_.cssHooks[b]={get:function(a,c,d){return c?Sa.test(_.css(a,"display"))&&0===a.offsetWidth?_.swap(a,Va,function(){return A(a,b,d)}):A(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return y(a,c,d?z(a,b,d,"border-box"===_.css(a,"boxSizing",!1,e),e):0)}}}),_.cssHooks.marginRight=w(Y.reliableMarginRight,function(a,b){return b?_.swap(a,{display:"inline-block"},v,[a,"marginRight"]):void 0}),_.each({margin:"",padding:"",border:"Width"},function(a,b){_.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+wa[d]+b]=f[d]||f[d-2]||f[0];return e}},Pa.test(a)||(_.cssHooks[a+b].set=y)}),_.fn.extend({css:function(a,b){return qa(this,function(a,b,c){var d,e,f={},g=0;if(_.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=_.css(a,b[g],!1,d);return f}return void 0!==c?_.style(a,b,c):_.css(a,b)},a,b,arguments.length>1)},show:function(){return B(this,!0)},hide:function(){return B(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){xa(this)?_(this).show():_(this).hide()})}}),_.Tween=C,C.prototype={constructor:C,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(_.cssNumber[c]?"":"px")},cur:function(){var a=C.propHooks[this.prop];return a&&a.get?a.get(this):C.propHooks._default.get(this)},run:function(a){var b,c=C.propHooks[this.prop];return this.options.duration?this.pos=b=_.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):C.propHooks._default.set(this),this}},C.prototype.init.prototype=C.prototype,C.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=_.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){_.fx.step[a.prop]?_.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[_.cssProps[a.prop]]||_.cssHooks[a.prop])?_.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},C.propHooks.scrollTop=C.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},_.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},_.fx=C.prototype.init,_.fx.step={};var Ya,Za,$a=/^(?:toggle|show|hide)$/,_a=new RegExp("^(?:([+-])=|)("+va+")([a-z%]*)$","i"),ab=/queueHooks$/,bb=[G],cb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=_a.exec(b),f=e&&e[3]||(_.cssNumber[a]?"":"px"),g=(_.cssNumber[a]||"px"!==f&&+d)&&_a.exec(_.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,_.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};_.Animation=_.extend(I,{tweener:function(a,b){_.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],cb[c]=cb[c]||[],cb[c].unshift(b)},prefilter:function(a,b){b?bb.unshift(a):bb.push(a)}}),_.speed=function(a,b,c){var d=a&&"object"==typeof a?_.extend({},a):{complete:c||!c&&b||_.isFunction(a)&&a,duration:a,easing:c&&b||b&&!_.isFunction(b)&&b};return d.duration=_.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in _.fx.speeds?_.fx.speeds[d.duration]:_.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){_.isFunction(d.old)&&d.old.call(this),d.queue&&_.dequeue(this,d.queue)},d},_.fn.extend({fadeTo:function(a,b,c,d){return this.filter(xa).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=_.isEmptyObject(a),f=_.speed(b,c,d),g=function(){var b=I(this,_.extend({},a),f);(e||ra.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=_.timers,g=ra.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&_.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=ra.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=_.timers,g=d?d.length:0;for(c.finish=!0,_.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),_.each(["toggle","show","hide"],function(a,b){var c=_.fn[b];_.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(E(b,!0),a,d,e)}}),_.each({slideDown:E("show"),slideUp:E("hide"),slideToggle:E("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){_.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),_.timers=[],_.fx.tick=function(){var a,b=0,c=_.timers;for(Ya=_.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||_.fx.stop(),Ya=void 0},_.fx.timer=function(a){_.timers.push(a),a()?_.fx.start():_.timers.pop()},_.fx.interval=13,_.fx.start=function(){Za||(Za=setInterval(_.fx.tick,_.fx.interval))},_.fx.stop=function(){clearInterval(Za),Za=null},_.fx.speeds={slow:600,fast:200,_default:400},_.fn.delay=function(a,b){return a=_.fx?_.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=Z.createElement("input"),b=Z.createElement("select"),c=b.appendChild(Z.createElement("option"));a.type="checkbox",Y.checkOn=""!==a.value,Y.optSelected=c.selected,b.disabled=!0,Y.optDisabled=!c.disabled,a=Z.createElement("input"),a.value="t",a.type="radio",Y.radioValue="t"===a.value}();var db,eb,fb=_.expr.attrHandle;_.fn.extend({attr:function(a,b){return qa(this,_.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){_.removeAttr(this,a)})}}),_.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===za?_.prop(a,b,c):(1===f&&_.isXMLDoc(a)||(b=b.toLowerCase(),d=_.attrHooks[b]||(_.expr.match.bool.test(b)?eb:db)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=_.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void _.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(na);if(f&&1===a.nodeType)for(;c=f[e++];)d=_.propFix[c]||c,_.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!Y.radioValue&&"radio"===b&&_.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),eb={set:function(a,b,c){return b===!1?_.removeAttr(a,c):a.setAttribute(c,c),c}},_.each(_.expr.match.bool.source.match(/\w+/g),function(a,b){var c=fb[b]||_.find.attr;fb[b]=function(a,b,d){var e,f;return d||(f=fb[b],fb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,fb[b]=f),e}});var gb=/^(?:input|select|textarea|button)$/i;_.fn.extend({prop:function(a,b){return qa(this,_.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[_.propFix[a]||a]})}}),_.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!_.isXMLDoc(a),f&&(b=_.propFix[b]||b,e=_.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||gb.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),Y.optSelected||(_.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),_.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){_.propFix[this.toLowerCase()]=this});var hb=/[\t\r\n\f]/g;_.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(_.isFunction(a))return this.each(function(b){_(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(na)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(hb," "):" ")){for(f=0;e=b[f++];)d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=_.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(_.isFunction(a))return this.each(function(b){_(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(na)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(hb," "):"")){for(f=0;e=b[f++];)for(;d.indexOf(" "+e+" ")>=0;)d=d.replace(" "+e+" "," ");g=a?_.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(_.isFunction(a)?function(c){_(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c)for(var b,d=0,e=_(this),f=a.match(na)||[];b=f[d++];)e.hasClass(b)?e.removeClass(b):e.addClass(b);else(c===za||"boolean"===c)&&(this.className&&ra.set(this,"__className__",this.className),this.className=this.className||a===!1?"":ra.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(hb," ").indexOf(b)>=0)return!0;return!1}});var ib=/\r/g;_.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=_.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,_(this).val()):a,null==e?e="":"number"==typeof e?e+="":_.isArray(e)&&(e=_.map(e,function(a){return null==a?"":a+""})),b=_.valHooks[this.type]||_.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=_.valHooks[e.type]||_.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ib,""):null==c?"":c)}}}),_.extend({valHooks:{option:{get:function(a){var b=_.find.attr(a,"value");return null!=b?b:_.trim(_.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(Y.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&_.nodeName(c.parentNode,"optgroup"))){if(b=_(c).val(),f)return b;g.push(b)}return g},set:function(a,b){for(var c,d,e=a.options,f=_.makeArray(b),g=e.length;g--;)d=e[g],(d.selected=_.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),_.each(["radio","checkbox"],function(){_.valHooks[this]={set:function(a,b){return _.isArray(b)?a.checked=_.inArray(_(a).val(),b)>=0:void 0}},Y.checkOn||(_.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),_.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){_.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),_.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var jb=_.now(),kb=/\?/;_.parseJSON=function(a){return JSON.parse(a+"")},_.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&_.error("Invalid XML: "+a),b};var lb=/#.*$/,mb=/([?&])_=[^&]*/,nb=/^(.*?):[ \t]*([^\r\n]*)$/gm,ob=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,pb=/^(?:GET|HEAD)$/,qb=/^\/\//,rb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,sb={},tb={},ub="*/".concat("*"),vb=a.location.href,wb=rb.exec(vb.toLowerCase())||[];_.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:vb,type:"GET",isLocal:ob.test(wb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":_.parseJSON,"text xml":_.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?L(L(a,_.ajaxSettings),b):L(_.ajaxSettings,a)},ajaxPrefilter:J(sb),ajaxTransport:J(tb),ajax:function(a,b){function c(a,b,c,g){var i,k,r,s,u,w=b;2!==t&&(t=2,h&&clearTimeout(h),d=void 0,f=g||"",v.readyState=a>0?4:0,i=a>=200&&300>a||304===a,c&&(s=M(l,v,c)),s=N(l,s,v,i),i?(l.ifModified&&(u=v.getResponseHeader("Last-Modified"),u&&(_.lastModified[e]=u),u=v.getResponseHeader("etag"),u&&(_.etag[e]=u)),204===a||"HEAD"===l.type?w="nocontent":304===a?w="notmodified":(w=s.state,k=s.data,r=s.error,i=!r)):(r=w,(a||!w)&&(w="error",0>a&&(a=0))),v.status=a,v.statusText=(b||w)+"",i?o.resolveWith(m,[k,w,v]):o.rejectWith(m,[v,w,r]),v.statusCode(q),q=void 0,j&&n.trigger(i?"ajaxSuccess":"ajaxError",[v,l,i?k:r]),p.fireWith(m,[v,w]),j&&(n.trigger("ajaxComplete",[v,l]),--_.active||_.event.trigger("ajaxStop")))}"object"==typeof a&&(b=a,a=void 0),b=b||{};var d,e,f,g,h,i,j,k,l=_.ajaxSetup({},b),m=l.context||l,n=l.context&&(m.nodeType||m.jquery)?_(m):_.event,o=_.Deferred(),p=_.Callbacks("once memory"),q=l.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!g)for(g={};b=nb.exec(f);)g[b[1].toLowerCase()]=b[2];b=g[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return d&&d.abort(b),c(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,l.url=((a||l.url||vb)+"").replace(lb,"").replace(qb,wb[1]+"//"),l.type=b.method||b.type||l.method||l.type,l.dataTypes=_.trim(l.dataType||"*").toLowerCase().match(na)||[""],null==l.crossDomain&&(i=rb.exec(l.url.toLowerCase()),l.crossDomain=!(!i||i[1]===wb[1]&&i[2]===wb[2]&&(i[3]||("http:"===i[1]?"80":"443"))===(wb[3]||("http:"===wb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=_.param(l.data,l.traditional)),K(sb,l,b,v),2===t)return v;j=_.event&&l.global,j&&0===_.active++&&_.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!pb.test(l.type),e=l.url,l.hasContent||(l.data&&(e=l.url+=(kb.test(e)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=mb.test(e)?e.replace(mb,"$1_="+jb++):e+(kb.test(e)?"&":"?")+"_="+jb++)),l.ifModified&&(_.lastModified[e]&&v.setRequestHeader("If-Modified-Since",_.lastModified[e]),_.etag[e]&&v.setRequestHeader("If-None-Match",_.etag[e])),(l.data&&l.hasContent&&l.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",l.contentType),v.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+ub+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)v.setRequestHeader(k,l.headers[k]);if(l.beforeSend&&(l.beforeSend.call(m,v,l)===!1||2===t))return v.abort();u="abort";for(k in{success:1,error:1,complete:1})v[k](l[k]);if(d=K(tb,l,b,v)){v.readyState=1,j&&n.trigger("ajaxSend",[v,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){v.abort("timeout")},l.timeout));try{t=1,d.send(r,c)}catch(w){if(!(2>t))throw w;c(-1,w)}}else c(-1,"No Transport");return v},getJSON:function(a,b,c){return _.get(a,b,c,"json")},getScript:function(a,b){return _.get(a,void 0,b,"script")}}),_.each(["get","post"],function(a,b){_[b]=function(a,c,d,e){return _.isFunction(c)&&(e=e||d,d=c,c=void 0),_.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),_._evalUrl=function(a){return _.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},_.fn.extend({wrapAll:function(a){var b;return _.isFunction(a)?this.each(function(b){_(this).wrapAll(a.call(this,b))}):(this[0]&&(b=_(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){for(var a=this;a.firstElementChild;)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(_.isFunction(a)?function(b){_(this).wrapInner(a.call(this,b))}:function(){var b=_(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=_.isFunction(a);return this.each(function(c){_(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){_.nodeName(this,"body")||_(this).replaceWith(this.childNodes)}).end()}}),_.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},_.expr.filters.visible=function(a){return!_.expr.filters.hidden(a)};var xb=/%20/g,yb=/\[\]$/,zb=/\r?\n/g,Ab=/^(?:submit|button|image|reset|file)$/i,Bb=/^(?:input|select|textarea|keygen)/i;_.param=function(a,b){var c,d=[],e=function(a,b){b=_.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b);

};if(void 0===b&&(b=_.ajaxSettings&&_.ajaxSettings.traditional),_.isArray(a)||a.jquery&&!_.isPlainObject(a))_.each(a,function(){e(this.name,this.value)});else for(c in a)O(c,a[c],b,e);return d.join("&").replace(xb,"+")},_.fn.extend({serialize:function(){return _.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=_.prop(this,"elements");return a?_.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!_(this).is(":disabled")&&Bb.test(this.nodeName)&&!Ab.test(a)&&(this.checked||!ya.test(a))}).map(function(a,b){var c=_(this).val();return null==c?null:_.isArray(c)?_.map(c,function(a){return{name:b.name,value:a.replace(zb,"\r\n")}}):{name:b.name,value:c.replace(zb,"\r\n")}}).get()}}),_.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cb=0,Db={},Eb={0:200,1223:204},Fb=_.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Db)Db[a]()}),Y.cors=!!Fb&&"withCredentials"in Fb,Y.ajax=Fb=!!Fb,_.ajaxTransport(function(a){var b;return Y.cors||Fb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Db[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Eb[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Db[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),_.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return _.globalEval(a),a}}}),_.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),_.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=_("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),Z.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gb=[],Hb=/(=)\?(?=&|$)|\?\?/;_.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gb.pop()||_.expando+"_"+jb++;return this[a]=!0,a}}),_.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=_.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hb,"$1"+e):b.jsonp!==!1&&(b.url+=(kb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||_.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gb.push(e)),g&&_.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),_.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||Z;var d=ga.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=_.buildFragment([a],b,e),e&&e.length&&_(e).remove(),_.merge([],d.childNodes))};var Ib=_.fn.load;_.fn.load=function(a,b,c){if("string"!=typeof a&&Ib)return Ib.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=_.trim(a.slice(h)),a=a.slice(0,h)),_.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&_.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?_("<div>").append(_.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},_.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){_.fn[b]=function(a){return this.on(b,a)}}),_.expr.filters.animated=function(a){return _.grep(_.timers,function(b){return a===b.elem}).length};var Jb=a.document.documentElement;_.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=_.css(a,"position"),l=_(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=_.css(a,"top"),i=_.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),_.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},_.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){_.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,_.contains(b,d)?(typeof d.getBoundingClientRect!==za&&(e=d.getBoundingClientRect()),c=P(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===_.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),_.nodeName(a[0],"html")||(d=a.offset()),d.top+=_.css(a[0],"borderTopWidth",!0),d.left+=_.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-_.css(c,"marginTop",!0),left:b.left-d.left-_.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||Jb;a&&!_.nodeName(a,"html")&&"static"===_.css(a,"position");)a=a.offsetParent;return a||Jb})}}),_.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;_.fn[b]=function(e){return qa(this,function(b,e,f){var g=P(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),_.each(["top","left"],function(a,b){_.cssHooks[b]=w(Y.pixelPosition,function(a,c){return c?(c=v(a,b),Qa.test(c)?_(a).position()[b]+"px":c):void 0})}),_.each({Height:"height",Width:"width"},function(a,b){_.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){_.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return qa(this,function(b,c,d){var e;return _.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?_.css(b,c,g):_.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),_.fn.size=function(){return this.length},_.fn.andSelf=_.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return _});var Kb=a.jQuery,Lb=a.$;return _.noConflict=function(b){return a.$===_&&(a.$=Lb),b&&a.jQuery===_&&(a.jQuery=Kb),_},typeof b===za&&(a.jQuery=a.$=_),_});
!function(a,b,c,d){"use strict";function e(a){return("string"==typeof a||a instanceof String)&&(a=a.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"")),a}var f=function(b){for(var c=b.length,d=a("head");c--;)0===d.has("."+b[c]).length&&d.append('<meta class="'+b[c]+'" />')};f(["foundation-mq-small","foundation-mq-small-only","foundation-mq-medium","foundation-mq-medium-only","foundation-mq-large","foundation-mq-large-only","foundation-mq-xlarge","foundation-mq-xlarge-only","foundation-mq-xxlarge","foundation-data-attribute-namespace"]),a(function(){"undefined"!=typeof FastClick&&"undefined"!=typeof c.body&&FastClick.attach(c.body)});var g=function(b,d){if("string"==typeof b){if(d){var e;if(d.jquery){if(e=d[0],!e)return d}else e=d;return a(e.querySelectorAll(b))}return a(c.querySelectorAll(b))}return a(b,d)},h=function(a){var b=[];return a||b.push("data"),this.namespace.length>0&&b.push(this.namespace),b.push(this.name),b.join("-")},i=function(a){for(var b=a.split("-"),c=b.length,d=[];c--;)0!==c?d.push(b[c]):this.namespace.length>0?d.push(this.namespace,b[c]):d.push(b[c]);return d.reverse().join("-")},j=function(b,c){var d=this,e=function(){var e=g(this),f=!e.data(d.attr_name(!0)+"-init");e.data(d.attr_name(!0)+"-init",a.extend({},d.settings,c||b,d.data_options(e))),f&&d.events(this)};return g(this.scope).is("["+this.attr_name()+"]")?e.call(this.scope):g("["+this.attr_name()+"]",this.scope).each(e),"string"==typeof b?this[b].call(this,c):void 0},k=function(a,b){function c(){b(a[0])}function d(){if(this.one("load",c),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var a=this.attr("src"),b=a.match(/\?/)?"&":"?";b+="random="+(new Date).getTime(),this.attr("src",a+b)}}return a.attr("src")?void(a[0].complete||4===a[0].readyState?c():d.call(a)):void c()};/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
b.matchMedia||(b.matchMedia=function(){var a=b.styleMedia||b.media;if(!a){var d=c.createElement("style"),e=c.getElementsByTagName("script")[0],f=null;d.type="text/css",d.id="matchmediajs-test",e.parentNode.insertBefore(d,e),f="getComputedStyle"in b&&b.getComputedStyle(d,null)||d.currentStyle,a={matchMedium:function(a){var b="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return d.styleSheet?d.styleSheet.cssText=b:d.textContent=b,"1px"===f.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a){function c(){d&&(g(c),i&&a.fx.tick())}for(var d,e=0,f=["webkit","moz"],g=b.requestAnimationFrame,h=b.cancelAnimationFrame,i="undefined"!=typeof a.fx;e<f.length&&!g;e++)g=b[f[e]+"RequestAnimationFrame"],h=h||b[f[e]+"CancelAnimationFrame"]||b[f[e]+"CancelRequestAnimationFrame"];g?(b.requestAnimationFrame=g,b.cancelAnimationFrame=h,i&&(a.fx.timer=function(b){b()&&a.timers.push(b)&&!d&&(d=!0,c())},a.fx.stop=function(){d=!1})):(b.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-e)),f=b.setTimeout(function(){a(c+d)},d);return e=c+d,f},b.cancelAnimationFrame=function(a){clearTimeout(a)})}(a),b.Foundation={name:"Foundation",version:"5.5.2",media_queries:{small:g(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"small-only":g(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:g(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"medium-only":g(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:g(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"large-only":g(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:g(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"xlarge-only":g(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:g(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:a("<style></style>").appendTo("head")[0].sheet,global:{namespace:d},init:function(a,c,d,e,f){var h=[a,d,e,f],i=[];if(this.rtl=/rtl/i.test(g("html").attr("dir")),this.scope=a||this.scope,this.set_namespace(),c&&"string"==typeof c&&!/reflow/i.test(c))this.libs.hasOwnProperty(c)&&i.push(this.init_lib(c,h));else for(var j in this.libs)i.push(this.init_lib(j,c));return g(b).load(function(){g(b).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")}),a},init_lib:function(b,c){return this.libs.hasOwnProperty(b)?(this.patch(this.libs[b]),c&&c.hasOwnProperty(b)?("undefined"!=typeof this.libs[b].settings?a.extend(!0,this.libs[b].settings,c[b]):"undefined"!=typeof this.libs[b].defaults&&a.extend(!0,this.libs[b].defaults,c[b]),this.libs[b].init.apply(this.libs[b],[this.scope,c[b]])):(c=c instanceof Array?c:new Array(c),this.libs[b].init.apply(this.libs[b],c))):function(){}},patch:function(a){a.scope=this.scope,a.namespace=this.global.namespace,a.rtl=this.rtl,a.data_options=this.utils.data_options,a.attr_name=h,a.add_namespace=i,a.bindings=j,a.S=this.utils.S},inherit:function(a,b){for(var c=b.split(" "),d=c.length;d--;)this.utils.hasOwnProperty(c[d])&&(a[c[d]]=this.utils[c[d]])},set_namespace:function(){var b=this.global.namespace===d?a(".foundation-data-attribute-namespace").css("font-family"):this.global.namespace;this.global.namespace=b===d||/false/i.test(b)?"":b},libs:{},utils:{S:g,throttle:function(a,b){var c=null;return function(){var d=this,e=arguments;null==c&&(c=setTimeout(function(){a.apply(d,e),c=null},b))}},debounce:function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},data_options:function(b,c){function d(a){return!isNaN(a-0)&&null!==a&&""!==a&&a!==!1&&a!==!0}function e(b){return"string"==typeof b?a.trim(b):b}c=c||"options";var f,g,h,i={},j=function(a){var b=Foundation.global.namespace;return a.data(b.length>0?b+"-"+c:c)},k=j(b);if("object"==typeof k)return k;for(h=(k||":").split(";"),f=h.length;f--;)g=h[f].split(":"),g=[g[0],g.slice(1).join(":")],/true/i.test(g[1])&&(g[1]=!0),/false/i.test(g[1])&&(g[1]=!1),d(g[1])&&(-1===g[1].indexOf(".")?g[1]=parseInt(g[1],10):g[1]=parseFloat(g[1])),2===g.length&&g[0].length>0&&(i[e(g[0])]=e(g[1]));return i},register_media:function(b,c){Foundation.media_queries[b]===d&&(a("head").append('<meta class="'+c+'"/>'),Foundation.media_queries[b]=e(a("."+c).css("font-family")))},add_custom_rule:function(a,b){if(b===d&&Foundation.stylesheet)Foundation.stylesheet.insertRule(a,Foundation.stylesheet.cssRules.length);else{var c=Foundation.media_queries[b];c!==d&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[b]+"{ "+a+" }",Foundation.stylesheet.cssRules.length)}},image_loaded:function(a,b){function c(a){for(var b=a.length,c=b-1;c>=0;c--)if(a.attr("height")===d)return!1;return!0}var e=this,f=a.length;(0===f||c(a))&&b(a),a.each(function(){k(e.S(this),function(){f-=1,0===f&&b(a)})})},random_str:function(){return this.fidx||(this.fidx=0),this.prefix=this.prefix||[this.name||"F",(+new Date).toString(36)].join("-"),this.prefix+(this.fidx++).toString(36)},match:function(a){return b.matchMedia(a).matches},is_small_up:function(){return this.match(Foundation.media_queries.small)},is_medium_up:function(){return this.match(Foundation.media_queries.medium)},is_large_up:function(){return this.match(Foundation.media_queries.large)},is_xlarge_up:function(){return this.match(Foundation.media_queries.xlarge)},is_xxlarge_up:function(){return this.match(Foundation.media_queries.xxlarge)},is_small_only:function(){return!(this.is_medium_up()||this.is_large_up()||this.is_xlarge_up()||this.is_xxlarge_up())},is_medium_only:function(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_large_only:function(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xxlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up()}}},a.fn.foundation=function(){var a=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(a)),this})}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.abide={name:"abide",version:"5.5.2",settings:{live_validate:!0,validate_on_blur:!0,focus_on_invalid:!0,error_labels:!0,error_class:"error",timeout:1e3,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,url:/^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function(a,b,d){var e=c.getElementById(a.getAttribute(this.add_namespace("data-equalto"))).value,f=a.value,g=e===f;return g}}},timer:null,init:function(a,b,c){this.bindings(b,c)},events:function(b){function c(a,b){clearTimeout(d.timer),d.timer=setTimeout(function(){d.validate([a],b)}.bind(a),f.timeout)}var d=this,e=d.S(b).attr("novalidate","novalidate"),f=e.data(this.attr_name(!0)+"-init")||{};this.invalid_attr=this.add_namespace("data-invalid"),e.off(".abide").on("submit.fndtn.abide",function(a){var b=/ajax/i.test(d.S(this).attr(d.attr_name()));return d.validate(d.S(this).find("input, textarea, select").not(":hidden, [data-abide-ignore]").get(),a,b)}).on("validate.fndtn.abide",function(a){"manual"===f.validate_on&&d.validate([a.target],a)}).on("reset",function(b){return d.reset(a(this),b)}).find("input, textarea, select").not(":hidden, [data-abide-ignore]").off(".abide").on("blur.fndtn.abide change.fndtn.abide",function(a){f.validate_on_blur&&f.validate_on_blur===!0&&c(this,a),"change"===f.validate_on&&c(this,a)}).on("keydown.fndtn.abide",function(a){f.live_validate&&f.live_validate===!0&&9!=a.which&&c(this,a),"tab"===f.validate_on&&9===a.which?c(this,a):"change"===f.validate_on&&c(this,a)}).on("focus",function(b){navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)&&a("html, body").animate({scrollTop:a(b.target).offset().top},100)})},reset:function(b,c){var d=this;b.removeAttr(d.invalid_attr),a("["+d.invalid_attr+"]",b).removeAttr(d.invalid_attr),a("."+d.settings.error_class,b).not("small").removeClass(d.settings.error_class),a(":input",b).not(":button, :submit, :reset, :hidden, [data-abide-ignore]").val("").removeAttr(d.invalid_attr)},validate:function(a,b,c){for(var d=this.parse_patterns(a),e=d.length,f=this.S(a[0]).closest("form"),g=/submit/.test(b.type),h=0;e>h;h++)if(!d[h]&&(g||c))return this.settings.focus_on_invalid&&a[h].focus(),f.trigger("invalid.fndtn.abide"),this.S(a[h]).closest("form").attr(this.invalid_attr,""),!1;return(g||c)&&f.trigger("valid.fndtn.abide"),f.removeAttr(this.invalid_attr),c?!1:!0},parse_patterns:function(a){for(var b=a.length,c=[];b--;)c.push(this.pattern(a[b]));return this.check_validation_and_apply_styles(c)},pattern:function(a){var b=a.getAttribute("type"),c="string"==typeof a.getAttribute("required"),d=a.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(d)&&d.length>0?[a,this.settings.patterns[d],c]:d.length>0?[a,new RegExp(d),c]:this.settings.patterns.hasOwnProperty(b)?[a,this.settings.patterns[b],c]:(d=/.*/,[a,d,c])},check_validation_and_apply_styles:function(b){var c=b.length,d=[],e=this.S(b[0][0]).closest("[data-"+this.attr_name(!0)+"]");for(e.data(this.attr_name(!0)+"-init")||{};c--;){var f,g,h=b[c][0],i=b[c][2],j=h.value.trim(),k=this.S(h).parent(),l=h.getAttribute(this.add_namespace("data-abide-validator")),m="radio"===h.type,n="checkbox"===h.type,o=this.S('label[for="'+h.getAttribute("id")+'"]'),p=i?h.value.length>0:!0,q=[];if(h.getAttribute(this.add_namespace("data-equalto"))&&(l="equalTo"),f=k.is("label")?k.parent():k,m&&i)q.push(this.valid_radio(h,i));else if(n&&i)q.push(this.valid_checkbox(h,i));else if(l){for(var r=l.split(" "),s=!0,t=!0,u=0;u<r.length;u++)g=this.settings.validators[r[u]].apply(this,[h,i,f]),q.push(g),t=g&&s,s=g;t?(this.S(h).removeAttr(this.invalid_attr),f.removeClass("error"),o.length>0&&this.settings.error_labels&&o.removeClass(this.settings.error_class).removeAttr("role"),a(h).triggerHandler("valid")):(this.S(h).attr(this.invalid_attr,""),f.addClass("error"),o.length>0&&this.settings.error_labels&&o.addClass(this.settings.error_class).attr("role","alert"),a(h).triggerHandler("invalid"))}else if(q.push(b[c][1].test(j)&&p||!i&&h.value.length<1||a(h).attr("disabled")?!0:!1),q=[q.every(function(a){return a})],q[0])this.S(h).removeAttr(this.invalid_attr),h.setAttribute("aria-invalid","false"),h.removeAttribute("aria-describedby"),f.removeClass(this.settings.error_class),o.length>0&&this.settings.error_labels&&o.removeClass(this.settings.error_class).removeAttr("role"),a(h).triggerHandler("valid");else{this.S(h).attr(this.invalid_attr,""),h.setAttribute("aria-invalid","true");var v=f.find("small."+this.settings.error_class,"span."+this.settings.error_class),w=v.length>0?v[0].id:"";w.length>0&&h.setAttribute("aria-describedby",w),f.addClass(this.settings.error_class),o.length>0&&this.settings.error_labels&&o.addClass(this.settings.error_class).attr("role","alert"),a(h).triggerHandler("invalid")}d=d.concat(q)}return d},valid_checkbox:function(b,c){var b=this.S(b),d=b.is(":checked")||!c||b.get(0).getAttribute("disabled");return d?(b.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),a(b).triggerHandler("valid")):(b.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),a(b).triggerHandler("invalid")),d},valid_radio:function(b,c){for(var d=b.getAttribute("name"),e=this.S(b).closest("[data-"+this.attr_name(!0)+"]").find("[name='"+d+"']"),f=e.length,g=!1,h=!1,i=0;f>i;i++)e[i].getAttribute("disabled")?(h=!0,g=!0):e[i].checked?g=!0:h&&(g=!1);for(var i=0;f>i;i++)g?(this.S(e[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class),a(e[i]).triggerHandler("valid")):(this.S(e[i]).attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),a(e[i]).triggerHandler("invalid"));return g},valid_equal:function(a,b,d){var e=c.getElementById(a.getAttribute(this.add_namespace("data-equalto"))).value,f=a.value,g=e===f;return g?(this.S(a).removeAttr(this.invalid_attr),d.removeClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.removeClass(this.settings.error_class)):(this.S(a).attr(this.invalid_attr,""),d.addClass(this.settings.error_class),label.length>0&&settings.error_labels&&label.addClass(this.settings.error_class)),g},valid_oneof:function(a,b,c,d){var a=this.S(a),e=this.S("["+this.add_namespace("data-oneof")+"]"),f=e.filter(":checked").length>0;if(f?a.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class):a.attr(this.invalid_attr,"").parent().addClass(this.settings.error_class),!d){var g=this;e.each(function(){g.valid_oneof.call(g,this,null,null,!0)})}return f},reflow:function(a,b){var c=this,d=c.S("["+this.attr_name()+"]").attr("novalidate","novalidate");c.S(d).each(function(a,b){c.events(b)})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.5.2",settings:{content_class:"content",active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(a,b,c){this.bindings(b,c)},events:function(b){var c=this,d=this.S;c.create(this.S(b)),d(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a, ["+this.attr_name()+"] > li > a",function(b){var e=d(this).closest("["+c.attr_name()+"]"),f=c.attr_name()+"="+e.attr(c.attr_name()),g=e.data(c.attr_name(!0)+"-init")||c.settings,h=d("#"+this.href.split("#")[1]),i=a("> dd, > li",e),j=i.children("."+g.content_class),k=j.filter("."+g.active_class);return b.preventDefault(),e.attr(c.attr_name())&&(j=j.add("["+f+"] dd > ."+g.content_class+", ["+f+"] li > ."+g.content_class),i=i.add("["+f+"] dd, ["+f+"] li")),g.toggleable&&h.is(k)?(h.parent("dd, li").toggleClass(g.active_class,!1),h.toggleClass(g.active_class,!1),d(this).attr("aria-expanded",function(a,b){return"true"===b?"false":"true"}),g.callback(h),h.triggerHandler("toggled",[e]),void e.triggerHandler("toggled",[h])):(g.multi_expand||(j.removeClass(g.active_class),i.removeClass(g.active_class),i.children("a").attr("aria-expanded","false")),h.addClass(g.active_class).parent().addClass(g.active_class),g.callback(h),h.triggerHandler("toggled",[e]),e.triggerHandler("toggled",[h]),void d(this).attr("aria-expanded","true"))})},create:function(b){var c=this,d=b,e=a("> .accordion-navigation",d),f=d.data(c.attr_name(!0)+"-init")||c.settings;e.children("a").attr("aria-expanded","false"),e.has("."+f.content_class+"."+f.active_class).children("a").attr("aria-expanded","true"),f.multi_expand&&b.attr("aria-multiselectable","true")},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.alert={name:"alert",version:"5.5.2",settings:{callback:function(){}},init:function(a,b,c){this.bindings(b,c)},events:function(){var b=this,c=this.S;a(this.scope).off(".alert").on("click.fndtn.alert","["+this.attr_name()+"] .close",function(a){var d=c(this).closest("["+b.attr_name()+"]"),e=d.data(b.attr_name(!0)+"-init")||b.settings;a.preventDefault(),Modernizr.csstransitions?(d.addClass("alert-close"),d.on("transitionend webkitTransitionEnd oTransitionEnd",function(a){c(this).trigger("close.fndtn.alert").remove(),e.callback()})):d.fadeOut(300,function(){c(this).trigger("close.fndtn.alert").remove(),e.callback()})})},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.5.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div><img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" /><img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'},close_selectors:".clearing-close, div.clearing-blackout",open_selectors:"",skip_selector:"",touch_label:"",init:!1,locked:!1},init:function(a,b,c){var d=this;Foundation.inherit(this,"throttle image_loaded"),this.bindings(b,c),d.S(this.scope).is("["+this.attr_name()+"]")?this.assemble(d.S("li",this.scope)):d.S("["+this.attr_name()+"]",this.scope).each(function(){d.assemble(d.S("li",this))})},events:function(d){var e=this,f=e.S,g=a(".scroll-container");g.length>0&&(this.scope=g),f(this.scope).off(".clearing").on("click.fndtn.clearing","ul["+this.attr_name()+"] li "+this.settings.open_selectors,function(a,b,c){var b=b||f(this),c=c||b,d=b.next("li"),g=b.closest("["+e.attr_name()+"]").data(e.attr_name(!0)+"-init"),h=f(a.target);a.preventDefault(),g||(e.init(),g=b.closest("["+e.attr_name()+"]").data(e.attr_name(!0)+"-init")),c.hasClass("visible")&&b[0]===c[0]&&d.length>0&&e.is_open(b)&&(c=d,h=f("img",c)),e.open(h,b,c),e.update_paddles(c)}).on("click.fndtn.clearing",".clearing-main-next",function(a){e.nav(a,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(a){e.nav(a,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(a){Foundation.libs.clearing.close(a,this)}),a(c).on("keydown.fndtn.clearing",function(a){e.keydown(a)}),f(b).off(".clearing").on("resize.fndtn.clearing",function(){e.resize()}),this.swipe_events(d)},swipe_events:function(a){var b=this,c=b.S;c(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(a){a.touches||(a=a.originalEvent);var b={start_page_x:a.touches[0].pageX,start_page_y:a.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:d};c(this).data("swipe-transition",b),a.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(a){if(a.touches||(a=a.originalEvent),!(a.touches.length>1||a.scale&&1!==a.scale)){var d=c(this).data("swipe-transition");if("undefined"==typeof d&&(d={}),d.delta_x=a.touches[0].pageX-d.start_page_x,Foundation.rtl&&(d.delta_x=-d.delta_x),"undefined"==typeof d.is_scrolling&&(d.is_scrolling=!!(d.is_scrolling||Math.abs(d.delta_x)<Math.abs(a.touches[0].pageY-d.start_page_y))),!d.is_scrolling&&!d.active){a.preventDefault();var e=d.delta_x<0?"next":"prev";d.active=!0,b.nav(a,e)}}}).on("touchend.fndtn.clearing",".visible-img",function(a){c(this).data("swipe-transition",{}),a.stopPropagation()})},assemble:function(b){var c=b.parent();if(!c.parent().hasClass("carousel")){c.after('<div id="foundationClearingHolder"></div>');var d=c.detach(),e="";if(null!=d[0]){e=d[0].outerHTML;var f=this.S("#foundationClearingHolder"),g=c.data(this.attr_name(!0)+"-init"),h={grid:'<div class="carousel">'+e+"</div>",viewing:g.templates.viewing},i='<div class="clearing-assembled"><div>'+h.viewing+h.grid+"</div></div>",j=this.settings.touch_label;Modernizr.touch&&(i=a(i).find(".clearing-touch-label").html(j).end()),f.after(i).remove()}}},open:function(b,d,e){function f(){setTimeout(function(){this.image_loaded(m,function(){1!==m.outerWidth()||o?g.call(this,m):f.call(this)}.bind(this))}.bind(this),100)}function g(b){var c=a(b);c.css("visibility","visible"),c.trigger("imageVisible"),i.css("overflow","hidden"),j.addClass("clearing-blackout"),k.addClass("clearing-container"),l.show(),this.fix_height(e).caption(h.S(".clearing-caption",l),h.S("img",e)).center_and_label(b,n).shift(d,e,function(){e.closest("li").siblings().removeClass("visible"),e.closest("li").addClass("visible")}),l.trigger("opened.fndtn.clearing")}var h=this,i=a(c.body),j=e.closest(".clearing-assembled"),k=h.S("div",j).first(),l=h.S(".visible-img",k),m=h.S("img",l).not(b),n=h.S(".clearing-touch-label",k),o=!1,p={};a("body").on("touchmove",function(a){a.preventDefault()}),m.error(function(){o=!0}),this.locked()||(l.trigger("open.fndtn.clearing"),p=this.load(b),p.interchange?m.attr("data-interchange",p.interchange).foundation("interchange","reflow"):m.attr("src",p.src).attr("data-interchange",""),m.css("visibility","hidden"),f.call(this))},close:function(b,d){b.preventDefault();var e,f,g=function(a){return/blackout/.test(a.selector)?a:a.closest(".clearing-blackout")}(a(d)),h=a(c.body);return d===b.target&&g&&(h.css("overflow",""),e=a("div",g).first(),f=a(".visible-img",e),f.trigger("close.fndtn.clearing"),this.settings.prev_index=0,a("ul["+this.attr_name()+"]",g).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),e.removeClass("clearing-container"),f.hide(),f.trigger("closed.fndtn.clearing")),a("body").off("touchmove"),!1},is_open:function(a){return a.parent().prop("style").length>0},keydown:function(b){var c=a(".clearing-blackout ul["+this.attr_name()+"]"),d=this.rtl?37:39,e=this.rtl?39:37,f=27;b.which===d&&this.go(c,"next"),b.which===e&&this.go(c,"prev"),b.which===f&&this.S("a.clearing-close").trigger("click.fndtn.clearing")},nav:function(b,c){var d=a("ul["+this.attr_name()+"]",".clearing-blackout");b.preventDefault(),this.go(d,c)},resize:function(){var b=a("img",".clearing-blackout .visible-img"),c=a(".clearing-touch-label",".clearing-blackout");b.length&&(this.center_and_label(b,c),b.trigger("resized.fndtn.clearing"))},fix_height:function(a){var b=a.parent().children(),c=this;return b.each(function(){var a=c.S(this),b=a.find("img");a.height()>b.outerHeight()&&a.addClass("fix-height")}).closest("ul").width(100*b.length+"%"),this},update_paddles:function(a){a=a.closest("li");var b=a.closest(".carousel").siblings(".visible-img");a.next().length>0?this.S(".clearing-main-next",b).removeClass("disabled"):this.S(".clearing-main-next",b).addClass("disabled"),a.prev().length>0?this.S(".clearing-main-prev",b).removeClass("disabled"):this.S(".clearing-main-prev",b).addClass("disabled")},center_and_label:function(a,b){return b.css(!this.rtl&&b.length>0?{marginLeft:-(b.outerWidth()/2),marginTop:-(a.outerHeight()/2)-b.outerHeight()-10}:{marginRight:-(b.outerWidth()/2),marginTop:-(a.outerHeight()/2)-b.outerHeight()-10,left:"auto",right:"50%"}),this},load:function(a){var b,c,d;return"A"===a[0].nodeName?(b=a.attr("href"),c=a.data("clearing-interchange")):(d=a.closest("a"),b=d.attr("href"),c=d.data("clearing-interchange")),this.preload(a),{src:b?b:a.attr("src"),interchange:b?c:a.data("clearing-interchange")}},preload:function(a){this.img(a.closest("li").next(),"next").img(a.closest("li").prev(),"prev")},img:function(b,c){if(b.length){var d,e,f,g=a(".clearing-preload-"+c),h=this.S("a",b);h.length?(d=h.attr("href"),e=h.data("clearing-interchange")):(f=this.S("img",b),d=f.attr("src"),e=f.data("clearing-interchange")),e?g.attr("data-interchange",e):(g.attr("src",d),g.attr("data-interchange",""))}return this},caption:function(a,b){var c=b.attr("data-caption");return c?a.html(c).show():a.text("").hide(),this},go:function(a,b){var c=this.S(".visible",a),d=c[b]();this.settings.skip_selector&&0!=d.find(this.settings.skip_selector).length&&(d=d[b]()),d.length&&this.S("img",d).trigger("click.fndtn.clearing",[c,d]).trigger("change.fndtn.clearing")},shift:function(a,b,c){var d,e=b.parent(),f=this.settings.prev_index||b.index(),g=this.direction(e,a,b),h=this.rtl?"right":"left",i=parseInt(e.css("left"),10),j=b.outerWidth(),k={};b.index()===f||/skip/.test(g)?/skip/.test(g)&&(d=b.index()-this.settings.up_count,this.lock(),d>0?(k[h]=-(d*j),e.animate(k,300,this.unlock())):(k[h]=0,e.animate(k,300,this.unlock()))):/left/.test(g)?(this.lock(),k[h]=i+j,e.animate(k,300,this.unlock())):/right/.test(g)&&(this.lock(),k[h]=i-j,e.animate(k,300,this.unlock())),c()},direction:function(a,b,c){var d,e=this.S("li",a),f=e.outerWidth()+e.outerWidth()/4,g=Math.floor(this.S(".clearing-container").outerWidth()/f)-1,h=e.index(c);return this.settings.up_count=g,d=this.adjacent(this.settings.prev_index,h)?h>g&&h>this.settings.prev_index?"right":h>g-1&&h<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=h,d},adjacent:function(a,b){for(var c=b+1;c>=b-1;c--)if(c===a)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){this.S(this.scope).off(".fndtn.clearing"),this.S(b).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.5.2",settings:{active_class:"open",disabled_class:"disabled",mega_class:"mega",align:"bottom",is_hover:!1,hover_timeout:150,opened:function(){},closed:function(){}},init:function(b,c,d){Foundation.inherit(this,"throttle"),a.extend(!0,this.settings,c,d),this.bindings(c,d)},events:function(d){var e=this,f=e.S;f(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(b){var c=f(this).data(e.attr_name(!0)+"-init")||e.settings;(!c.is_hover||Modernizr.touch)&&(b.preventDefault(),f(this).parent("[data-reveal-id]").length&&b.stopPropagation(),e.toggle(a(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(a){var b,c,d=f(this);clearTimeout(e.timeout),d.data(e.data_attr())?(b=f("#"+d.data(e.data_attr())),c=d):(b=d,c=f("["+e.attr_name()+'="'+b.attr("id")+'"]'));var g=c.data(e.attr_name(!0)+"-init")||e.settings;f(a.currentTarget).data(e.data_attr())&&g.is_hover&&e.closeall.call(e),g.is_hover&&e.open.apply(e,[b,c])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(a){var b,c=f(this);if(c.data(e.data_attr()))b=c.data(e.data_attr(!0)+"-init")||e.settings;else var d=f("["+e.attr_name()+'="'+f(this).attr("id")+'"]'),b=d.data(e.attr_name(!0)+"-init")||e.settings;e.timeout=setTimeout(function(){c.data(e.data_attr())?b.is_hover&&e.close.call(e,f("#"+c.data(e.data_attr()))):b.is_hover&&e.close.call(e,c)}.bind(this),b.hover_timeout)}).on("click.fndtn.dropdown",function(b){var d=f(b.target).closest("["+e.attr_name()+"-content]"),g=d.find("a");return g.length>0&&"false"!==d.attr("aria-autoclose")&&e.close.call(e,f("["+e.attr_name()+"-content]")),b.target!==c&&!a.contains(c.documentElement,b.target)||f(b.target).closest("["+e.attr_name()+"]").length>0?void 0:!f(b.target).data("revealId")&&d.length>0&&(f(b.target).is("["+e.attr_name()+"-content]")||a.contains(d.first()[0],b.target))?void b.stopPropagation():void e.close.call(e,f("["+e.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+e.attr_name()+"-content]",function(){e.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+e.attr_name()+"-content]",function(){e.settings.closed.call(this)}),f(b).off(".dropdown").on("resize.fndtn.dropdown",e.throttle(function(){e.resize.call(e)},50)),this.resize()},close:function(b){var c=this;b.each(function(d){var e=a("["+c.attr_name()+"="+b[d].id+"]")||a("aria-controls="+b[d].id+"]");e.attr("aria-expanded","false"),c.S(this).hasClass(c.settings.active_class)&&(c.S(this).css(Foundation.rtl?"right":"left","-99999px").attr("aria-hidden","true").removeClass(c.settings.active_class).prev("["+c.attr_name()+"]").removeClass(c.settings.active_class).removeData("target"),c.S(this).trigger("closed.fndtn.dropdown",[b]))}),b.removeClass("f-open-"+this.attr_name(!0))},closeall:function(){var b=this;a.each(b.S(".f-open-"+this.attr_name(!0)),function(){b.close.call(b,b.S(this))})},open:function(a,b){this.css(a.addClass(this.settings.active_class),b),a.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),a.data("target",b.get(0)).trigger("opened.fndtn.dropdown",[a,b]),a.attr("aria-hidden","false"),b.attr("aria-expanded","true"),a.focus(),a.addClass("f-open-"+this.attr_name(!0))},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(a){if(!a.hasClass(this.settings.disabled_class)){var b=this.S("#"+a.data(this.data_attr()));0!==b.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(b)),b.hasClass(this.settings.active_class)?(this.close.call(this,b),b.data("target")!==a.get(0)&&this.open.call(this,b,a)):this.open.call(this,b,a))}},resize:function(){var b=this.S("["+this.attr_name()+"-content].open"),c=a(b.data("target"));b.length&&c.length&&this.css(b,c)},css:function(a,b){var c=Math.max((b.width()-a.width())/2,8),d=b.data(this.attr_name(!0)+"-init")||this.settings,e=a.parent().css("overflow-y")||a.parent().css("overflow");if(this.clear_idx(),this.small()){var f=this.dirs.bottom.call(a,b,d);a.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:f.top}),a.css(Foundation.rtl?"right":"left",c)}else if("visible"!==e){var g=b[0].offsetTop+b[0].offsetHeight;a.attr("style","").css({position:"absolute",top:g}),a.css(Foundation.rtl?"right":"left",c)}else this.style(a,b,d);return a},style:function(b,c,d){var e=a.extend({position:"absolute"},this.dirs[d.align].call(b,c,d));b.attr("style","").css(e)},dirs:{_base:function(a){var d=this.offsetParent(),e=d.offset(),f=a.offset();f.top-=e.top,f.left-=e.left,f.missRight=!1,f.missTop=!1,f.missLeft=!1,f.leftRightFlag=!1;var g;g=c.getElementsByClassName("row")[0]?c.getElementsByClassName("row")[0].clientWidth:b.innerWidth;var h=(b.innerWidth-g)/2,i=g;return this.hasClass("mega")||(a.offset().top<=this.outerHeight()&&(f.missTop=!0,i=b.innerWidth-h,f.leftRightFlag=!0),a.offset().left+this.outerWidth()>a.offset().left+h&&a.offset().left-h>this.outerWidth()&&(f.missRight=!0,f.missLeft=!1),a.offset().left-this.outerWidth()<=0&&(f.missLeft=!0,f.missRight=!1)),f},top:function(a,b){var c=Foundation.libs.dropdown,d=c.dirs._base.call(this,a);return this.addClass("drop-top"),1==d.missTop&&(d.top=d.top+a.outerHeight()+this.outerHeight(),this.removeClass("drop-top")),1==d.missRight&&(d.left=d.left-this.outerWidth()+a.outerWidth()),(a.outerWidth()<this.outerWidth()||c.small()||this.hasClass(b.mega_menu))&&c.adjust_pip(this,a,b,d),Foundation.rtl?{left:d.left-this.outerWidth()+a.outerWidth(),top:d.top-this.outerHeight()}:{left:d.left,top:d.top-this.outerHeight()}},bottom:function(a,b){var c=Foundation.libs.dropdown,d=c.dirs._base.call(this,a);return 1==d.missRight&&(d.left=d.left-this.outerWidth()+a.outerWidth()),(a.outerWidth()<this.outerWidth()||c.small()||this.hasClass(b.mega_menu))&&c.adjust_pip(this,a,b,d),
c.rtl?{left:d.left-this.outerWidth()+a.outerWidth(),top:d.top+a.outerHeight()}:{left:d.left,top:d.top+a.outerHeight()}},left:function(a,b){var c=Foundation.libs.dropdown.dirs._base.call(this,a);return this.addClass("drop-left"),1==c.missLeft&&(c.left=c.left+this.outerWidth(),c.top=c.top+a.outerHeight(),this.removeClass("drop-left")),{left:c.left-this.outerWidth(),top:c.top}},right:function(a,b){var c=Foundation.libs.dropdown.dirs._base.call(this,a);this.addClass("drop-right"),1==c.missRight?(c.left=c.left-this.outerWidth(),c.top=c.top+a.outerHeight(),this.removeClass("drop-right")):c.triggeredRight=!0;var d=Foundation.libs.dropdown;return(a.outerWidth()<this.outerWidth()||d.small()||this.hasClass(b.mega_menu))&&d.adjust_pip(this,a,b,c),{left:c.left+a.outerWidth(),top:c.top}}},adjust_pip:function(a,b,c,d){var e=Foundation.stylesheet,f=8;a.hasClass(c.mega_class)?f=d.left+b.outerWidth()/2-8:this.small()&&(f+=d.left-8),this.rule_idx=e.cssRules.length;var g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left: "+f+"px;",j="left: "+(f-1)+"px;";1==d.missRight&&(f=a.outerWidth()-23,g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left: "+f+"px;",j="left: "+(f-1)+"px;"),1==d.triggeredRight&&(g=".f-dropdown.open:before",h=".f-dropdown.open:after",i="left:-12px;",j="left:-14px;"),e.insertRule?(e.insertRule([g,"{",i,"}"].join(" "),this.rule_idx),e.insertRule([h,"{",j,"}"].join(" "),this.rule_idx+1)):(e.addRule(g,i,this.rule_idx),e.addRule(h,j,this.rule_idx+1))},clear_idx:function(){var a=Foundation.stylesheet;"undefined"!=typeof this.rule_idx&&(a.deleteRule(this.rule_idx),a.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(b).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.equalizer={name:"equalizer",version:"5.5.2",settings:{use_tallest:!0,before_height_change:a.noop,after_height_change:a.noop,equalize_on_stack:!1,act_on_hidden_el:!1},init:function(a,b,c){Foundation.inherit(this,"image_loaded"),this.bindings(b,c),this.reflow()},events:function(){this.S(b).off(".equalizer").on("resize.fndtn.equalizer",function(a){this.reflow()}.bind(this))},equalize:function(b){var c,d,e=!1,f=b.data("equalizer"),g=b.data(this.attr_name(!0)+"-init")||this.settings;if(c=b.find(g.act_on_hidden_el?f?"["+this.attr_name()+'-watch="'+f+'"]':"["+this.attr_name()+"-watch]":f?"["+this.attr_name()+'-watch="'+f+'"]:visible':"["+this.attr_name()+"-watch]:visible"),0!==c.length&&(g.before_height_change(),b.trigger("before-height-change.fndth.equalizer"),c.height("inherit"),g.equalize_on_stack!==!1||(d=c.first().offset().top,c.each(function(){return a(this).offset().top!==d?(e=!0,!1):void 0}),!e))){var h=c.map(function(){return a(this).outerHeight(!1)}).get();if(g.use_tallest){var i=Math.max.apply(null,h);c.css("height",i)}else{var j=Math.min.apply(null,h);c.css("height",j)}g.after_height_change(),b.trigger("after-height-change.fndtn.equalizer")}},reflow:function(){var b=this;this.S("["+this.attr_name()+"]",this.scope).each(function(){var c=a(this),d=c.data("equalizer-mq"),e=!0;d&&(d="is_"+d.replace(/-/g,"_"),Foundation.utils.hasOwnProperty(d)&&(e=!1)),b.image_loaded(b.S("img",this),function(){if(e||Foundation.utils[d]())b.equalize(c);else{var a=c.find("["+b.attr_name()+"-watch]:visible");a.css("height","auto")}})})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.interchange={name:"interchange",version:"5.5.2",cache:{},images_loaded:!1,nodes_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen",small:Foundation.media_queries.small,"small-only":Foundation.media_queries["small-only"],medium:Foundation.media_queries.medium,"medium-only":Foundation.media_queries["medium-only"],large:Foundation.media_queries.large,"large-only":Foundation.media_queries["large-only"],xlarge:Foundation.media_queries.xlarge,"xlarge-only":Foundation.media_queries["xlarge-only"],xxlarge:Foundation.media_queries.xxlarge,landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(b,c,d){if(null!==b&&/IMG/.test(b[0].nodeName)){var e=b[0].src;if(new RegExp(c,"i").test(e))return;return b.attr("src",c),d(b[0].src)}var f=b.data(this.data_attr+"-last-path"),g=this;if(f!=c)return/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(c)?(a(b).css("background-image","url("+c+")"),b.data("interchange-last-path",c),d(c)):a.get(c,function(a){b.html(a),b.data(g.data_attr+"-last-path",c),d()})}}},init:function(b,c,d){Foundation.inherit(this,"throttle random_str"),this.data_attr=this.set_data_attr(),a.extend(!0,this.settings,c,d),this.bindings(c,d),this.reflow()},get_media_hash:function(){var a="";for(var b in this.settings.named_queries)a+=matchMedia(this.settings.named_queries[b]).matches.toString();return a},events:function(){var c,d=this;return a(b).off(".interchange").on("resize.fndtn.interchange",d.throttle(function(){var a=d.get_media_hash();a!==c&&d.resize(),c=a},50)),this},resize:function(){var b=this.cache;if(!this.images_loaded||!this.nodes_loaded)return void setTimeout(a.proxy(this.resize,this),50);for(var c in b)if(b.hasOwnProperty(c)){var d=this.results(c,b[c]);d&&this.settings.directives[d.scenario[1]].call(this,d.el,d.scenario[0],function(a){if(arguments[0]instanceof Array)var b=arguments[0];else var b=Array.prototype.slice.call(arguments,0);return function(){a.el.trigger(a.scenario[1],b)}}(d))}},results:function(a,b){var c=b.length;if(c>0)for(var d=this.S("["+this.add_namespace("data-uuid")+'="'+a+'"]');c--;){var e,f=b[c][2];if(e=matchMedia(this.settings.named_queries.hasOwnProperty(f)?this.settings.named_queries[f]:f),e.matches)return{el:d,scenario:b[c]}}return!1},load:function(a,b){return("undefined"==typeof this["cached_"+a]||b)&&this["update_"+a](),this["cached_"+a]},update_images:function(){var a=this.S("img["+this.data_attr+"]"),b=a.length,c=b,d=0,e=this.data_attr;for(this.cache={},this.cached_images=[],this.images_loaded=0===b;c--;){if(d++,a[c]){var f=a[c].getAttribute(e)||"";f.length>0&&this.cached_images.push(a[c])}d===b&&(this.images_loaded=!0,this.enhance("images"))}return this},update_nodes:function(){var a=this.S("["+this.data_attr+"]").not("img"),b=a.length,c=b,d=0,e=this.data_attr;for(this.cached_nodes=[],this.nodes_loaded=0===b;c--;){d++;var f=a[c].getAttribute(e)||"";f.length>0&&this.cached_nodes.push(a[c]),d===b&&(this.nodes_loaded=!0,this.enhance("nodes"))}return this},enhance:function(c){for(var d=this["cached_"+c].length;d--;)this.object(a(this["cached_"+c][d]));return a(b).trigger("resize.fndtn.interchange")},convert_directive:function(a){var b=this.trim(a);return b.length>0?b:"replace"},parse_scenario:function(a){var b=a[0].match(/(.+),\s*(\w+)\s*$/),c=a[1].match(/(.*)\)/);if(b)var d=b[1],e=b[2];else var f=a[0].split(/,\s*$/),d=f[0],e="";return[this.trim(d),this.convert_directive(e),this.trim(c[1])]},object:function(a){var b=this.parse_data_attr(a),c=[],d=b.length;if(d>0)for(;d--;){var e=b[d].split(/,\s?\(/);if(e.length>1){var f=this.parse_scenario(e);c.push(f)}}return this.store(a,c)},store:function(a,b){var c=this.random_str(),d=a.data(this.add_namespace("uuid",!0));return this.cache[d]?this.cache[d]:(a.attr(this.add_namespace("data-uuid"),c),this.cache[c]=b)},trim:function(b){return"string"==typeof b?a.trim(b):b},set_data_attr:function(a){return a?this.namespace.length>0?this.namespace+"-"+this.settings.load_attr:this.settings.load_attr:this.namespace.length>0?"data-"+this.namespace+"-"+this.settings.load_attr:"data-"+this.settings.load_attr},parse_data_attr:function(a){for(var b=a.attr(this.attr_name()).split(/\[(.*?)\]/),c=b.length,d=[];c--;)b[c].replace(/[\W\d]+/,"").length>4&&d.push(b[c]);return d},reflow:function(){this.load("images",!0),this.load("nodes",!0)}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.joyride={name:"joyride",version:"5.5.2",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(b,c,d){Foundation.inherit(this,"throttle random_str"),this.settings=this.settings||a.extend({},this.defaults,d||c),this.bindings(c,d)},go_next:function(){this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())},go_prev:function(){this.settings.$li.prev().length<1||(this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(null,!0),this.startTimer()):(this.hide(),this.show(null,!0)))},events:function(){var c=this;a(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(a){a.preventDefault(),this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(a){a.preventDefault(),this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(a){a.preventDefault(),this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(a){if(this.settings.keyboard&&this.settings.riding)switch(a.which){case 39:a.preventDefault(),this.go_next();break;case 37:a.preventDefault(),this.go_prev();break;case 27:a.preventDefault(),this.end(this.settings.abort_on_close)}}.bind(this)),a(b).off(".joyride").on("resize.fndtn.joyride",c.throttle(function(){if(a("["+c.attr_name()+"]").length>0&&c.settings.$next_tip&&c.settings.riding){if(c.settings.exposed.length>0){var b=a(c.settings.exposed);b.each(function(){var b=a(this);c.un_expose(b),c.expose(b)})}c.is_phone()?c.pos_phone():c.pos_default(!1)}},100))},start:function(){var b=this,c=a("["+this.attr_name()+"]",this.scope),d=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],e=d.length;!c.length>0||(this.settings.init||this.events(),this.settings=c.data(this.attr_name(!0)+"-init"),this.settings.$content_el=c,this.settings.$body=a(this.settings.tip_container),this.settings.body_offset=a(this.settings.tip_container).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.riding=!0,"function"!=typeof a.cookie&&(this.settings.cookie_monster=!1),(!this.settings.cookie_monster||this.settings.cookie_monster&&!a.cookie(this.settings.cookie_name))&&(this.settings.$tip_content.each(function(c){var f=a(this);this.settings=a.extend({},b.defaults,b.data_options(f));for(var g=e;g--;)b.settings[d[g]]=parseInt(b.settings[d[g]],10);b.create({$li:f,index:c})}),!this.settings.start_timer_on_click&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")))},resume:function(){this.set_li(),this.show()},tip_template:function(b){var c,d;return b.tip_class=b.tip_class||"",c=a(this.settings.template.tip).addClass(b.tip_class),d=a.trim(a(b.li).html())+this.prev_button_text(b.prev_button_text,b.index)+this.button_text(b.button_text)+this.settings.template.link+this.timer_instance(b.index),c.append(a(this.settings.template.wrapper)),c.first().attr(this.add_namespace("data-index"),b.index),a(".joyride-content-wrapper",c).append(d),c[0]},timer_instance:function(b){var c;return c=0===b&&this.settings.start_timer_on_click&&this.settings.timer>0||0===this.settings.timer?"":a(this.settings.template.timer)[0].outerHTML},button_text:function(b){return this.settings.tip_settings.next_button?(b=a.trim(b)||"Next",b=a(this.settings.template.button).append(b)[0].outerHTML):b="",b},prev_button_text:function(b,c){return this.settings.tip_settings.prev_button?(b=a.trim(b)||"Previous",b=0==c?a(this.settings.template.prev_button).append(b).addClass("disabled")[0].outerHTML:a(this.settings.template.prev_button).append(b)[0].outerHTML):b="",b},create:function(b){this.settings.tip_settings=a.extend({},this.settings,this.data_options(b.$li));var c=b.$li.attr(this.add_namespace("data-button"))||b.$li.attr(this.add_namespace("data-text")),d=b.$li.attr(this.add_namespace("data-button-prev"))||b.$li.attr(this.add_namespace("data-prev-text")),e=b.$li.attr("class"),f=a(this.tip_template({tip_class:e,index:b.index,button_text:c,prev_button_text:d,li:b.$li}));a(this.settings.tip_container).append(f)},show:function(b,c){var e=null;if(this.settings.$li===d||-1===a.inArray(this.settings.$li.index(),this.settings.pause_after))if(this.settings.paused?this.settings.paused=!1:this.set_li(b,c),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0){if(b&&(this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tip_settings=a.extend({},this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location],!/body/i.test(this.settings.$target.selector)){var f=a(".joyride-modal-bg");/pop/i.test(this.settings.tipAnimation)?f.hide():f.fadeOut(this.settings.tipAnimationFadeSpeed),this.scroll_to()}this.is_phone()?this.pos_phone(!0):this.pos_default(!0),e=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tip_animation)?(e.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tip_animation)&&(e.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show(),setTimeout(function(){e.animate({width:e.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)):this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)),this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(b,c):this.end();else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||a(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(a.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(a,b){a?(this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(b?this.settings.$li=this.settings.$li.prev():this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=a(".joyride-tip-guide").eq(this.settings.$li.index()),this.settings.$next_tip.data("closed","")},set_target:function(){var b=this.settings.$li.attr(this.add_namespace("data-class")),d=this.settings.$li.attr(this.add_namespace("data-id")),e=function(){return d?a(c.getElementById(d)):b?a("."+b).first():a("body")};this.settings.$target=e()},scroll_to:function(){var c,d;c=a(b).height()/2,d=Math.ceil(this.settings.$target.offset().top-c+this.settings.$next_tip.outerHeight()),0!=d&&a("html, body").stop().animate({scrollTop:d},this.settings.scroll_speed,"swing")},paused:function(){return-1===a.inArray(this.settings.$li.index()+1,this.settings.pause_after)},restart:function(){this.hide(),this.settings.$li=d,this.show("init")},pos_default:function(a){var b=this.settings.$next_tip.find(".joyride-nub"),c=Math.ceil(b.outerWidth()/2),d=Math.ceil(b.outerHeight()/2),e=a||!1;if(e&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector))this.settings.$li.length&&this.pos_modal(b);else{var f=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,g=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;this.bottom()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top+d+this.settings.$target.outerHeight()+f,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+g}:{top:this.settings.$target.offset().top+d+this.settings.$target.outerHeight()+f,left:this.settings.$target.offset().left+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"top")):this.top()?(this.settings.$next_tip.css(this.rtl?{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-d+f,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}:{top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-d+f,left:this.settings.$target.offset().left+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"bottom")):this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top+f,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+c+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top+f,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-c+g}),this.nub_position(b,this.settings.tip_settings.nub_position,"right")),!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length&&(b.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}e&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(b){var c=this.settings.$next_tip.outerHeight(),d=(this.settings.$next_tip.offset(),this.settings.$target.outerHeight()),e=a(".joyride-nub",this.settings.$next_tip),f=Math.ceil(e.outerHeight()/2),g=b||!1;e.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),g&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(e):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-c-f}),e.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+d+f}),e.addClass("top")),g&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(a){this.center(),a.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var b=a(".joyride-modal-bg");if(b.length<1){var b=a(this.settings.template.modal);b.appendTo("body")}/pop/i.test(this.settings.tip_animation)?b.show():b.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var c,d,e,f,g,h="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof a)e=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;e=this.settings.$target}return e.length<1?(b.console&&console.error("element not valid",e),!1):(c=a(this.settings.template.expose),this.settings.$body.append(c),c.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(!0),height:e.outerHeight(!0)}),d=a(this.settings.template.expose_cover),f={zIndex:e.css("z-index"),position:e.css("position")},g=null==e.attr("class")?"":e.attr("class"),e.css("z-index",parseInt(c.css("z-index"))+1),"static"==f.position&&e.css("position","relative"),e.data("expose-css",f),e.data("orig-class",g),e.attr("class",g+" "+this.settings.expose_add_class),d.css({top:e.offset().top,left:e.offset().left,width:e.outerWidth(!0),height:e.outerHeight(!0)}),this.settings.modal&&this.show_modal(),this.settings.$body.append(d),c.addClass(h),d.addClass(h),e.data("expose",h),this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,e),void this.add_exposed(e))},un_expose:function(){var c,d,e,f,g,h=!1;if(arguments.length>0&&arguments[0]instanceof a)d=arguments[0];else{if(!this.settings.$target||/body/i.test(this.settings.$target.selector))return!1;d=this.settings.$target}return d.length<1?(b.console&&console.error("element not valid",d),!1):(c=d.data("expose"),e=a("."+c),arguments.length>1&&(h=arguments[1]),h===!0?a(".joyride-expose-wrapper,.joyride-expose-cover").remove():e.remove(),f=d.data("expose-css"),"auto"==f.zIndex?d.css("z-index",""):d.css("z-index",f.zIndex),f.position!=d.css("position")&&("static"==f.position?d.css("position",""):d.css("position",f.position)),g=d.data("orig-class"),d.attr("class",g),d.removeData("orig-classes"),d.removeData("expose"),d.removeData("expose-z-index"),void this.remove_exposed(d))},add_exposed:function(b){this.settings.exposed=this.settings.exposed||[],b instanceof a||"object"==typeof b?this.settings.exposed.push(b[0]):"string"==typeof b&&this.settings.exposed.push(b)},remove_exposed:function(b){var c,d;for(b instanceof a?c=b[0]:"string"==typeof b&&(c=b),this.settings.exposed=this.settings.exposed||[],d=this.settings.exposed.length;d--;)if(this.settings.exposed[d]==c)return void this.settings.exposed.splice(d,1)},center:function(){var c=a(b);return this.settings.$next_tip.css({top:(c.height()-this.settings.$next_tip.outerHeight())/2+c.scrollTop(),left:(c.width()-this.settings.$next_tip.outerWidth())/2+c.scrollLeft()}),!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(c){var d=a(b),e=d.height()/2,f=Math.ceil(this.settings.$target.offset().top-e+this.settings.$next_tip.outerHeight()),g=d.width()+d.scrollLeft(),h=d.height()+f,i=d.height()+d.scrollTop(),j=d.scrollTop();return j>f&&(j=0>f?0:f),h>i&&(i=h),[c.offset().top<j,g<c.offset().left+c.outerWidth(),i<c.offset().top+c.outerHeight(),d.scrollLeft()>c.offset().left]},visible:function(a){for(var b=a.length;b--;)if(a[b])return!1;return!0},nub_position:function(a,b,c){a.addClass("auto"===b?c:b)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(b){this.settings.cookie_monster&&a.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),a(this.scope).off("keyup.joyride"),this.settings.$next_tip.data("closed",!0),this.settings.riding=!1,a(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),("undefined"==typeof b||b===!1)&&(this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip),this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)),a(".joyride-tip-guide").remove()},off:function(){a(this.scope).off(".joyride"),a(b).off(".joyride"),a(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),a(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs["magellan-expedition"]={name:"magellan-expedition",version:"5.5.2",settings:{active_class:"active",threshold:0,destination_threshold:20,throttle_delay:30,fixed_top:0,offset_by_height:!0,duration:700,easing:"swing"},init:function(a,b,c){Foundation.inherit(this,"throttle"),this.bindings(b,c)},events:function(){var b=this,c=b.S,d=b.settings;b.set_expedition_position(),c(b.scope).off(".magellan").on("click.fndtn.magellan","["+b.add_namespace("data-magellan-arrival")+"] a[href*=#]",function(c){var d=this.hostname===location.hostname||!this.hostname,e=b.filterPathname(location.pathname)===b.filterPathname(this.pathname),f=this.hash.replace(/(:|\.|\/)/g,"\\$1"),g=this;if(d&&e&&f){c.preventDefault();var h=a(this).closest("["+b.attr_name()+"]"),i=h.data("magellan-expedition-init"),j=this.hash.split("#").join(""),k=a('a[name="'+j+'"]');0===k.length&&(k=a("#"+j));var l=k.offset().top-i.destination_threshold+1;i.offset_by_height&&(l-=h.outerHeight()),a("html, body").stop().animate({scrollTop:l},i.duration,i.easing,function(){history.pushState?history.pushState(null,null,g.pathname+"#"+j):location.hash=g.pathname+"#"+j})}}).on("scroll.fndtn.magellan",b.throttle(this.check_for_arrivals.bind(this),d.throttle_delay))},check_for_arrivals:function(){var a=this;a.update_arrivals(),a.update_expedition_positions()},set_expedition_position:function(){var b=this;a("["+this.attr_name()+"=fixed]",b.scope).each(function(c,d){var e,f,g=a(this),h=g.data("magellan-expedition-init"),i=g.attr("styles");g.attr("style",""),e=g.offset().top+h.threshold,f=parseInt(g.data("magellan-fixed-top")),isNaN(f)||(b.settings.fixed_top=f),g.data(b.data_attr("magellan-top-offset"),e),g.attr("style",i)})},update_expedition_positions:function(){var c=this,d=a(b).scrollTop();a("["+this.attr_name()+"=fixed]",c.scope).each(function(){var b=a(this),e=b.data("magellan-expedition-init"),f=b.attr("style"),g=b.data("magellan-top-offset");if(d+c.settings.fixed_top>=g){var h=b.prev("["+c.add_namespace("data-magellan-expedition-clone")+"]");0===h.length&&(h=b.clone(),h.removeAttr(c.attr_name()),h.attr(c.add_namespace("data-magellan-expedition-clone"),""),b.before(h)),b.css({position:"fixed",top:e.fixed_top}).addClass("fixed")}else b.prev("["+c.add_namespace("data-magellan-expedition-clone")+"]").remove(),b.attr("style",f).css("position","").css("top","").removeClass("fixed")})},update_arrivals:function(){var c=this,d=a(b).scrollTop();a("["+this.attr_name()+"]",c.scope).each(function(){var b=a(this),e=b.data(c.attr_name(!0)+"-init"),f=c.offsets(b,d),g=b.find("["+c.add_namespace("data-magellan-arrival")+"]"),h=!1;f.each(function(a,d){if(d.viewport_offset>=d.top_offset){var f=b.find("["+c.add_namespace("data-magellan-arrival")+"]");return f.not(d.arrival).removeClass(e.active_class),d.arrival.addClass(e.active_class),h=!0,!0}}),h||g.removeClass(e.active_class)})},offsets:function(b,c){var d=this,e=b.data(d.attr_name(!0)+"-init"),f=c;return b.find("["+d.add_namespace("data-magellan-arrival")+"]").map(function(c,g){var h=a(this).data(d.data_attr("magellan-arrival")),i=a("["+d.add_namespace("data-magellan-destination")+"="+h+"]");if(i.length>0){var j=i.offset().top-e.destination_threshold;return e.offset_by_height&&(j-=b.outerHeight()),j=Math.floor(j),{destination:i,arrival:a(this),top_offset:j,viewport_offset:f}}}).sort(function(a,b){return a.top_offset<b.top_offset?-1:a.top_offset>b.top_offset?1:0})},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},off:function(){this.S(this.scope).off(".magellan"),this.S(b).off(".magellan")},filterPathname:function(a){return a=a||"",a.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},reflow:function(){var b=this;a("["+b.add_namespace("data-magellan-expedition-clone")+"]",b.scope).remove()}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.5.2",settings:{open_method:"move",close_on_click:!1},init:function(a,b,c){this.bindings(b,c)},events:function(){var b=this,c=b.S,d="",e="",f="";"move"===this.settings.open_method?(d="move-",e="right",f="left"):"overlap_single"===this.settings.open_method?(d="offcanvas-overlap-",e="right",f="left"):"overlap"===this.settings.open_method&&(d="offcanvas-overlap"),c(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(f){b.click_toggle_class(f,d+e),"overlap"!==b.settings.open_method&&c(".left-submenu").removeClass(d+e),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(f){var g=b.get_settings(f),h=c(this).parent();!g.close_on_click||h.hasClass("has-submenu")||h.hasClass("back")?c(this).parent().hasClass("has-submenu")?(f.preventDefault(),c(this).siblings(".left-submenu").toggleClass(d+e)):h.hasClass("back")&&(f.preventDefault(),h.parent().removeClass(d+e)):(b.hide.call(b,d+e,b.get_wrapper(f)),h.parent().removeClass(d+e)),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(e){b.click_toggle_class(e,d+f),"overlap"!==b.settings.open_method&&c(".right-submenu").removeClass(d+f),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(e){var g=b.get_settings(e),h=c(this).parent();!g.close_on_click||h.hasClass("has-submenu")||h.hasClass("back")?c(this).parent().hasClass("has-submenu")?(e.preventDefault(),c(this).siblings(".right-submenu").toggleClass(d+f)):h.hasClass("back")&&(e.preventDefault(),h.parent().removeClass(d+f)):(b.hide.call(b,d+f,b.get_wrapper(e)),h.parent().removeClass(d+f)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(g){b.click_remove_class(g,d+f),c(".right-submenu").removeClass(d+f),e&&(b.click_remove_class(g,d+e),c(".left-submenu").removeClass(d+f)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(c){b.click_remove_class(c,d+f),a(".left-off-canvas-toggle").attr("aria-expanded","false"),e&&(b.click_remove_class(c,d+e),a(".right-off-canvas-toggle").attr("aria-expanded","false"))})},toggle:function(a,b){b=b||this.get_wrapper(),b.is("."+a)?this.hide(a,b):this.show(a,b)},show:function(a,b){b=b||this.get_wrapper(),b.trigger("open.fndtn.offcanvas"),b.addClass(a)},hide:function(a,b){b=b||this.get_wrapper(),b.trigger("close.fndtn.offcanvas"),b.removeClass(a)},click_toggle_class:function(a,b){
a.preventDefault();var c=this.get_wrapper(a);this.toggle(b,c)},click_remove_class:function(a,b){a.preventDefault();var c=this.get_wrapper(a);this.hide(b,c)},get_settings:function(a){var b=this.S(a.target).closest("["+this.attr_name()+"]");return b.data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(a){var b=this.S(a?a.target:this.scope).closest(".off-canvas-wrap");return 0===b.length&&(b=this.S(".off-canvas-wrap")),b},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";var e=function(){},f=function(e,f){if(e.hasClass(f.slides_container_class))return this;var j,k,l,m,n,o,p=this,q=e,r=0,s=!1;p.slides=function(){return q.children(f.slide_selector)},p.slides().first().addClass(f.active_slide_class),p.update_slide_number=function(b){f.slide_number&&(k.find("span:first").text(parseInt(b)+1),k.find("span:last").text(p.slides().length)),f.bullets&&(l.children().removeClass(f.bullets_active_class),a(l.children().get(b)).addClass(f.bullets_active_class))},p.update_active_link=function(b){var c=a('[data-orbit-link="'+p.slides().eq(b).attr("data-orbit-slide")+'"]');c.siblings().removeClass(f.bullets_active_class),c.addClass(f.bullets_active_class)},p.build_markup=function(){q.wrap('<div class="'+f.container_class+'"></div>'),j=q.parent(),q.addClass(f.slides_container_class),f.stack_on_small&&j.addClass(f.stack_on_small_class),f.navigation_arrows&&(j.append(a('<a href="#"><span></span></a>').addClass(f.prev_class)),j.append(a('<a href="#"><span></span></a>').addClass(f.next_class))),f.timer&&(m=a("<div>").addClass(f.timer_container_class),m.append("<span>"),m.append(a("<div>").addClass(f.timer_progress_class)),m.addClass(f.timer_paused_class),j.append(m)),f.slide_number&&(k=a("<div>").addClass(f.slide_number_class),k.append("<span></span> "+f.slide_number_text+" <span></span>"),j.append(k)),f.bullets&&(l=a("<ol>").addClass(f.bullets_container_class),j.append(l),l.wrap('<div class="orbit-bullets-container"></div>'),p.slides().each(function(b,c){var d=a("<li>").attr("data-orbit-slide",b).on("click",p.link_bullet);l.append(d)}))},p._goto=function(b,c){if(b===r)return!1;"object"==typeof o&&o.restart();var d=p.slides(),e="next";if(s=!0,r>b&&(e="prev"),b>=d.length){if(!f.circular)return!1;b=0}else if(0>b){if(!f.circular)return!1;b=d.length-1}var g=a(d.get(r)),h=a(d.get(b));g.css("zIndex",2),g.removeClass(f.active_slide_class),h.css("zIndex",4).addClass(f.active_slide_class),q.trigger("before-slide-change.fndtn.orbit"),f.before_slide_change(),p.update_active_link(b);var i=function(){var a=function(){r=b,s=!1,c===!0&&(o=p.create_timer(),o.start()),p.update_slide_number(r),q.trigger("after-slide-change.fndtn.orbit",[{slide_number:r,total_slides:d.length}]),f.after_slide_change(r,d.length)};q.outerHeight()!=h.outerHeight()&&f.variable_height?q.animate({height:h.outerHeight()},250,"linear",a):a()};if(1===d.length)return i(),!1;var j=function(){"next"===e&&n.next(g,h,i),"prev"===e&&n.prev(g,h,i)};h.outerHeight()>q.outerHeight()&&f.variable_height?q.animate({height:h.outerHeight()},250,"linear",j):j()},p.next=function(a){a.stopImmediatePropagation(),a.preventDefault(),p._goto(r+1)},p.prev=function(a){a.stopImmediatePropagation(),a.preventDefault(),p._goto(r-1)},p.link_custom=function(b){b.preventDefault();var c=a(this).attr("data-orbit-link");if("string"==typeof c&&""!=(c=a.trim(c))){var d=j.find("[data-orbit-slide="+c+"]");-1!=d.index()&&p._goto(d.index())}},p.link_bullet=function(b){var c=a(this).attr("data-orbit-slide");if("string"==typeof c&&""!=(c=a.trim(c)))if(isNaN(parseInt(c))){var d=j.find("[data-orbit-slide="+c+"]");-1!=d.index()&&p._goto(d.index()+1)}else p._goto(parseInt(c))},p.timer_callback=function(){p._goto(r+1,!0)},p.compute_dimensions=function(){var b=a(p.slides().get(r)),c=b.outerHeight();f.variable_height||p.slides().each(function(){a(this).outerHeight()>c&&(c=a(this).outerHeight())}),q.height(c)},p.create_timer=function(){var a=new g(j.find("."+f.timer_container_class),f,p.timer_callback);return a},p.stop_timer=function(){"object"==typeof o&&o.stop()},p.toggle_timer=function(){var a=j.find("."+f.timer_container_class);a.hasClass(f.timer_paused_class)?("undefined"==typeof o&&(o=p.create_timer()),o.start()):"object"==typeof o&&o.stop()},p.init=function(){p.build_markup(),f.timer&&(o=p.create_timer(),Foundation.utils.image_loaded(this.slides().children("img"),o.start)),n=new i(f,q),"slide"===f.animation&&(n=new h(f,q)),j.on("click","."+f.next_class,p.next),j.on("click","."+f.prev_class,p.prev),f.next_on_click&&j.on("click","."+f.slides_container_class+" [data-orbit-slide]",p.link_bullet),j.on("click",p.toggle_timer),f.swipe&&j.on("touchstart.fndtn.orbit",function(a){a.touches||(a=a.originalEvent);var b={start_page_x:a.touches[0].pageX,start_page_y:a.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:d};j.data("swipe-transition",b),a.stopPropagation()}).on("touchmove.fndtn.orbit",function(a){if(a.touches||(a=a.originalEvent),!(a.touches.length>1||a.scale&&1!==a.scale)){var b=j.data("swipe-transition");if("undefined"==typeof b&&(b={}),b.delta_x=a.touches[0].pageX-b.start_page_x,"undefined"==typeof b.is_scrolling&&(b.is_scrolling=!!(b.is_scrolling||Math.abs(b.delta_x)<Math.abs(a.touches[0].pageY-b.start_page_y))),!b.is_scrolling&&!b.active){a.preventDefault();var c=b.delta_x<0?r+1:r-1;b.active=!0,p._goto(c)}}}).on("touchend.fndtn.orbit",function(a){j.data("swipe-transition",{}),a.stopPropagation()}),j.on("mouseenter.fndtn.orbit",function(a){f.timer&&f.pause_on_hover&&p.stop_timer()}).on("mouseleave.fndtn.orbit",function(a){f.timer&&f.resume_on_mouseout&&o.start()}),a(c).on("click","[data-orbit-link]",p.link_custom),a(b).on("load resize",p.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),p.compute_dimensions),Foundation.utils.image_loaded(this.slides().children("img"),function(){j.prev("."+f.preloader_class).css("display","none"),p.update_slide_number(0),p.update_active_link(0),q.trigger("ready.fndtn.orbit")})},p.init()},g=function(a,b,c){var d,e,f=this,g=b.timer_speed,h=a.find("."+b.timer_progress_class),i=-1;this.update_progress=function(a){var b=h.clone();b.attr("style",""),b.css("width",a+"%"),h.replaceWith(b),h=b},this.restart=function(){clearTimeout(e),a.addClass(b.timer_paused_class),i=-1,f.update_progress(0)},this.start=function(){return a.hasClass(b.timer_paused_class)?(i=-1===i?g:i,a.removeClass(b.timer_paused_class),d=(new Date).getTime(),h.animate({width:"100%"},i,"linear"),e=setTimeout(function(){f.restart(),c()},i),void a.trigger("timer-started.fndtn.orbit")):!0},this.stop=function(){if(a.hasClass(b.timer_paused_class))return!0;clearTimeout(e),a.addClass(b.timer_paused_class);var c=(new Date).getTime();i-=c-d;var h=100-i/g*100;f.update_progress(h),a.trigger("timer-stopped.fndtn.orbit")}},h=function(b,c){var d=b.animation_speed,e=1===a("html[dir=rtl]").length,f=e?"marginRight":"marginLeft",g={};g[f]="0%",this.next=function(a,b,c){a.animate({marginLeft:"-100%"},d),b.animate(g,d,function(){a.css(f,"100%"),c()})},this.prev=function(a,b,c){a.animate({marginLeft:"100%"},d),b.css(f,"-100%"),b.animate(g,d,function(){a.css(f,"100%"),c()})}},i=function(b,c){{var d=b.animation_speed;1===a("html[dir=rtl]").length}this.next=function(a,b,c){b.css({margin:"0%",opacity:"0.01"}),b.animate({opacity:"1"},d,"linear",function(){a.css("margin","100%"),c()})},this.prev=function(a,b,c){b.css({margin:"0%",opacity:"0.01"}),b.animate({opacity:"1"},d,"linear",function(){a.css("margin","100%"),c()})}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"5.5.2",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,next_on_click:!0,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",preloader_class:"preloader",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,circular:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:e,after_slide_change:e},init:function(a,b,c){this.bindings(b,c)},events:function(a){var b=new f(this.S(a),this.S(a).data("orbit-init"));this.S(a).data(this.name+"-instance",b)},reflow:function(){var a=this;if(a.S(a.scope).is("[data-orbit]")){var b=a.S(a.scope),c=b.data(a.name+"-instance");c.compute_dimensions()}else a.S("[data-orbit]",a.scope).each(function(b,c){var d=a.S(c),e=(a.data_options(d),d.data(a.name+"-instance"));e.compute_dimensions()})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";function e(a){var b=/fade/i.test(a),c=/pop/i.test(a);return{animate:b||c,pop:c,fade:b}}Foundation.libs.reveal={name:"reveal",version:"5.5.2",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",multiple_opened:!1,bg_class:"reveal-modal-bg",root_element:"body",open:function(){},opened:function(){},close:function(){},closed:function(){},on_ajax_error:a.noop,bg:a(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(b,c,d){a.extend(!0,this.settings,c,d),this.bindings(c,d)},events:function(a){var b=this,d=b.S;return d(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]:not([disabled])",function(a){if(a.preventDefault(),!b.locked){var c=d(this),e=c.data(b.data_attr("reveal-ajax")),f=c.data(b.data_attr("reveal-replace-content"));if(b.locked=!0,"undefined"==typeof e)b.open.call(b,c);else{var g=e===!0?c.attr("href"):e;b.open.call(b,c,{url:g},{replaceContentSel:f})}}}),d(c).on("click.fndtn.reveal",this.close_targets(),function(a){if(a.preventDefault(),!b.locked){var c=d("["+b.attr_name()+"].open").data(b.attr_name(!0)+"-init")||b.settings,e=d(a.target)[0]===d("."+c.bg_class)[0];if(e){if(!c.close_on_background_click)return;a.stopPropagation()}b.locked=!0,b.close.call(b,e?d("["+b.attr_name()+"].open:not(.toback)"):d(this).closest("["+b.attr_name()+"]"))}}),d("["+b.attr_name()+"]",this.scope).length>0?d(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):d(this.scope).on("open.fndtn.reveal","["+b.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+b.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+b.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+b.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+b.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+b.attr_name()+"]",this.close_video),!0},key_up_on:function(a){var b=this;return b.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(a){var c=b.S("["+b.attr_name()+"].open"),d=c.data(b.attr_name(!0)+"-init")||b.settings;d&&27===a.which&&d.close_on_esc&&!b.locked&&b.close.call(b,c)}),!0},key_up_off:function(a){return this.S("body").off("keyup.fndtn.reveal"),!0},open:function(c,d){var e,f=this;c?"undefined"!=typeof c.selector?e=f.S("#"+c.data(f.data_attr("reveal-id"))).first():(e=f.S(this.scope),d=c):e=f.S(this.scope);var g=e.data(f.attr_name(!0)+"-init");if(g=g||this.settings,e.hasClass("open")&&c.attr("data-reveal-id")==e.attr("id"))return f.close(e);if(!e.hasClass("open")){var h=f.S("["+f.attr_name()+"].open");if("undefined"==typeof e.data("css-top")&&e.data("css-top",parseInt(e.css("top"),10)).data("offset",this.cache_offset(e)),e.attr("tabindex","0").attr("aria-hidden","false"),this.key_up_on(e),e.on("open.fndtn.reveal",function(a){"fndtn.reveal"!==a.namespace}),e.on("open.fndtn.reveal").trigger("open.fndtn.reveal"),h.length<1&&this.toggle_bg(e,!0),"string"==typeof d&&(d={url:d}),"undefined"!=typeof d&&d.url){var i="undefined"!=typeof d.success?d.success:null;a.extend(d,{success:function(b,c,d){if(a.isFunction(i)){var j=i(b,c,d);"string"==typeof j&&(b=j)}"undefined"!=typeof options&&"undefined"!=typeof options.replaceContentSel?e.find(options.replaceContentSel).html(b):e.html(b),f.S(e).foundation("section","reflow"),f.S(e).children().foundation(),h.length>0&&(g.multiple_opened?f.to_back(h):f.hide(h,g.css.close)),f.show(e,g.css.open)}}),g.on_ajax_error!==a.noop&&a.extend(d,{error:g.on_ajax_error}),a.ajax(d)}else h.length>0&&(g.multiple_opened?f.to_back(h):f.hide(h,g.css.close)),this.show(e,g.css.open)}f.S(b).trigger("resize")},close:function(b){var b=b&&b.length?b:this.S(this.scope),c=this.S("["+this.attr_name()+"].open"),d=b.data(this.attr_name(!0)+"-init")||this.settings,e=this;c.length>0&&(b.removeAttr("tabindex","0").attr("aria-hidden","true"),this.locked=!0,this.key_up_off(b),b.trigger("close.fndtn.reveal"),(d.multiple_opened&&1===c.length||!d.multiple_opened||b.length>1)&&(e.toggle_bg(b,!1),e.to_front(b)),d.multiple_opened?(e.hide(b,d.css.close,d),e.to_front(a(a.makeArray(c).reverse()[1]))):e.hide(c,d.css.close,d))},close_targets:function(){var a="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?a+", ."+this.settings.bg_class:a},toggle_bg:function(b,c){0===this.S("."+this.settings.bg_class).length&&(this.settings.bg=a("<div />",{"class":this.settings.bg_class}).appendTo("body").hide());var e=this.settings.bg.filter(":visible").length>0;c!=e&&((c==d?e:!c)?this.hide(this.settings.bg):this.show(this.settings.bg))},show:function(c,d){if(d){var f=c.data(this.attr_name(!0)+"-init")||this.settings,g=f.root_element,h=this;if(0===c.parent(g).length){var i=c.wrap('<div style="display: none;" />').parent();c.on("closed.fndtn.reveal.wrapped",function(){c.detach().appendTo(i),c.unwrap().unbind("closed.fndtn.reveal.wrapped")}),c.detach().appendTo(g)}var j=e(f.animation);if(j.animate||(this.locked=!1),j.pop){d.top=a(b).scrollTop()-c.data("offset")+"px";var k={top:a(b).scrollTop()+c.data("css-top")+"px",opacity:1};return setTimeout(function(){return c.css(d).animate(k,f.animation_speed,"linear",function(){h.locked=!1,c.trigger("opened.fndtn.reveal")}).addClass("open")},f.animation_speed/2)}if(j.fade){d.top=a(b).scrollTop()+c.data("css-top")+"px";var k={opacity:1};return setTimeout(function(){return c.css(d).animate(k,f.animation_speed,"linear",function(){h.locked=!1,c.trigger("opened.fndtn.reveal")}).addClass("open")},f.animation_speed/2)}return c.css(d).show().css({opacity:1}).addClass("open").trigger("opened.fndtn.reveal")}var f=this.settings;return e(f.animation).fade?c.fadeIn(f.animation_speed/2):(this.locked=!1,c.show())},to_back:function(a){a.addClass("toback")},to_front:function(a){a.removeClass("toback")},hide:function(c,d){if(d){var f=c.data(this.attr_name(!0)+"-init"),g=this;f=f||this.settings;var h=e(f.animation);if(h.animate||(this.locked=!1),h.pop){var i={top:-a(b).scrollTop()-c.data("offset")+"px",opacity:0};return setTimeout(function(){return c.animate(i,f.animation_speed,"linear",function(){g.locked=!1,c.css(d).trigger("closed.fndtn.reveal")}).removeClass("open")},f.animation_speed/2)}if(h.fade){var i={opacity:0};return setTimeout(function(){return c.animate(i,f.animation_speed,"linear",function(){g.locked=!1,c.css(d).trigger("closed.fndtn.reveal")}).removeClass("open")},f.animation_speed/2)}return c.hide().css(d).removeClass("open").trigger("closed.fndtn.reveal")}var f=this.settings;return e(f.animation).fade?c.fadeOut(f.animation_speed/2):c.hide()},close_video:function(b){var c=a(".flex-video",b.target),d=a("iframe",c);d.length>0&&(d.attr("data-src",d[0].src),d.attr("src",d.attr("src")),c.hide())},open_video:function(b){var c=a(".flex-video",b.target),e=c.find("iframe");if(e.length>0){var f=e.attr("data-src");if("string"==typeof f)e[0].src=e.attr("data-src");else{var g=e[0].src;e[0].src=d,e[0].src=g}c.show()}},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},cache_offset:function(a){var b=a.show().height()+parseInt(a.css("top"),10)+a.scrollY;return a.hide(),b},off:function(){a(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.slider={name:"slider",version:"5.5.2",settings:{start:0,end:100,step:1,precision:null,initial:null,display_selector:"",vertical:!1,trigger_input_change:!1,on_change:function(){}},cache:{},init:function(a,b,c){Foundation.inherit(this,"throttle"),this.bindings(b,c),this.reflow()},events:function(){var c=this;a(this.scope).off(".slider").on("mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider","["+c.attr_name()+"]:not(.disabled, [disabled]) .range-slider-handle",function(b){c.cache.active||(b.preventDefault(),c.set_active_slider(a(b.target)))}).on("mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider",function(d){if(c.cache.active)if(d.preventDefault(),a.data(c.cache.active[0],"settings").vertical){var e=0;d.pageY||(e=b.scrollY),c.calculate_position(c.cache.active,c.get_cursor_position(d,"y")+e)}else c.calculate_position(c.cache.active,c.get_cursor_position(d,"x"))}).on("mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider",function(a){c.remove_active_slider()}).on("change.fndtn.slider",function(a){c.settings.on_change()}),c.S(b).on("resize.fndtn.slider",c.throttle(function(a){c.reflow()},300)),this.S("["+this.attr_name()+"]").each(function(){var b=a(this),d=b.children(".range-slider-handle")[0],e=c.initialize_settings(d);""!=e.display_selector&&a(e.display_selector).each(function(){this.hasOwnProperty("value")&&a(this).change(function(){b.foundation("slider","set_value",a(this).val())})})})},get_cursor_position:function(a,b){var c,d="page"+b.toUpperCase(),e="client"+b.toUpperCase();return"undefined"!=typeof a[d]?c=a[d]:"undefined"!=typeof a.originalEvent[e]?c=a.originalEvent[e]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0][e]?c=a.originalEvent.touches[0][e]:a.currentPoint&&"undefined"!=typeof a.currentPoint[b]&&(c=a.currentPoint[b]),c},set_active_slider:function(a){this.cache.active=a},remove_active_slider:function(){this.cache.active=null},calculate_position:function(b,c){var d=this,e=a.data(b[0],"settings"),f=(a.data(b[0],"handle_l"),a.data(b[0],"handle_o"),a.data(b[0],"bar_l")),g=a.data(b[0],"bar_o");requestAnimationFrame(function(){var a;a=Foundation.rtl&&!e.vertical?d.limit_to((g+f-c)/f,0,1):d.limit_to((c-g)/f,0,1),a=e.vertical?1-a:a;var h=d.normalized_value(a,e.start,e.end,e.step,e.precision);d.set_ui(b,h)})},set_ui:function(b,c){var d=a.data(b[0],"settings"),e=a.data(b[0],"handle_l"),f=a.data(b[0],"bar_l"),g=this.normalized_percentage(c,d.start,d.end),h=g*(f-e)-1,i=100*g,j=b.parent(),k=b.parent().children("input[type=hidden]");Foundation.rtl&&!d.vertical&&(h=-h),h=d.vertical?-h+f-e+1:h,this.set_translate(b,h,d.vertical),d.vertical?b.siblings(".range-slider-active-segment").css("height",i+"%"):b.siblings(".range-slider-active-segment").css("width",i+"%"),j.attr(this.attr_name(),c).trigger("change.fndtn.slider"),k.val(c),d.trigger_input_change&&k.trigger("change.fndtn.slider"),b[0].hasAttribute("aria-valuemin")||b.attr({"aria-valuemin":d.start,"aria-valuemax":d.end}),b.attr("aria-valuenow",c),""!=d.display_selector&&a(d.display_selector).each(function(){this.hasAttribute("value")?a(this).val(c):a(this).text(c)})},normalized_percentage:function(a,b,c){return Math.min(1,(a-b)/(c-b))},normalized_value:function(a,b,c,d,e){var f=c-b,g=a*f,h=(g-g%d)/d,i=g%d,j=i>=.5*d?d:0;return(h*d+j+b).toFixed(e)},set_translate:function(b,c,d){d?a(b).css("-webkit-transform","translateY("+c+"px)").css("-moz-transform","translateY("+c+"px)").css("-ms-transform","translateY("+c+"px)").css("-o-transform","translateY("+c+"px)").css("transform","translateY("+c+"px)"):a(b).css("-webkit-transform","translateX("+c+"px)").css("-moz-transform","translateX("+c+"px)").css("-ms-transform","translateX("+c+"px)").css("-o-transform","translateX("+c+"px)").css("transform","translateX("+c+"px)")},limit_to:function(a,b,c){return Math.min(Math.max(a,b),c)},initialize_settings:function(b){var c,d=a.extend({},this.settings,this.data_options(a(b).parent()));return null===d.precision&&(c=(""+d.step).match(/\.([\d]*)/),d.precision=c&&c[1]?c[1].length:0),d.vertical?(a.data(b,"bar_o",a(b).parent().offset().top),a.data(b,"bar_l",a(b).parent().outerHeight()),a.data(b,"handle_o",a(b).offset().top),a.data(b,"handle_l",a(b).outerHeight())):(a.data(b,"bar_o",a(b).parent().offset().left),a.data(b,"bar_l",a(b).parent().outerWidth()),a.data(b,"handle_o",a(b).offset().left),a.data(b,"handle_l",a(b).outerWidth())),a.data(b,"bar",a(b).parent()),a.data(b,"settings",d)},set_initial_position:function(b){var c=a.data(b.children(".range-slider-handle")[0],"settings"),d="number"!=typeof c.initial||isNaN(c.initial)?Math.floor(.5*(c.end-c.start)/c.step)*c.step+c.start:c.initial,e=b.children(".range-slider-handle");this.set_ui(e,d)},set_value:function(b){var c=this;a("["+c.attr_name()+"]",this.scope).each(function(){a(this).attr(c.attr_name(),b)}),a(this.scope).attr(c.attr_name())&&a(this.scope).attr(c.attr_name(),b),c.reflow()},reflow:function(){var b=this;b.S("["+this.attr_name()+"]").each(function(){var c=a(this).children(".range-slider-handle")[0],d=a(this).attr(b.attr_name());b.initialize_settings(c),d?b.set_ui(a(c),parseFloat(d)):b.set_initial_position(a(this))})}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.tab={name:"tab",version:"5.5.2",settings:{active_class:"active",callback:function(){},deep_linking:!1,scroll_to_content:!0,is_hover:!1},default_tab_hashes:[],init:function(a,c,d){var e=this,f=this.S;f("["+this.attr_name()+"] > .active > a",this.scope).each(function(){e.default_tab_hashes.push(this.hash)}),e.entry_location=b.location.href,this.bindings(c,d),this.handle_location_hash_change()},events:function(){var a=this,c=this.S,d=function(b,d){var e=c(d).closest("["+a.attr_name()+"]").data(a.attr_name(!0)+"-init");(!e.is_hover||Modernizr.touch)&&(b.preventDefault(),b.stopPropagation(),a.toggle_active_tab(c(d).parent()))};c(this.scope).off(".tab").on("keydown.fndtn.tab","["+this.attr_name()+"] > * > a",function(a){var b=this,c=a.keyCode||a.which;9==c&&(a.preventDefault(),d(a,b))}).on("click.fndtn.tab","["+this.attr_name()+"] > * > a",function(a){var b=this;d(a,b)}).on("mouseenter.fndtn.tab","["+this.attr_name()+"] > * > a",function(b){var d=c(this).closest("["+a.attr_name()+"]").data(a.attr_name(!0)+"-init");d.is_hover&&a.toggle_active_tab(c(this).parent())}),c(b).on("hashchange.fndtn.tab",function(b){b.preventDefault(),a.handle_location_hash_change()})},handle_location_hash_change:function(){var b=this,c=this.S;c("["+this.attr_name()+"]",this.scope).each(function(){var e=c(this).data(b.attr_name(!0)+"-init");if(e.deep_linking){var f;if(f=e.scroll_to_content?b.scope.location.hash:b.scope.location.hash.replace("fndtn-",""),""!=f){var g=c(f);if(g.hasClass("content")&&g.parent().hasClass("tabs-content"))b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href="+f+"]").parent());else{var h=g.closest(".content").attr("id");h!=d&&b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href=#"+h+"]").parent(),f)}}else for(var i=0;i<b.default_tab_hashes.length;i++)b.toggle_active_tab(a("["+b.attr_name()+"] > * > a[href="+b.default_tab_hashes[i]+"]").parent())}})},toggle_active_tab:function(e,f){var g=this,h=g.S,i=e.closest("["+this.attr_name()+"]"),j=e.find("a"),k=e.children("a").first(),l="#"+k.attr("href").split("#")[1],m=h(l),n=e.siblings(),o=i.data(this.attr_name(!0)+"-init"),p=function(b){var d,e=a(this),f=a(this).parents("li").prev().children('[role="tab"]'),g=a(this).parents("li").next().children('[role="tab"]');switch(b.keyCode){case 37:d=f;break;case 39:d=g;break;default:d=!1}d.length&&(e.attr({tabindex:"-1","aria-selected":null}),d.attr({tabindex:"0","aria-selected":!0}).focus()),a('[role="tabpanel"]').attr("aria-hidden","true"),a("#"+a(c.activeElement).attr("href").substring(1)).attr("aria-hidden",null)},q=function(a){var c=b.location.href===g.entry_location,d=o.scroll_to_content?g.default_tab_hashes[0]:c?b.location.hash:"fndtn-"+g.default_tab_hashes[0].replace("#","");c&&a===d||(b.location.hash=a)};k.data("tab-content")&&(l="#"+k.data("tab-content").split("#")[1],m=h(l)),o.deep_linking&&(o.scroll_to_content?(q(f||l),f==d||f==l?e.parent()[0].scrollIntoView():h(l)[0].scrollIntoView()):q(f!=d?"fndtn-"+f.replace("#",""):"fndtn-"+l.replace("#",""))),e.addClass(o.active_class).triggerHandler("opened"),j.attr({"aria-selected":"true",tabindex:0}),n.removeClass(o.active_class),n.find("a").attr({"aria-selected":"false",tabindex:-1}),m.siblings().removeClass(o.active_class).attr({"aria-hidden":"true",tabindex:-1}),m.addClass(o.active_class).attr("aria-hidden","false").removeAttr("tabindex"),o.callback(e),m.triggerHandler("toggled",[m]),i.triggerHandler("toggled",[e]),j.off("keydown").on("keydown",p)},data_attr:function(a){return this.namespace.length>0?this.namespace+"-"+a:a},off:function(){},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.5.2",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,show_on:"all",tip_template:function(a,b){return'<span data-selector="'+a+'" id="'+a+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+b+'<span class="nub"></span></span>'}},cache:{},init:function(a,b,c){Foundation.inherit(this,"random_str"),this.bindings(b,c)},should_show:function(b,c){var d=a.extend({},this.settings,this.data_options(b));return"all"===d.show_on?!0:this.small()&&"small"===d.show_on?!0:this.medium()&&"medium"===d.show_on?!0:this.large()&&"large"===d.show_on?!0:!1},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(b){function c(a,b,c){a.timer||(c?(a.timer=null,e.showTip(b)):a.timer=setTimeout(function(){a.timer=null,e.showTip(b)}.bind(a),e.settings.hover_delay))}function d(a,b){a.timer&&(clearTimeout(a.timer),a.timer=null),e.hide(b)}var e=this,f=e.S;e.create(this.S(b)),a(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(b){var g=f(this),h=a.extend({},e.settings,e.data_options(g)),i=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&f(b.target).is("a"))return!1;if(/mouse/i.test(b.type)&&e.ie_touch(b))return!1;if(g.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&b.preventDefault(),e.hide(g);else{if(h.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type))return;if(!h.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(b.type)&&(b.preventDefault(),f(h.tooltip_class+".open").hide(),i=!0,a(".open["+e.attr_name()+"]").length>0)){var j=f(a(".open["+e.attr_name()+"]")[0]);e.hide(j)}/enter|over/i.test(b.type)?c(this,g):"mouseout"===b.type||"mouseleave"===b.type?d(this,g):c(this,g,!0)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(b){return/mouse/i.test(b.type)&&e.ie_touch(b)?!1:void(("touch"!=a(this).data("tooltip-open-event-type")||"mouseleave"!=b.type)&&("mouse"==a(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(b.type)?e.convert_to_touch(a(this)):d(this,a(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(a){d(this,f(this))})},ie_touch:function(a){return!1},showTip:function(a){var b=this.getTip(a);return this.should_show(a,b)?this.show(a):void 0},getTip:function(b){var c=this.selector(b),d=a.extend({},this.settings,this.data_options(b)),e=null;return c&&(e=this.S('span[data-selector="'+c+'"]'+d.tooltip_class)),"object"==typeof e?e:!1},selector:function(a){var b=a.attr(this.attr_name())||a.attr("data-selector");return"string"!=typeof b&&(b=this.random_str(6),a.attr("data-selector",b).attr("aria-describedby",b)),b},create:function(c){var d=this,e=a.extend({},this.settings,this.data_options(c)),f=this.settings.tip_template;"string"==typeof e.tip_template&&b.hasOwnProperty(e.tip_template)&&(f=b[e.tip_template]);var g=a(f(this.selector(c),a("<div></div>").html(c.attr("title")).html())),h=this.inheritable_classes(c);g.addClass(h).appendTo(e.append_to),Modernizr.touch&&(g.append('<span class="tap-to-close">'+e.touch_close_text+"</span>"),g.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(a){d.hide(c)})),c.removeAttr("title").attr("title","")},reposition:function(b,c,d){var e,f,g,h,i;if(c.css("visibility","hidden").show(),e=b.data("width"),f=c.children(".nub"),g=f.outerHeight(),h=f.outerHeight(),c.css(this.small()?{width:"100%"}:{width:e?e:"auto"}),i=function(a,b,c,d,e,f){return a.css({top:b?b:"auto",bottom:d?d:"auto",left:e?e:"auto",right:c?c:"auto"}).end()},i(c,b.offset().top+b.outerHeight()+10,"auto","auto",b.offset().left),this.small())i(c,b.offset().top+b.outerHeight()+10,"auto","auto",12.5,a(this.scope).width()),c.addClass("tip-override"),i(f,-g,"auto","auto",b.offset().left);else{var j=b.offset().left;Foundation.rtl&&(f.addClass("rtl"),j=b.offset().left+b.outerWidth()-c.outerWidth()),i(c,b.offset().top+b.outerHeight()+10,"auto","auto",j),f.attr("style")&&f.removeAttr("style"),c.removeClass("tip-override"),d&&d.indexOf("tip-top")>-1?(Foundation.rtl&&f.addClass("rtl"),i(c,b.offset().top-c.outerHeight(),"auto","auto",j).removeClass("tip-override")):d&&d.indexOf("tip-left")>-1?(i(c,b.offset().top+b.outerHeight()/2-c.outerHeight()/2,"auto","auto",b.offset().left-c.outerWidth()-g).removeClass("tip-override"),f.removeClass("rtl")):d&&d.indexOf("tip-right")>-1&&(i(c,b.offset().top+b.outerHeight()/2-c.outerHeight()/2,"auto","auto",b.offset().left+b.outerWidth()+g).removeClass("tip-override"),f.removeClass("rtl"))}c.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(b){var c=a.extend({},this.settings,this.data_options(b)),d=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(c.additional_inheritable_classes),e=b.attr("class"),f=e?a.map(e.split(" "),function(b,c){return-1!==a.inArray(b,d)?b:void 0}).join(" "):"";return a.trim(f)},convert_to_touch:function(b){var c=this,d=c.getTip(b),e=a.extend({},c.settings,c.data_options(b));0===d.find(".tap-to-close").length&&(d.append('<span class="tap-to-close">'+e.touch_close_text+"</span>"),d.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(a){c.hide(b)})),b.data("tooltip-open-event-type","touch")},show:function(a){var b=this.getTip(a);"touch"==a.data("tooltip-open-event-type")&&this.convert_to_touch(a),this.reposition(a,b,a.attr("class")),a.addClass("open"),b.fadeIn(150)},hide:function(a){var b=this.getTip(a);b.fadeOut(150,function(){b.find(".tap-to-close").remove(),b.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),a.removeClass("open")})},off:function(){var b=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(c){a("["+b.attr_name()+"]").eq(c).attr("title",a(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document),function(a,b,c,d){"use strict";Foundation.libs.topbar={name:"topbar",version:"5.5.2",settings:{index:0,start_offset:0,
sticky_class:"sticky",custom_back_text:!0,back_text:"Back",mobile_show_parent_link:!0,is_hover:!0,scrolltop:!0,sticky_on:"all",dropdown_autoclose:!0},init:function(b,c,d){Foundation.inherit(this,"add_custom_rule register_media throttle");var e=this;e.register_media("topbar","foundation-mq-topbar"),this.bindings(c,d),e.S("["+this.attr_name()+"]",this.scope).each(function(){{var b=a(this),c=b.data(e.attr_name(!0)+"-init");e.S("section, .top-bar-section",this)}b.data("index",0);var d=b.parent();d.hasClass("fixed")||e.is_sticky(b,d,c)?(e.settings.sticky_class=c.sticky_class,e.settings.sticky_topbar=b,b.data("height",d.outerHeight()),b.data("stickyoffset",d.offset().top)):b.data("height",b.outerHeight()),c.assembled||e.assemble(b),c.is_hover?e.S(".has-dropdown",b).addClass("not-click"):e.S(".has-dropdown",b).removeClass("not-click"),e.add_custom_rule(".f-topbar-fixed { padding-top: "+b.data("height")+"px }"),d.hasClass("fixed")&&e.S("body").addClass("f-topbar-fixed")})},is_sticky:function(a,b,c){var d=b.hasClass(c.sticky_class),e=matchMedia(Foundation.media_queries.small).matches,f=matchMedia(Foundation.media_queries.medium).matches,g=matchMedia(Foundation.media_queries.large).matches;return d&&"all"===c.sticky_on?!0:d&&this.small()&&-1!==c.sticky_on.indexOf("small")&&e&&!f&&!g?!0:d&&this.medium()&&-1!==c.sticky_on.indexOf("medium")&&e&&f&&!g?!0:d&&this.large()&&-1!==c.sticky_on.indexOf("large")&&e&&f&&g?!0:!1},toggle:function(c){var d,e=this;d=c?e.S(c).closest("["+this.attr_name()+"]"):e.S("["+this.attr_name()+"]");var f=d.data(this.attr_name(!0)+"-init"),g=e.S("section, .top-bar-section",d);e.breakpoint()&&(e.rtl?(g.css({right:"0%"}),a(">.name",g).css({right:"100%"})):(g.css({left:"0%"}),a(">.name",g).css({left:"100%"})),e.S("li.moved",g).removeClass("moved"),d.data("index",0),d.toggleClass("expanded").css("height","")),f.scrolltop?d.hasClass("expanded")?d.parent().hasClass("fixed")&&(f.scrolltop?(d.parent().removeClass("fixed"),d.addClass("fixed"),e.S("body").removeClass("f-topbar-fixed"),b.scrollTo(0,0)):d.parent().removeClass("expanded")):d.hasClass("fixed")&&(d.parent().addClass("fixed"),d.removeClass("fixed"),e.S("body").addClass("f-topbar-fixed")):(e.is_sticky(d,d.parent(),f)&&d.parent().addClass("fixed"),d.parent().hasClass("fixed")&&(d.hasClass("expanded")?(d.addClass("fixed"),d.parent().addClass("expanded"),e.S("body").addClass("f-topbar-fixed")):(d.removeClass("fixed"),d.parent().removeClass("expanded"),e.update_sticky_positioning())))},timer:null,events:function(c){var d=this,e=this.S;e(this.scope).off(".topbar").on("click.fndtn.topbar","["+this.attr_name()+"] .toggle-topbar",function(a){a.preventDefault(),d.toggle(this)}).on("click.fndtn.topbar contextmenu.fndtn.topbar",'.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(b){var c=a(this).closest("li"),e=c.closest("["+d.attr_name()+"]"),f=e.data(d.attr_name(!0)+"-init");if(f.dropdown_autoclose&&f.is_hover){var g=a(this).closest(".hover");g.removeClass("hover")}!d.breakpoint()||c.hasClass("back")||c.hasClass("has-dropdown")||d.toggle()}).on("click.fndtn.topbar","["+this.attr_name()+"] li.has-dropdown",function(b){var c=e(this),f=e(b.target),g=c.closest("["+d.attr_name()+"]"),h=g.data(d.attr_name(!0)+"-init");return f.data("revealId")?void d.toggle():void(d.breakpoint()||(!h.is_hover||Modernizr.touch)&&(b.stopImmediatePropagation(),c.hasClass("hover")?(c.removeClass("hover").find("li").removeClass("hover"),c.parents("li.hover").removeClass("hover")):(c.addClass("hover"),a(c).siblings().removeClass("hover"),"A"===f[0].nodeName&&f.parent().hasClass("has-dropdown")&&b.preventDefault())))}).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown>a",function(a){if(d.breakpoint()){a.preventDefault();var b=e(this),c=b.closest("["+d.attr_name()+"]"),f=c.find("section, .top-bar-section"),g=(b.next(".dropdown").outerHeight(),b.closest("li"));c.data("index",c.data("index")+1),g.addClass("moved"),d.rtl?(f.css({right:-(100*c.data("index"))+"%"}),f.find(">.name").css({right:100*c.data("index")+"%"})):(f.css({left:-(100*c.data("index"))+"%"}),f.find(">.name").css({left:100*c.data("index")+"%"})),c.css("height",b.siblings("ul").outerHeight(!0)+c.data("height"))}}),e(b).off(".topbar").on("resize.fndtn.topbar",d.throttle(function(){d.resize.call(d)},50)).trigger("resize.fndtn.topbar").load(function(){e(this).trigger("resize.fndtn.topbar")}),e("body").off(".topbar").on("click.fndtn.topbar",function(a){var b=e(a.target).closest("li").closest("li.hover");b.length>0||e("["+d.attr_name()+"] li.hover").removeClass("hover")}),e(this.scope).on("click.fndtn.topbar","["+this.attr_name()+"] .has-dropdown .back",function(a){a.preventDefault();var b=e(this),c=b.closest("["+d.attr_name()+"]"),f=c.find("section, .top-bar-section"),g=(c.data(d.attr_name(!0)+"-init"),b.closest("li.moved")),h=g.parent();c.data("index",c.data("index")-1),d.rtl?(f.css({right:-(100*c.data("index"))+"%"}),f.find(">.name").css({right:100*c.data("index")+"%"})):(f.css({left:-(100*c.data("index"))+"%"}),f.find(">.name").css({left:100*c.data("index")+"%"})),0===c.data("index")?c.css("height",""):c.css("height",h.outerHeight(!0)+c.data("height")),setTimeout(function(){g.removeClass("moved")},300)}),e(this.scope).find(".dropdown a").focus(function(){a(this).parents(".has-dropdown").addClass("hover")}).blur(function(){a(this).parents(".has-dropdown").removeClass("hover")})},resize:function(){var a=this;a.S("["+this.attr_name()+"]").each(function(){var b,d=a.S(this),e=d.data(a.attr_name(!0)+"-init"),f=d.parent("."+a.settings.sticky_class);if(!a.breakpoint()){var g=d.hasClass("expanded");d.css("height","").removeClass("expanded").find("li").removeClass("hover"),g&&a.toggle(d)}a.is_sticky(d,f,e)&&(f.hasClass("fixed")?(f.removeClass("fixed"),b=f.offset().top,a.S(c.body).hasClass("f-topbar-fixed")&&(b-=d.data("height")),d.data("stickyoffset",b),f.addClass("fixed")):(b=f.offset().top,d.data("stickyoffset",b)))})},breakpoint:function(){return!matchMedia(Foundation.media_queries.topbar).matches},small:function(){return matchMedia(Foundation.media_queries.small).matches},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},assemble:function(b){var c=this,d=b.data(this.attr_name(!0)+"-init"),e=c.S("section, .top-bar-section",b);e.detach(),c.S(".has-dropdown>a",e).each(function(){var b,e=c.S(this),f=e.siblings(".dropdown"),g=e.attr("href");f.find(".title.back").length||(b=a(1==d.mobile_show_parent_link&&g?'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="'+g+'">'+e.html()+"</a></li>":'<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>'),a("h5>a",b).html(1==d.custom_back_text?d.back_text:"&laquo; "+e.html()),f.prepend(b))}),e.appendTo(b),this.sticky(),this.assembled(b)},assembled:function(b){b.data(this.attr_name(!0),a.extend({},b.data(this.attr_name(!0)),{assembled:!0}))},height:function(b){var c=0,d=this;return a("> li",b).each(function(){c+=d.S(this).outerHeight(!0)}),c},sticky:function(){var a=this;this.S(b).on("scroll",function(){a.update_sticky_positioning()})},update_sticky_positioning:function(){var a="."+this.settings.sticky_class,c=this.S(b),d=this;if(d.settings.sticky_topbar&&d.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var e=this.settings.sticky_topbar.data("stickyoffset")+this.settings.start_offset;d.S(a).hasClass("expanded")||(c.scrollTop()>e?d.S(a).hasClass("fixed")||(d.S(a).addClass("fixed"),d.S("body").addClass("f-topbar-fixed")):c.scrollTop()<=e&&d.S(a).hasClass("fixed")&&(d.S(a).removeClass("fixed"),d.S("body").removeClass("f-topbar-fixed")))}},off:function(){this.S(this.scope).off(".fndtn.topbar"),this.S(b).off(".fndtn.topbar")},reflow:function(){}}}(jQuery,window,window.document);
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs['magellan-expedition'] = {
    name : 'magellan-expedition',

    version : '5.5.2',

    settings : {
      active_class : 'active',
      threshold : 0, // pixels from the top of the expedition for it to become fixes
      destination_threshold : 20, // pixels from the top of destination for it to be considered active
      throttle_delay : 30, // calculation throttling to increase framerate
      fixed_top : 0, // top distance in pixels assigend to the fixed element on scroll
      offset_by_height : true,  // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
      duration : 700, // animation duration time
      easing : 'swing' // animation easing
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          settings = self.settings;

      // initialize expedition offset
      self.set_expedition_position();

      S(self.scope)
        .off('.magellan')
        .on('click.fndtn.magellan', '[' + self.add_namespace('data-magellan-arrival') + '] a[href*=#]', function (e) {
          var sameHost = ((this.hostname === location.hostname) || !this.hostname),
              samePath = self.filterPathname(location.pathname) === self.filterPathname(this.pathname),
              testHash = this.hash.replace(/(:|\.|\/)/g, '\\$1'),
              anchor = this;

          if (sameHost && samePath && testHash) {
            e.preventDefault();
            var expedition = $(this).closest('[' + self.attr_name() + ']'),
                settings = expedition.data('magellan-expedition-init'),
                hash = this.hash.split('#').join(''),
                target = $('a[name="' + hash + '"]');

            if (target.length === 0) {
              target = $('#' + hash);

            }

            // Account for expedition height if fixed position
            var scroll_top = target.offset().top - settings.destination_threshold + 1;
            if (settings.offset_by_height) {
              scroll_top = scroll_top - expedition.outerHeight();
            }
            $('html, body').stop().animate({
              'scrollTop' : scroll_top
            }, settings.duration, settings.easing, function () {
              if (history.pushState) {
                        history.pushState(null, null, anchor.pathname + '#' + hash);
              }
                    else {
                        location.hash = anchor.pathname + '#' + hash;
                    }
            });
          }
        })
        .on('scroll.fndtn.magellan', self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay));
    },

    check_for_arrivals : function () {
      var self = this;
      self.update_arrivals();
      self.update_expedition_positions();
    },

    set_expedition_position : function () {
      var self = this;
      $('[' + this.attr_name() + '=fixed]', self.scope).each(function (idx, el) {
        var expedition = $(this),
            settings = expedition.data('magellan-expedition-init'),
            styles = expedition.attr('styles'), // save styles
            top_offset, fixed_top;

        expedition.attr('style', '');
        top_offset = expedition.offset().top + settings.threshold;

        //set fixed-top by attribute
        fixed_top = parseInt(expedition.data('magellan-fixed-top'));
        if (!isNaN(fixed_top)) {
          self.settings.fixed_top = fixed_top;
        }

        expedition.data(self.data_attr('magellan-top-offset'), top_offset);
        expedition.attr('style', styles);
      });
    },

    update_expedition_positions : function () {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + '=fixed]', self.scope).each(function () {
        var expedition = $(this),
            settings = expedition.data('magellan-expedition-init'),
            styles = expedition.attr('style'), // save styles
            top_offset = expedition.data('magellan-top-offset');

        //scroll to the top distance
        if (window_top_offset + self.settings.fixed_top >= top_offset) {
          // Placeholder allows height calculations to be consistent even when
          // appearing to switch between fixed/non-fixed placement
          var placeholder = expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']');
          if (placeholder.length === 0) {
            placeholder = expedition.clone();
            placeholder.removeAttr(self.attr_name());
            placeholder.attr(self.add_namespace('data-magellan-expedition-clone'), '');
            expedition.before(placeholder);
          }
          expedition.css({position :'fixed', top : settings.fixed_top}).addClass('fixed');
        } else {
          expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']').remove();
          expedition.attr('style', styles).css('position', '').css('top', '').removeClass('fixed');
        }
      });
    },

    update_arrivals : function () {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + ']', self.scope).each(function () {
        var expedition = $(this),
            settings = expedition.data(self.attr_name(true) + '-init'),
            offsets = self.offsets(expedition, window_top_offset),
            arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']'),
            active_item = false;
        offsets.each(function (idx, item) {
          if (item.viewport_offset >= item.top_offset) {
            var arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']');
            arrivals.not(item.arrival).removeClass(settings.active_class);
            item.arrival.addClass(settings.active_class);
            active_item = true;
            return true;
          }
        });

        if (!active_item) {
          arrivals.removeClass(settings.active_class);
        }
      });
    },

    offsets : function (expedition, window_offset) {
      var self = this,
          settings = expedition.data(self.attr_name(true) + '-init'),
          viewport_offset = window_offset;

      return expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']').map(function (idx, el) {
        var name = $(this).data(self.data_attr('magellan-arrival')),
            dest = $('[' + self.add_namespace('data-magellan-destination') + '=' + name + ']');
        if (dest.length > 0) {
          var top_offset = dest.offset().top - settings.destination_threshold;
          if (settings.offset_by_height) {
            top_offset = top_offset - expedition.outerHeight();
          }
          top_offset = Math.floor(top_offset);
          return {
            destination : dest,
            arrival : $(this),
            top_offset : top_offset,
            viewport_offset : viewport_offset
          }
        }
      }).sort(function (a, b) {
        if (a.top_offset < b.top_offset) {
          return -1;
        }
        if (a.top_offset > b.top_offset) {
          return 1;
        }
        return 0;
      });
    },

    data_attr : function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {
      this.S(this.scope).off('.magellan');
      this.S(window).off('.magellan');
    },

    filterPathname : function (pathname) {
      pathname = pathname || '';
      return pathname
          .replace(/^\//,'')
          .replace(/(?:index|default).[a-zA-Z]{3,4}$/,'')
          .replace(/\/$/,'');
    },

    reflow : function () {
      var self = this;
      // remove placeholder expeditions used for height calculation purposes
      $('[' + self.add_namespace('data-magellan-expedition-clone') + ']', self.scope).remove();
    }
  };
}(jQuery, window, window.document));
