!function(root, factory) {
    "use strict";
    "function" == typeof define && define.amd ? define(factory) : "object" == typeof exports ? module.exports = factory() : root.returnExports = factory();
}(this, function() {
    var isCallable, $Array = Array, ArrayPrototype = $Array.prototype, $Object = Object, ObjectPrototype = $Object.prototype, FunctionPrototype = Function.prototype, $String = String, StringPrototype = $String.prototype, $Number = Number, NumberPrototype = $Number.prototype, array_slice = ArrayPrototype.slice, array_splice = ArrayPrototype.splice, array_push = ArrayPrototype.push, array_unshift = ArrayPrototype.unshift, array_concat = ArrayPrototype.concat, call = FunctionPrototype.call, max = Math.max, min = Math.min, to_string = ObjectPrototype.toString, hasToStringTag = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, fnToStr = Function.prototype.toString, tryFunctionObject = function(value) {
        try {
            return fnToStr.call(value), !0;
        } catch (e) {
            return !1;
        }
    }, fnClass = "[object Function]", genClass = "[object GeneratorFunction]";
    isCallable = function(value) {
        if ("function" != typeof value) return !1;
        if (hasToStringTag) return tryFunctionObject(value);
        var strClass = to_string.call(value);
        return strClass === fnClass || strClass === genClass;
    };
    var isRegex, regexExec = RegExp.prototype.exec, tryRegexExec = function(value) {
        try {
            return regexExec.call(value), !0;
        } catch (e) {
            return !1;
        }
    }, regexClass = "[object RegExp]";
    isRegex = function(value) {
        return "object" != typeof value ? !1 : hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass;
    };
    var isString, strValue = String.prototype.valueOf, tryStringObject = function(value) {
        try {
            return strValue.call(value), !0;
        } catch (e) {
            return !1;
        }
    }, stringClass = "[object String]";
    isString = function(value) {
        return "string" == typeof value ? !0 : "object" != typeof value ? !1 : hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass;
    };
    var defineProperties = function(has) {
        var defineProperty, supportsDescriptors = $Object.defineProperty && function() {
            try {
                var obj = {};
                $Object.defineProperty(obj, "x", {
                    enumerable: !1,
                    value: obj
                });
                for (var _ in obj) return !1;
                return obj.x === obj;
            } catch (e) {
                return !1;
            }
        }();
        return defineProperty = supportsDescriptors ? function(object, name, method, forceAssign) {
            !forceAssign && name in object || $Object.defineProperty(object, name, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: method
            });
        } : function(object, name, method, forceAssign) {
            !forceAssign && name in object || (object[name] = method);
        }, function(object, map, forceAssign) {
            for (var name in map) has.call(map, name) && defineProperty(object, name, map[name], forceAssign);
        };
    }(ObjectPrototype.hasOwnProperty), isPrimitive = function(input) {
        var type = typeof input;
        return null === input || "object" !== type && "function" !== type;
    }, ES = {
        ToInteger: function(num) {
            var n = +num;
            return n !== n ? n = 0 : 0 !== n && n !== 1 / 0 && n !== -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n))), 
            n;
        },
        ToPrimitive: function(input) {
            var val, valueOf, toStr;
            if (isPrimitive(input)) return input;
            if (valueOf = input.valueOf, isCallable(valueOf) && (val = valueOf.call(input), 
            isPrimitive(val))) return val;
            if (toStr = input.toString, isCallable(toStr) && (val = toStr.call(input), isPrimitive(val))) return val;
            throw new TypeError();
        },
        ToObject: function(o) {
            if (null == o) throw new TypeError("can't convert " + o + " to object");
            return $Object(o);
        },
        ToUint32: function(x) {
            return x >>> 0;
        }
    }, Empty = function() {};
    defineProperties(FunctionPrototype, {
        bind: function(that) {
            var target = this;
            if (!isCallable(target)) throw new TypeError("Function.prototype.bind called on incompatible " + target);
            for (var bound, args = array_slice.call(arguments, 1), binder = function() {
                if (this instanceof bound) {
                    var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));
                    return $Object(result) === result ? result : this;
                }
                return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
            }, boundLength = max(0, target.length - args.length), boundArgs = [], i = 0; boundLength > i; i++) array_push.call(boundArgs, "$" + i);
            return bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this, arguments); }")(binder), 
            target.prototype && (Empty.prototype = target.prototype, bound.prototype = new Empty(), 
            Empty.prototype = null), bound;
        }
    });
    var owns = call.bind(ObjectPrototype.hasOwnProperty), toStr = call.bind(ObjectPrototype.toString), strSlice = call.bind(StringPrototype.slice), strSplit = call.bind(StringPrototype.split), isArray = $Array.isArray || function(obj) {
        return "[object Array]" === toStr(obj);
    }, hasUnshiftReturnValueBug = 1 !== [].unshift(0);
    defineProperties(ArrayPrototype, {
        unshift: function() {
            return array_unshift.apply(this, arguments), this.length;
        }
    }, hasUnshiftReturnValueBug), defineProperties($Array, {
        isArray: isArray
    });
    var boxedString = $Object("a"), splitString = "a" !== boxedString[0] || !(0 in boxedString), properlyBoxesContext = function(method) {
        var properlyBoxesNonStrict = !0, properlyBoxesStrict = !0;
        return method && (method.call("foo", function(_, __, context) {
            "object" != typeof context && (properlyBoxesNonStrict = !1);
        }), method.call([ 1 ], function() {
            "use strict";
            properlyBoxesStrict = "string" == typeof this;
        }, "x")), !!method && properlyBoxesNonStrict && properlyBoxesStrict;
    };
    defineProperties(ArrayPrototype, {
        forEach: function(callbackfn) {
            var T, object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, i = -1, length = self.length >>> 0;
            if (arguments.length > 1 && (T = arguments[1]), !isCallable(callbackfn)) throw new TypeError("Array.prototype.forEach callback must be a function");
            for (;++i < length; ) i in self && ("undefined" != typeof T ? callbackfn.call(T, self[i], i, object) : callbackfn(self[i], i, object));
        }
    }, !properlyBoxesContext(ArrayPrototype.forEach)), defineProperties(ArrayPrototype, {
        map: function(callbackfn) {
            var T, object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0, result = $Array(length);
            if (arguments.length > 1 && (T = arguments[1]), !isCallable(callbackfn)) throw new TypeError("Array.prototype.map callback must be a function");
            for (var i = 0; length > i; i++) i in self && ("undefined" != typeof T ? result[i] = callbackfn.call(T, self[i], i, object) : result[i] = callbackfn(self[i], i, object));
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.map)), defineProperties(ArrayPrototype, {
        filter: function(callbackfn) {
            var value, T, object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0, result = [];
            if (arguments.length > 1 && (T = arguments[1]), !isCallable(callbackfn)) throw new TypeError("Array.prototype.filter callback must be a function");
            for (var i = 0; length > i; i++) i in self && (value = self[i], ("undefined" == typeof T ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) && array_push.call(result, value));
            return result;
        }
    }, !properlyBoxesContext(ArrayPrototype.filter)), defineProperties(ArrayPrototype, {
        every: function(callbackfn) {
            var T, object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0;
            if (arguments.length > 1 && (T = arguments[1]), !isCallable(callbackfn)) throw new TypeError("Array.prototype.every callback must be a function");
            for (var i = 0; length > i; i++) if (i in self && !("undefined" == typeof T ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) return !1;
            return !0;
        }
    }, !properlyBoxesContext(ArrayPrototype.every)), defineProperties(ArrayPrototype, {
        some: function(callbackfn) {
            var T, object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0;
            if (arguments.length > 1 && (T = arguments[1]), !isCallable(callbackfn)) throw new TypeError("Array.prototype.some callback must be a function");
            for (var i = 0; length > i; i++) if (i in self && ("undefined" == typeof T ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) return !0;
            return !1;
        }
    }, !properlyBoxesContext(ArrayPrototype.some));
    var reduceCoercesToObject = !1;
    ArrayPrototype.reduce && (reduceCoercesToObject = "object" == typeof ArrayPrototype.reduce.call("es5", function(_, __, ___, list) {
        return list;
    })), defineProperties(ArrayPrototype, {
        reduce: function(callbackfn) {
            var object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0;
            if (!isCallable(callbackfn)) throw new TypeError("Array.prototype.reduce callback must be a function");
            if (0 === length && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
            var result, i = 0;
            if (arguments.length >= 2) result = arguments[1]; else for (;;) {
                if (i in self) {
                    result = self[i++];
                    break;
                }
                if (++i >= length) throw new TypeError("reduce of empty array with no initial value");
            }
            for (;length > i; i++) i in self && (result = callbackfn(result, self[i], i, object));
            return result;
        }
    }, !reduceCoercesToObject);
    var reduceRightCoercesToObject = !1;
    ArrayPrototype.reduceRight && (reduceRightCoercesToObject = "object" == typeof ArrayPrototype.reduceRight.call("es5", function(_, __, ___, list) {
        return list;
    })), defineProperties(ArrayPrototype, {
        reduceRight: function(callbackfn) {
            var object = ES.ToObject(this), self = splitString && isString(this) ? strSplit(this, "") : object, length = self.length >>> 0;
            if (!isCallable(callbackfn)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
            if (0 === length && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
            var result, i = length - 1;
            if (arguments.length >= 2) result = arguments[1]; else for (;;) {
                if (i in self) {
                    result = self[i--];
                    break;
                }
                if (--i < 0) throw new TypeError("reduceRight of empty array with no initial value");
            }
            if (0 > i) return result;
            do i in self && (result = callbackfn(result, self[i], i, object)); while (i--);
            return result;
        }
    }, !reduceRightCoercesToObject);
    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && -1 !== [ 0, 1 ].indexOf(1, 2);
    defineProperties(ArrayPrototype, {
        indexOf: function(searchElement) {
            var self = splitString && isString(this) ? strSplit(this, "") : ES.ToObject(this), length = self.length >>> 0;
            if (0 === length) return -1;
            var i = 0;
            for (arguments.length > 1 && (i = ES.ToInteger(arguments[1])), i = i >= 0 ? i : max(0, length + i); length > i; i++) if (i in self && self[i] === searchElement) return i;
            return -1;
        }
    }, hasFirefox2IndexOfBug);
    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && -1 !== [ 0, 1 ].lastIndexOf(0, -3);
    defineProperties(ArrayPrototype, {
        lastIndexOf: function(searchElement) {
            var self = splitString && isString(this) ? strSplit(this, "") : ES.ToObject(this), length = self.length >>> 0;
            if (0 === length) return -1;
            var i = length - 1;
            for (arguments.length > 1 && (i = min(i, ES.ToInteger(arguments[1]))), i = i >= 0 ? i : length - Math.abs(i); i >= 0; i--) if (i in self && searchElement === self[i]) return i;
            return -1;
        }
    }, hasFirefox2LastIndexOfBug);
    var spliceNoopReturnsEmptyArray = function() {
        var a = [ 1, 2 ], result = a.splice();
        return 2 === a.length && isArray(result) && 0 === result.length;
    }();
    defineProperties(ArrayPrototype, {
        splice: function(start, deleteCount) {
            return 0 === arguments.length ? [] : array_splice.apply(this, arguments);
        }
    }, !spliceNoopReturnsEmptyArray);
    var spliceWorksWithEmptyObject = function() {
        var obj = {};
        return ArrayPrototype.splice.call(obj, 0, 0, 1), 1 === obj.length;
    }();
    defineProperties(ArrayPrototype, {
        splice: function(start, deleteCount) {
            if (0 === arguments.length) return [];
            var args = arguments;
            return this.length = max(ES.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof deleteCount && (args = array_slice.call(arguments), 
            args.length < 2 ? array_push.call(args, this.length - start) : args[1] = ES.ToInteger(deleteCount)), 
            array_splice.apply(this, args);
        }
    }, !spliceWorksWithEmptyObject);
    var spliceWorksWithLargeSparseArrays = function() {
        var arr = new $Array(1e5);
        return arr[8] = "x", arr.splice(1, 1), 7 === arr.indexOf("x");
    }(), spliceWorksWithSmallSparseArrays = function() {
        var n = 256, arr = [];
        return arr[n] = "a", arr.splice(n + 1, 0, "b"), "a" === arr[n];
    }();
    defineProperties(ArrayPrototype, {
        splice: function(start, deleteCount) {
            for (var from, O = ES.ToObject(this), A = [], len = ES.ToUint32(O.length), relativeStart = ES.ToInteger(start), actualStart = 0 > relativeStart ? max(len + relativeStart, 0) : min(relativeStart, len), actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart), k = 0; actualDeleteCount > k; ) from = $String(actualStart + k), 
            owns(O, from) && (A[k] = O[from]), k += 1;
            var to, items = array_slice.call(arguments, 2), itemCount = items.length;
            if (actualDeleteCount > itemCount) {
                for (k = actualStart; len - actualDeleteCount > k; ) from = $String(k + actualDeleteCount), 
                to = $String(k + itemCount), owns(O, from) ? O[to] = O[from] : delete O[to], k += 1;
                for (k = len; k > len - actualDeleteCount + itemCount; ) delete O[k - 1], k -= 1;
            } else if (itemCount > actualDeleteCount) for (k = len - actualDeleteCount; k > actualStart; ) from = $String(k + actualDeleteCount - 1), 
            to = $String(k + itemCount - 1), owns(O, from) ? O[to] = O[from] : delete O[to], 
            k -= 1;
            k = actualStart;
            for (var i = 0; i < items.length; ++i) O[k] = items[i], k += 1;
            return O.length = len - actualDeleteCount + itemCount, A;
        }
    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);
    var hasDontEnumBug = !{
        toString: null
    }.propertyIsEnumerable("toString"), hasProtoEnumBug = function() {}.propertyIsEnumerable("prototype"), hasStringEnumBug = !owns("x", "0"), equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    }, blacklistedKeys = {
        $window: !0,
        $console: !0,
        $parent: !0,
        $self: !0,
        $frames: !0,
        $frameElement: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0
    }, hasAutomationEqualityBug = function() {
        if ("undefined" == typeof window) return !1;
        for (var k in window) if (!blacklistedKeys["$" + k] && owns(window, k) && null !== window[k] && "object" == typeof window[k]) try {
            equalsConstructorPrototype(window[k]);
        } catch (e) {
            return !0;
        }
        return !1;
    }(), equalsConstructorPrototypeIfNotBuggy = function(object) {
        if ("undefined" == typeof window || !hasAutomationEqualityBug) return equalsConstructorPrototype(object);
        try {
            return equalsConstructorPrototype(object);
        } catch (e) {
            return !1;
        }
    }, dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], dontEnumsLength = dontEnums.length, isStandardArguments = function(value) {
        return "[object Arguments]" === toStr(value);
    }, isLegacyArguments = function(value) {
        return null !== value && "object" == typeof value && "number" == typeof value.length && value.length >= 0 && !isArray(value) && isCallable(value.callee);
    }, isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
    defineProperties($Object, {
        keys: function(object) {
            var isFn = isCallable(object), isArgs = isArguments(object), isObject = null !== object && "object" == typeof object, isStr = isObject && isString(object);
            if (!isObject && !isFn && !isArgs) throw new TypeError("Object.keys called on a non-object");
            var theKeys = [], skipProto = hasProtoEnumBug && isFn;
            if (isStr && hasStringEnumBug || isArgs) for (var i = 0; i < object.length; ++i) array_push.call(theKeys, $String(i));
            if (!isArgs) for (var name in object) skipProto && "prototype" === name || !owns(object, name) || array_push.call(theKeys, $String(name));
            if (hasDontEnumBug) for (var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object), j = 0; dontEnumsLength > j; j++) {
                var dontEnum = dontEnums[j];
                skipConstructor && "constructor" === dontEnum || !owns(object, dontEnum) || array_push.call(theKeys, dontEnum);
            }
            return theKeys;
        }
    });
    var keysWorksWithArguments = $Object.keys && function() {
        return 2 === $Object.keys(arguments).length;
    }(1, 2), keysHasArgumentsLengthBug = $Object.keys && function() {
        var argKeys = $Object.keys(arguments);
        return 1 !== arguments.length || 1 !== argKeys.length || 1 !== argKeys[0];
    }(1), originalKeys = $Object.keys;
    defineProperties($Object, {
        keys: function(object) {
            return originalKeys(isArguments(object) ? array_slice.call(object) : object);
        }
    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);
    var negativeDate = -621987552e5, negativeYearString = "-000001", hasNegativeDateBug = Date.prototype.toISOString && -1 === new Date(negativeDate).toISOString().indexOf(negativeYearString), hasSafari51DateBug = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString();
    defineProperties(Date.prototype, {
        toISOString: function() {
            var result, length, value, year, month;
            if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
            for (year = this.getUTCFullYear(), month = this.getUTCMonth(), year += Math.floor(month / 12), 
            month = (month % 12 + 12) % 12, result = [ month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ], 
            year = (0 > year ? "-" : year > 9999 ? "+" : "") + strSlice("00000" + Math.abs(year), year >= 0 && 9999 >= year ? -4 : -6), 
            length = result.length; length--; ) value = result[length], 10 > value && (result[length] = "0" + value);
            return year + "-" + array_slice.call(result, 0, 2).join("-") + "T" + array_slice.call(result, 2).join(":") + "." + strSlice("000" + this.getUTCMilliseconds(), -3) + "Z";
        }
    }, hasNegativeDateBug || hasSafari51DateBug);
    var dateToJSONIsSupported = function() {
        try {
            return Date.prototype.toJSON && null === new Date(NaN).toJSON() && -1 !== new Date(negativeDate).toJSON().indexOf(negativeYearString) && Date.prototype.toJSON.call({
                toISOString: function() {
                    return !0;
                }
            });
        } catch (e) {
            return !1;
        }
    }();
    dateToJSONIsSupported || (Date.prototype.toJSON = function(key) {
        var O = $Object(this), tv = ES.ToPrimitive(O);
        if ("number" == typeof tv && !isFinite(tv)) return null;
        var toISO = O.toISOString;
        if (!isCallable(toISO)) throw new TypeError("toISOString property is not callable");
        return toISO.call(O);
    });
    var supportsExtendedYears = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"), acceptsInvalidDates = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")), doesNotParseY2KNewYear = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) && (Date = function(NativeDate) {
        var DateShim = function(Y, M, D, h, m, s, ms) {
            var date, length = arguments.length;
            return date = this instanceof NativeDate ? 1 === length && $String(Y) === Y ? new NativeDate(DateShim.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) : length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate() : NativeDate.apply(this, arguments), 
            isPrimitive(date) || defineProperties(date, {
                constructor: DateShim
            }, !0), date;
        }, isoDateExpression = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), months = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ], dayFromMonth = function(year, month) {
            var t = month > 1 ? 1 : 0;
            return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
        }, toUTC = function(t) {
            return $Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
        };
        for (var key in NativeDate) owns(NativeDate, key) && (DateShim[key] = NativeDate[key]);
        defineProperties(DateShim, {
            now: NativeDate.now,
            UTC: NativeDate.UTC
        }, !0), DateShim.prototype = NativeDate.prototype, defineProperties(DateShim.prototype, {
            constructor: DateShim
        }, !0);
        var parseShim = function(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                var result, year = $Number(match[1]), month = $Number(match[2] || 1) - 1, day = $Number(match[3] || 1) - 1, hour = $Number(match[4] || 0), minute = $Number(match[5] || 0), second = $Number(match[6] || 0), millisecond = Math.floor(1e3 * $Number(match[7] || 0)), isLocalTime = Boolean(match[4] && !match[8]), signOffset = "-" === match[9] ? 1 : -1, hourOffset = $Number(match[10] || 0), minuteOffset = $Number(match[11] || 0);
                return (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) > hour && 60 > minute && 60 > second && 1e3 > millisecond && month > -1 && 12 > month && 24 > hourOffset && 60 > minuteOffset && day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month) && (result = 60 * (24 * (dayFromMonth(year, month) + day) + hour + hourOffset * signOffset), 
                result = 1e3 * (60 * (result + minute + minuteOffset * signOffset) + second) + millisecond, 
                isLocalTime && (result = toUTC(result)), result >= -864e13 && 864e13 >= result) ? result : NaN;
            }
            return NativeDate.parse.apply(this, arguments);
        };
        return defineProperties(DateShim, {
            parse: parseShim
        }), DateShim;
    }(Date)), Date.now || (Date.now = function() {
        return new Date().getTime();
    });
    var hasToFixedBugs = NumberPrototype.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)), toFixedHelpers = {
        base: 1e7,
        size: 6,
        data: [ 0, 0, 0, 0, 0, 0 ],
        multiply: function(n, c) {
            for (var i = -1, c2 = c; ++i < toFixedHelpers.size; ) c2 += n * toFixedHelpers.data[i], 
            toFixedHelpers.data[i] = c2 % toFixedHelpers.base, c2 = Math.floor(c2 / toFixedHelpers.base);
        },
        divide: function(n) {
            for (var i = toFixedHelpers.size, c = 0; --i >= 0; ) c += toFixedHelpers.data[i], 
            toFixedHelpers.data[i] = Math.floor(c / n), c = c % n * toFixedHelpers.base;
        },
        numToString: function() {
            for (var i = toFixedHelpers.size, s = ""; --i >= 0; ) if ("" !== s || 0 === i || 0 !== toFixedHelpers.data[i]) {
                var t = $String(toFixedHelpers.data[i]);
                "" === s ? s = t : s += strSlice("0000000", 0, 7 - t.length) + t;
            }
            return s;
        },
        pow: function pow(x, n, acc) {
            return 0 === n ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
        },
        log: function(x) {
            for (var n = 0, x2 = x; x2 >= 4096; ) n += 12, x2 /= 4096;
            for (;x2 >= 2; ) n += 1, x2 /= 2;
            return n;
        }
    };
    defineProperties(NumberPrototype, {
        toFixed: function(fractionDigits) {
            var f, x, s, m, e, z, j, k;
            if (f = $Number(fractionDigits), f = f !== f ? 0 : Math.floor(f), 0 > f || f > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (x = $Number(this), x !== x) return "NaN";
            if (-1e21 >= x || x >= 1e21) return $String(x);
            if (s = "", 0 > x && (s = "-", x = -x), m = "0", x > 1e-21) if (e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69, 
            z = 0 > e ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1), 
            z *= 4503599627370496, e = 52 - e, e > 0) {
                for (toFixedHelpers.multiply(0, z), j = f; j >= 7; ) toFixedHelpers.multiply(1e7, 0), 
                j -= 7;
                for (toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0), j = e - 1; j >= 23; ) toFixedHelpers.divide(1 << 23), 
                j -= 23;
                toFixedHelpers.divide(1 << j), toFixedHelpers.multiply(1, 1), toFixedHelpers.divide(2), 
                m = toFixedHelpers.numToString();
            } else toFixedHelpers.multiply(0, z), toFixedHelpers.multiply(1 << -e, 0), m = toFixedHelpers.numToString() + strSlice("0.00000000000000000000", 2, 2 + f);
            return f > 0 ? (k = m.length, m = f >= k ? s + strSlice("0.0000000000000000000", 0, f - k + 2) + m : s + strSlice(m, 0, k - f) + "." + strSlice(m, k - f)) : m = s + m, 
            m;
        }
    }, hasToFixedBugs), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function() {
        var compliantExecNpcg = "undefined" == typeof /()??/.exec("")[1];
        StringPrototype.split = function(separator, limit) {
            var string = this;
            if ("undefined" == typeof separator && 0 === limit) return [];
            if (!isRegex(separator)) return strSplit(this, separator, limit);
            var separator2, match, lastIndex, lastLength, output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separatorCopy = new RegExp(separator.source, flags + "g");
            string += "", compliantExecNpcg || (separator2 = new RegExp("^" + separatorCopy.source + "$(?!\\s)", flags));
            var splitLimit = "undefined" == typeof limit ? -1 >>> 0 : ES.ToUint32(limit);
            for (match = separatorCopy.exec(string); match && (lastIndex = match.index + match[0].length, 
            !(lastIndex > lastLastIndex && (array_push.call(output, strSlice(string, lastLastIndex, match.index)), 
            !compliantExecNpcg && match.length > 1 && match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) "undefined" == typeof arguments[i] && (match[i] = void 0);
            }), match.length > 1 && match.index < string.length && array_push.apply(output, array_slice.call(match, 1)), 
            lastLength = match[0].length, lastLastIndex = lastIndex, output.length >= splitLimit))); ) separatorCopy.lastIndex === match.index && separatorCopy.lastIndex++, 
            match = separatorCopy.exec(string);
            return lastLastIndex === string.length ? (lastLength || !separatorCopy.test("")) && array_push.call(output, "") : array_push.call(output, strSlice(string, lastLastIndex)), 
            output.length > splitLimit ? strSlice(output, 0, splitLimit) : output;
        };
    }() : "0".split(void 0, 0).length && (StringPrototype.split = function(separator, limit) {
        return "undefined" == typeof separator && 0 === limit ? [] : strSplit(this, separator, limit);
    });
    var str_replace = StringPrototype.replace, replaceReportsGroupsCorrectly = function() {
        var groups = [];
        return "x".replace(/x(.)?/g, function(match, group) {
            array_push.call(groups, group);
        }), 1 === groups.length && "undefined" == typeof groups[0];
    }();
    replaceReportsGroupsCorrectly || (StringPrototype.replace = function(searchValue, replaceValue) {
        var isFn = isCallable(replaceValue), hasCapturingGroups = isRegex(searchValue) && /\)[*?]/.test(searchValue.source);
        if (isFn && hasCapturingGroups) {
            var wrappedReplaceValue = function(match) {
                var length = arguments.length, originalLastIndex = searchValue.lastIndex;
                searchValue.lastIndex = 0;
                var args = searchValue.exec(match) || [];
                return searchValue.lastIndex = originalLastIndex, array_push.call(args, arguments[length - 2], arguments[length - 1]), 
                replaceValue.apply(this, args);
            };
            return str_replace.call(this, searchValue, wrappedReplaceValue);
        }
        return str_replace.call(this, searchValue, replaceValue);
    });
    var string_substr = StringPrototype.substr, hasNegativeSubstrBug = "".substr && "b" !== "0b".substr(-1);
    defineProperties(StringPrototype, {
        substr: function(start, length) {
            var normalizedStart = start;
            return 0 > start && (normalizedStart = max(this.length + start, 0)), string_substr.call(this, normalizedStart, length);
        }
    }, hasNegativeSubstrBug);
    var ws = "	\n\f\r   ᠎             　\u2028\u2029\ufeff", zeroWidth = "​", wsRegexChars = "[" + ws + "]", trimBeginRegexp = new RegExp("^" + wsRegexChars + wsRegexChars + "*"), trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + "*$"), hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
    defineProperties(StringPrototype, {
        trim: function() {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            return $String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
        }
    }, hasTrimWhitespaceBug), (8 !== parseInt(ws + "08") || 22 !== parseInt(ws + "0x16")) && (parseInt = function(origParseInt) {
        var hexRegex = /^0[xX]/;
        return function(str, radix) {
            var string = $String(str).trim(), defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
            return origParseInt(string, defaultedRadix);
        };
    }(parseInt));
}), function() {
    function runInContext(context, exports) {
        function has(name) {
            if (has[name] !== undef) return has[name];
            var isSupported;
            if ("bug-string-char-index" == name) isSupported = "a" != "a"[0]; else if ("json" == name) isSupported = has("json-stringify") && has("json-parse"); else {
                var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if ("json-stringify" == name) {
                    var stringify = exports.stringify, stringifySupported = "function" == typeof stringify && isExtended;
                    if (stringifySupported) {
                        (value = function() {
                            return 1;
                        }).toJSON = value;
                        try {
                            stringifySupported = "0" === stringify(0) && "0" === stringify(new Number()) && '""' == stringify(new String()) && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && "1" === stringify(value) && "[1]" == stringify([ value ]) && "[null]" == stringify([ undef ]) && "null" == stringify(null) && "[null,null,null]" == stringify([ undef, getClass, null ]) && stringify({
                                a: [ value, !0, !1, null, "\x00\b\n\f\r	" ]
                            }) == serialized && "1" === stringify(null, value) && "[\n 1,\n 2\n]" == stringify([ 1, 2 ], null, 1) && '"-271821-04-20T00:00:00.000Z"' == stringify(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == stringify(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == stringify(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == stringify(new Date(-1));
                        } catch (exception) {
                            stringifySupported = !1;
                        }
                    }
                    isSupported = stringifySupported;
                }
                if ("json-parse" == name) {
                    var parse = exports.parse;
                    if ("function" == typeof parse) try {
                        if (0 === parse("0") && !parse(!1)) {
                            value = parse(serialized);
                            var parseSupported = 5 == value.a.length && 1 === value.a[0];
                            if (parseSupported) {
                                try {
                                    parseSupported = !parse('"	"');
                                } catch (exception) {}
                                if (parseSupported) try {
                                    parseSupported = 1 !== parse("01");
                                } catch (exception) {}
                                if (parseSupported) try {
                                    parseSupported = 1 !== parse("1.");
                                } catch (exception) {}
                            }
                        }
                    } catch (exception) {
                        parseSupported = !1;
                    }
                    isSupported = parseSupported;
                }
            }
            return has[name] = !!isSupported;
        }
        context || (context = root.Object()), exports || (exports = root.Object());
        var Number = context.Number || root.Number, String = context.String || root.String, Object = context.Object || root.Object, Date = context.Date || root.Date, SyntaxError = context.SyntaxError || root.SyntaxError, TypeError = context.TypeError || root.TypeError, Math = context.Math || root.Math, nativeJSON = context.JSON || root.JSON;
        "object" == typeof nativeJSON && nativeJSON && (exports.stringify = nativeJSON.stringify, 
        exports.parse = nativeJSON.parse);
        var isProperty, forEach, undef, objectProto = Object.prototype, getClass = objectProto.toString, isExtended = new Date(-0xc782b5b800cec);
        try {
            isExtended = -109252 == isExtended.getUTCFullYear() && 0 === isExtended.getUTCMonth() && 1 === isExtended.getUTCDate() && 10 == isExtended.getUTCHours() && 37 == isExtended.getUTCMinutes() && 6 == isExtended.getUTCSeconds() && 708 == isExtended.getUTCMilliseconds();
        } catch (exception) {}
        if (!has("json")) {
            var functionClass = "[object Function]", dateClass = "[object Date]", numberClass = "[object Number]", stringClass = "[object String]", arrayClass = "[object Array]", booleanClass = "[object Boolean]", charIndexBuggy = has("bug-string-char-index");
            if (!isExtended) var floor = Math.floor, Months = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], getDay = function(year, month) {
                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
            if ((isProperty = objectProto.hasOwnProperty) || (isProperty = function(property) {
                var constructor, members = {};
                return (members.__proto__ = null, members.__proto__ = {
                    toString: 1
                }, members).toString != getClass ? isProperty = function(property) {
                    var original = this.__proto__, result = property in (this.__proto__ = null, this);
                    return this.__proto__ = original, result;
                } : (constructor = members.constructor, isProperty = function(property) {
                    var parent = (this.constructor || constructor).prototype;
                    return property in this && !(property in parent && this[property] === parent[property]);
                }), members = null, isProperty.call(this, property);
            }), forEach = function(object, callback) {
                var Properties, members, property, size = 0;
                (Properties = function() {
                    this.valueOf = 0;
                }).prototype.valueOf = 0, members = new Properties();
                for (property in members) isProperty.call(members, property) && size++;
                return Properties = members = null, size ? forEach = 2 == size ? function(object, callback) {
                    var property, members = {}, isFunction = getClass.call(object) == functionClass;
                    for (property in object) isFunction && "prototype" == property || isProperty.call(members, property) || !(members[property] = 1) || !isProperty.call(object, property) || callback(property);
                } : function(object, callback) {
                    var property, isConstructor, isFunction = getClass.call(object) == functionClass;
                    for (property in object) isFunction && "prototype" == property || !isProperty.call(object, property) || (isConstructor = "constructor" === property) || callback(property);
                    (isConstructor || isProperty.call(object, property = "constructor")) && callback(property);
                } : (members = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ], 
                forEach = function(object, callback) {
                    var property, length, isFunction = getClass.call(object) == functionClass, hasProperty = !isFunction && "function" != typeof object.constructor && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                    for (property in object) isFunction && "prototype" == property || !hasProperty.call(object, property) || callback(property);
                    for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) ;
                }), forEach(object, callback);
            }, !has("json-stringify")) {
                var Escapes = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                }, leadingZeroes = "000000", toPaddedString = function(width, value) {
                    return (leadingZeroes + (value || 0)).slice(-width);
                }, unicodePrefix = "\\u00", quote = function(value) {
                    for (var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10, symbols = useCharIndex && (charIndexBuggy ? value.split("") : value); length > index; index++) {
                        var charCode = value.charCodeAt(index);
                        switch (charCode) {
                          case 8:
                          case 9:
                          case 10:
                          case 12:
                          case 13:
                          case 34:
                          case 92:
                            result += Escapes[charCode];
                            break;

                          default:
                            if (32 > charCode) {
                                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                                break;
                            }
                            result += useCharIndex ? symbols[index] : value.charAt(index);
                        }
                    }
                    return result + '"';
                }, serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
                    var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                    try {
                        value = object[property];
                    } catch (exception) {}
                    if ("object" == typeof value && value) if (className = getClass.call(value), className != dateClass || isProperty.call(value, "toJSON")) "function" == typeof value.toJSON && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, "toJSON")) && (value = value.toJSON(property)); else if (value > -1 / 0 && 1 / 0 > value) {
                        if (getDay) {
                            for (date = floor(value / 864e5), year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) ;
                            for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) ;
                            date = 1 + date - getDay(year, month), time = (value % 864e5 + 864e5) % 864e5, hours = floor(time / 36e5) % 24, 
                            minutes = floor(time / 6e4) % 60, seconds = floor(time / 1e3) % 60, milliseconds = time % 1e3;
                        } else year = value.getUTCFullYear(), month = value.getUTCMonth(), date = value.getUTCDate(), 
                        hours = value.getUTCHours(), minutes = value.getUTCMinutes(), seconds = value.getUTCSeconds(), 
                        milliseconds = value.getUTCMilliseconds();
                        value = (0 >= year || year >= 1e4 ? (0 > year ? "-" : "+") + toPaddedString(6, 0 > year ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z";
                    } else value = null;
                    if (callback && (value = callback.call(object, property, value)), null === value) return "null";
                    if (className = getClass.call(value), className == booleanClass) return "" + value;
                    if (className == numberClass) return value > -1 / 0 && 1 / 0 > value ? "" + value : "null";
                    if (className == stringClass) return quote("" + value);
                    if ("object" == typeof value) {
                        for (length = stack.length; length--; ) if (stack[length] === value) throw TypeError();
                        if (stack.push(value), results = [], prefix = indentation, indentation += whitespace, 
                        className == arrayClass) {
                            for (index = 0, length = value.length; length > index; index++) element = serialize(index, value, callback, properties, whitespace, indentation, stack), 
                            results.push(element === undef ? "null" : element);
                            result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                        } else forEach(properties || value, function(property) {
                            var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                            element !== undef && results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                        }), result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                        return stack.pop(), result;
                    }
                };
                exports.stringify = function(source, filter, width) {
                    var whitespace, callback, properties, className;
                    if (objectTypes[typeof filter] && filter) if ((className = getClass.call(filter)) == functionClass) callback = filter; else if (className == arrayClass) {
                        properties = {};
                        for (var value, index = 0, length = filter.length; length > index; value = filter[index++], 
                        className = getClass.call(value), (className == stringClass || className == numberClass) && (properties[value] = 1)) ;
                    }
                    if (width) if ((className = getClass.call(width)) == numberClass) {
                        if ((width -= width % 1) > 0) for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") ;
                    } else className == stringClass && (whitespace = width.length <= 10 ? width : width.slice(0, 10));
                    return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                };
            }
            if (!has("json-parse")) {
                var Index, Source, fromCharCode = String.fromCharCode, Unescapes = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "	",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                }, abort = function() {
                    throw Index = Source = null, SyntaxError();
                }, lex = function() {
                    for (var value, begin, position, isSigned, charCode, source = Source, length = source.length; length > Index; ) switch (charCode = source.charCodeAt(Index)) {
                      case 9:
                      case 10:
                      case 13:
                      case 32:
                        Index++;
                        break;

                      case 123:
                      case 125:
                      case 91:
                      case 93:
                      case 58:
                      case 44:
                        return value = charIndexBuggy ? source.charAt(Index) : source[Index], Index++, value;

                      case 34:
                        for (value = "@", Index++; length > Index; ) if (charCode = source.charCodeAt(Index), 
                        32 > charCode) abort(); else if (92 == charCode) switch (charCode = source.charCodeAt(++Index)) {
                          case 92:
                          case 34:
                          case 47:
                          case 98:
                          case 116:
                          case 110:
                          case 102:
                          case 114:
                            value += Unescapes[charCode], Index++;
                            break;

                          case 117:
                            for (begin = ++Index, position = Index + 4; position > Index; Index++) charCode = source.charCodeAt(Index), 
                            charCode >= 48 && 57 >= charCode || charCode >= 97 && 102 >= charCode || charCode >= 65 && 70 >= charCode || abort();
                            value += fromCharCode("0x" + source.slice(begin, Index));
                            break;

                          default:
                            abort();
                        } else {
                            if (34 == charCode) break;
                            for (charCode = source.charCodeAt(Index), begin = Index; charCode >= 32 && 92 != charCode && 34 != charCode; ) charCode = source.charCodeAt(++Index);
                            value += source.slice(begin, Index);
                        }
                        if (34 == source.charCodeAt(Index)) return Index++, value;
                        abort();

                      default:
                        if (begin = Index, 45 == charCode && (isSigned = !0, charCode = source.charCodeAt(++Index)), 
                        charCode >= 48 && 57 >= charCode) {
                            for (48 == charCode && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && 57 >= charCode) && abort(), 
                            isSigned = !1; length > Index && (charCode = source.charCodeAt(Index), charCode >= 48 && 57 >= charCode); Index++) ;
                            if (46 == source.charCodeAt(Index)) {
                                for (position = ++Index; length > position && (charCode = source.charCodeAt(position), 
                                charCode >= 48 && 57 >= charCode); position++) ;
                                position == Index && abort(), Index = position;
                            }
                            if (charCode = source.charCodeAt(Index), 101 == charCode || 69 == charCode) {
                                for (charCode = source.charCodeAt(++Index), (43 == charCode || 45 == charCode) && Index++, 
                                position = Index; length > position && (charCode = source.charCodeAt(position), 
                                charCode >= 48 && 57 >= charCode); position++) ;
                                position == Index && abort(), Index = position;
                            }
                            return +source.slice(begin, Index);
                        }
                        if (isSigned && abort(), "true" == source.slice(Index, Index + 4)) return Index += 4, 
                        !0;
                        if ("false" == source.slice(Index, Index + 5)) return Index += 5, !1;
                        if ("null" == source.slice(Index, Index + 4)) return Index += 4, null;
                        abort();
                    }
                    return "$";
                }, get = function(value) {
                    var results, hasMembers;
                    if ("$" == value && abort(), "string" == typeof value) {
                        if ("@" == (charIndexBuggy ? value.charAt(0) : value[0])) return value.slice(1);
                        if ("[" == value) {
                            for (results = []; value = lex(), "]" != value; hasMembers || (hasMembers = !0)) hasMembers && ("," == value ? (value = lex(), 
                            "]" == value && abort()) : abort()), "," == value && abort(), results.push(get(value));
                            return results;
                        }
                        if ("{" == value) {
                            for (results = {}; value = lex(), "}" != value; hasMembers || (hasMembers = !0)) hasMembers && ("," == value ? (value = lex(), 
                            "}" == value && abort()) : abort()), ("," == value || "string" != typeof value || "@" != (charIndexBuggy ? value.charAt(0) : value[0]) || ":" != lex()) && abort(), 
                            results[value.slice(1)] = get(lex());
                            return results;
                        }
                        abort();
                    }
                    return value;
                }, update = function(source, property, callback) {
                    var element = walk(source, property, callback);
                    element === undef ? delete source[property] : source[property] = element;
                }, walk = function(source, property, callback) {
                    var length, value = source[property];
                    if ("object" == typeof value && value) if (getClass.call(value) == arrayClass) for (length = value.length; length--; ) update(value, length, callback); else forEach(value, function(property) {
                        update(value, property, callback);
                    });
                    return callback.call(source, property, value);
                };
                exports.parse = function(source, callback) {
                    var result, value;
                    return Index = 0, Source = "" + source, result = get(lex()), "$" != lex() && abort(), 
                    Index = Source = null, callback && getClass.call(callback) == functionClass ? walk((value = {}, 
                    value[""] = result, value), "", callback) : result;
                };
            }
        }
        return exports.runInContext = runInContext, exports;
    }
    var isLoader = "function" == typeof define && define.amd, objectTypes = {
        "function": !0,
        object: !0
    }, freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports, root = objectTypes[typeof window] && window || this, freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    if (!freeGlobal || freeGlobal.global !== freeGlobal && freeGlobal.window !== freeGlobal && freeGlobal.self !== freeGlobal || (root = freeGlobal), 
    freeExports && !isLoader) runInContext(root, freeExports); else {
        var nativeJSON = root.JSON, previousJSON = root.JSON3, isRestored = !1, JSON3 = runInContext(root, root.JSON3 = {
            noConflict: function() {
                return isRestored || (isRestored = !0, root.JSON = nativeJSON, root.JSON3 = previousJSON, 
                nativeJSON = previousJSON = null), JSON3;
            }
        });
        root.JSON = {
            parse: JSON3.parse,
            stringify: JSON3.stringify
        };
    }
    isLoader && define(function() {
        return JSON3;
    });
}.call(this);