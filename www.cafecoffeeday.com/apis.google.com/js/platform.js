(function() {
    var m, aa = function(a) {
            var b = 0;
            return function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            }
        },
        ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a
        },
        ca = function(a) {
            a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
            for (var b = 0; b < a.length; ++b) {
                var c = a[b];
                if (c && c.Math == Math) return c
            }
            throw Error("Cannot find global object");
        },
        da = ca(this),
        q = function(a, b) {
            if (b) a: {
                var c = da;a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e]
                }
                a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        };
    q("Symbol", function(a) {
        if (a) return a;
        var b = function(f, g) {
            this.da = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        };
        b.prototype.toString = function() {
            return this.da
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            d = 0,
            e = function(f) {
                if (this instanceof e) throw new TypeError("Symbol is not a constructor");
                return new b(c + (f || "") + "_" + d++, f)
            };
        return e
    });
    q("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = da[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ea(aa(this))
                }
            })
        }
        return a
    });
    var ea = function(a) {
            a = {
                next: a
            };
            a[Symbol.iterator] = function() {
                return this
            };
            return a
        },
        ia = function(a, b, c) {
            if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
            return a + ""
        };
    q("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            var d = ia(this, b, "endsWith");
            b += "";
            void 0 === c && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var e = b.length; 0 < e && 0 < c;)
                if (d[--c] != b[--e]) return !1;
            return 0 >= e
        }
    });
    var ja = function(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function() {
                    if (!d && c < a.length) {
                        var f = c++;
                        return {
                            value: b(f, a[f]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        e[Symbol.iterator] = function() {
            return e
        };
        return e
    };
    q("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return ja(this, function(b) {
                return b
            })
        }
    });
    q("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    });
    q("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || Object.is(f, b)) return !0
            }
            return !1
        }
    });
    q("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== ia(this, b, "includes").indexOf(b, c || 0)
        }
    });
    window.gapi = window.gapi || {};
    window.gapi.ma = (new Date).getTime();
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var t = this || self,
        ka = function(a) {
            var b = typeof a;
            return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
        },
        la = function(a) {
            var b = ka(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        ma = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        na = "closure_uid_" + (1E9 * Math.random() >>> 0),
        oa = 0,
        pa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        qa = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(e, d);
                    return a.apply(b, e)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        ra = function(a, b, c) {
            ra = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : qa;
            return ra.apply(null, arguments)
        },
        sa = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.ra = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.B = function(d, e, f) {
                for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
                return b.prototype[e].apply(d,
                    g)
            }
        },
        ta = function(a) {
            return a
        },
        ua = function(a) {
            var b = null,
                c = t.trustedTypes;
            if (!c || !c.createPolicy) return b;
            try {
                b = c.createPolicy(a, {
                    createHTML: ta,
                    createScript: ta,
                    createScriptURL: ta
                })
            } catch (d) {
                t.console && t.console.error(d.message)
            }
            return b
        };

    function va(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, va);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    sa(va, Error);
    va.prototype.name = "CustomError";
    var wa;

    function xa(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        va.call(this, c + a[d])
    }
    sa(xa, va);
    xa.prototype.name = "AssertionError";

    function ya(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new xa("" + e, f || []);
    }
    var za = function(a, b, c) {
            a || ya("", null, b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        Aa = function(a, b) {
            throw new xa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
        },
        Ba = function(a, b, c) {
            "string" !== typeof a && ya("Expected string but got %s: %s.", [ka(a), a], b, Array.prototype.slice.call(arguments, 2))
        };
    var Ca = Array.prototype.forEach ? function(a, b) {
        za(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function(a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    };

    function Ea(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    /*

     SPDX-License-Identifier: Apache-2.0
    */
    function Fa(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    };
    var Ga;
    var v = function(a, b) {
        this.S = a === Ha && b || "";
        this.ea = Ia
    };
    v.prototype.F = !0;
    v.prototype.D = function() {
        return this.S
    };
    v.prototype.toString = function() {
        return "Const{" + this.S + "}"
    };
    var Ja = function(a) {
            if (a instanceof v && a.constructor === v && a.ea === Ia) return a.S;
            Aa("expected object of type Const, got '" + a + "'");
            return "type_error:Const"
        },
        Ia = {},
        Ha = {};
    var w = function(a, b) {
        this.P = b === Ka ? a : ""
    };
    w.prototype.toString = function() {
        return this.P.toString()
    };
    w.prototype.F = !0;
    w.prototype.D = function() {
        return this.P.toString()
    };
    var La = function(a) {
            if (a instanceof w && a.constructor === w) return a.P;
            Aa("expected object of type SafeUrl, got '" + a + "' of type " + ka(a));
            return "type_error:SafeUrl"
        },
        Ma = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Na = function(a) {
            if (a instanceof w) return a;
            a = "object" == typeof a && a.F ? a.D() : String(a);
            za(Ma.test(a), "%s does not match the safe URL pattern", a) || (a = "about:invalid#zClosurez");
            return new w(a, Ka)
        },
        Ka = {};
    var Oa = {},
        Pa = function(a, b) {
            this.O = b === Oa ? a : "";
            this.F = !0
        };
    Pa.prototype.D = function() {
        return this.O.toString()
    };
    Pa.prototype.toString = function() {
        return this.O.toString()
    };
    var Qa = function(a, b) {
        a: {
            try {
                var c = a && a.ownerDocument,
                    d = c && (c.defaultView || c.parentWindow);
                d = d || t;
                if (d.Element && d.Location) {
                    var e = d;
                    break a
                }
            } catch (g) {}
            e = null
        }
        if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
            if (ma(a)) try {
                var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a)
            } catch (g) {
                f = "<object could not be stringified>"
            } else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
            Aa("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
                b, f)
        }
        return a
    };
    var Sa = function(a, b) {
            Fa(b, function(c, d) {
                c && "object" == typeof c && c.F && (c = c.D());
                "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Ra.hasOwnProperty(d) ? a.setAttribute(Ra[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        },
        Ra = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        Ta = function(a, b, c, d) {
            function e(k) {
                k && b.appendChild("string" === typeof k ? a.createTextNode(k) : k)
            }
            for (; d < c.length; d++) {
                var f = c[d];
                if (!la(f) || ma(f) && 0 < f.nodeType) e(f);
                else {
                    a: {
                        if (f && "number" == typeof f.length) {
                            if (ma(f)) {
                                var g = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" === typeof f) {
                                g = "function" == typeof f.item;
                                break a
                            }
                        }
                        g = !1
                    }
                    Ca(g ? Ea(f) : f, e)
                }
            }
        },
        Ua = function(a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        },
        Va =
        function(a) {
            za(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Wa = function(a) {
            this.C = a || t.document || document
        };
    m = Wa.prototype;
    m.getElementsByTagName = function(a, b) {
        return (b || this.C).getElementsByTagName(String(a))
    };
    m.ha = function(a, b, c) {
        var d = this.C,
            e = arguments,
            f = e[1],
            g = Ua(d, String(e[0]));
        f && ("string" === typeof f ? g.className = f : Array.isArray(f) ? g.className = f.join(" ") : Sa(g, f));
        2 < e.length && Ta(d, g, e, 2);
        return g
    };
    m.createElement = function(a) {
        return Ua(this.C, a)
    };
    m.createTextNode = function(a) {
        return this.C.createTextNode(String(a))
    };
    m.appendChild = function(a, b) {
        za(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
        a.appendChild(b)
    };
    m.append = function(a, b) {
        Ta(Va(a), a, arguments, 1)
    };
    m.canHaveChildren = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    m.removeNode = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    m.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    var x = window,
        y = document,
        Xa = x.location,
        Ya = function() {},
        $a = /\[native code\]/,
        B = function(a, b, c) {
            return a[b] = a[b] || c
        },
        ab = function(a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return b;
            return -1
        },
        bb = function(a) {
            a = a.sort();
            for (var b = [], c = void 0, d = 0; d < a.length; d++) {
                var e = a[d];
                e != c && b.push(e);
                c = e
            }
            return b
        },
        cb = /&/g,
        db = /</g,
        eb = />/g,
        fb = /"/g,
        gb = /'/g,
        hb = function(a) {
            return String(a).replace(cb, "&amp;").replace(db, "&lt;").replace(eb, "&gt;").replace(fb, "&quot;").replace(gb, "&#39;")
        },
        C = function() {
            var a;
            if ((a = Object.create) &&
                $a.test(a)) a = a(null);
            else {
                a = {};
                for (var b in a) a[b] = void 0
            }
            return a
        },
        D = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        ib = function(a) {
            if ($a.test(Object.keys)) return Object.keys(a);
            var b = [],
                c;
            for (c in a) D(a, c) && b.push(c);
            return b
        },
        E = function(a, b) {
            a = a || {};
            for (var c in a) D(a, c) && (b[c] = a[c])
        },
        jb = function(a) {
            return function() {
                x.setTimeout(a, 0)
            }
        },
        F = function(a, b) {
            if (!a) throw Error(b || "");
        },
        G = B(x, "gapi", {});
    var H = function(a, b, c) {
            var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
            b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
            if (a = a && (d.exec(a) || b.exec(a))) try {
                c = decodeURIComponent(a[2])
            } catch (e) {}
            return c
        },
        kb = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source),
        lb = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
        mb = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
            "g"),
        nb = /%([a-f]|[0-9a-fA-F][a-f])/g,
        ob = /^(https?|ftp|file|chrome-extension):$/i,
        pb = function(a) {
            a = String(a);
            a = a.replace(lb, function(e) {
                try {
                    return encodeURIComponent(e)
                } catch (f) {
                    return encodeURIComponent(e.replace(/^[^%]+$/g, "\ufffd"))
                }
            }).replace(mb, function(e) {
                return e.replace(/%/g, "%25")
            }).replace(nb, function(e) {
                return e.toUpperCase()
            });
            a = a.match(kb) || [];
            var b = C(),
                c = function(e) {
                    return e.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g,
                        "%7D")
                },
                d = !!(a[1] || "").match(ob);
            b.B = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
            d = function(e) {
                return c(e.replace(/\?/g, "%3F").replace(/#/g, "%23"))
            };
            b.query = a[5] ? [d(a[5])] : [];
            b.j = a[7] ? [d(a[7])] : [];
            return b
        },
        qb = function(a) {
            return a.B + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.j.length ? "#" + a.j.join("&") : "")
        },
        rb = function(a, b) {
            var c = [];
            if (a)
                for (var d in a)
                    if (D(a, d) && null != a[d]) {
                        var e = b ? b(a[d]) : a[d];
                        c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                    }
            return c
        },
        sb = function(a, b, c, d) {
            a = pb(a);
            a.query.push.apply(a.query, rb(b, d));
            a.j.push.apply(a.j, rb(c, d));
            return qb(a)
        },
        tb = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i"),
        ub = function(a, b) {
            var c = pb(b);
            b = c.B;
            c.query.length && (b += "?" + c.query.join(""));
            c.j.length && (b += "#" + c.j.join(""));
            var d = "";
            2E3 < b.length && (d = b, b = b.substr(0, 2E3), b = b.replace(tb, ""), d = d.substr(b.length));
            var e = a.createElement("div");
            a = a.createElement("a");
            c = pb(b);
            b = c.B;
            c.query.length && (b += "?" + c.query.join(""));
            c.j.length && (b += "#" + c.j.join(""));
            b = new w(b, Ka);
            Qa(a, "HTMLAnchorElement");
            b = b instanceof w ? b : Na(b);
            a.href = La(b);
            e.appendChild(a);
            b = e.innerHTML;
            c = new v(Ha, "Assignment to self.");
            Ba(Ja(c), "must provide justification");
            za(!/^[\s\xa0]*$/.test(Ja(c)), "must provide non-empty justification");
            void 0 === Ga && (Ga = ua("gapi#html"));
            b = (c = Ga) ? c.createHTML(b) : b;
            b = new Pa(b, Oa);
            if (void 0 !== e.tagName) {
                if ("script" === e.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeScript.");
                if ("style" === e.tagName.toLowerCase()) throw Error("Use setTextContent with a SafeStyleSheet.");
            }
            b instanceof Pa && b.constructor === Pa ? b = b.O : (Aa("expected object of type SafeHtml, got '" + b + "' of type " + ka(b)), b = "type_error:SafeHtml");
            e.innerHTML = b;
            b = String(e.firstChild.href);
            e.parentNode && e.parentNode.removeChild(e);
            c = pb(b + d);
            d = c.B;
            c.query.length && (d += "?" + c.query.join(""));
            c.j.length && (d += "#" + c.j.join(""));
            return d
        },
        vb = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    var wb;
    var xb = function(a, b, c, d) {
            if (x[c + "EventListener"]) x[c + "EventListener"](a, b, !1);
            else if (x[d + "tachEvent"]) x[d + "tachEvent"]("on" + a, b)
        },
        yb = function() {
            var a = y.readyState;
            return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
        },
        Bb = function(a) {
            var b = zb;
            if (!yb()) try {
                b()
            } catch (c) {}
            Ab(a)
        },
        Ab = function(a) {
            if (yb()) a();
            else {
                var b = !1,
                    c = function() {
                        if (!b) return b = !0, a.apply(this, arguments)
                    };
                x.addEventListener ? (x.addEventListener("load", c, !1), x.addEventListener("DOMContentLoaded", c, !1)) : x.attachEvent &&
                    (x.attachEvent("onreadystatechange", function() {
                        yb() && c.apply(this, arguments)
                    }), x.attachEvent("onload", c))
            }
        },
        Cb = function(a) {
            for (; a.firstChild;) a.removeChild(a.firstChild)
        },
        Db = {
            button: !0,
            div: !0,
            span: !0
        };
    var I = {};
    I = B(x, "___jsl", C());
    B(I, "I", 0);
    B(I, "hel", 10);
    var Eb = function(a) {
            return I.dpo ? I.h : H(a, "jsh", I.h)
        },
        Fb = function(a) {
            var b = B(I, "sws", []);
            b.push.apply(b, a)
        },
        Gb = function(a) {
            return B(I, "watt", C())[a]
        },
        Hb = function(a) {
            var b = B(I, "PQ", []);
            I.PQ = [];
            var c = b.length;
            if (0 === c) a();
            else
                for (var d = 0, e = function() {
                        ++d === c && a()
                    }, f = 0; f < c; f++) b[f](e)
        },
        Ib = function(a) {
            return B(B(I, "H", C()), a, C())
        };
    var Jb = B(I, "perf", C()),
        Kb = B(Jb, "g", C()),
        Lb = B(Jb, "i", C());
    B(Jb, "r", []);
    C();
    C();
    var Mb = function(a, b, c) {
            var d = Jb.r;
            "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
        },
        K = function(a, b, c) {
            Kb[a] = !b && Kb[a] || c || (new Date).getTime();
            Mb(a)
        },
        Ob = function(a, b, c) {
            b && 0 < b.length && (b = Nb(b), c && 0 < c.length && (b += "___" + Nb(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = B(Lb, "_p", C()), B(b, c, C())[a] = (new Date).getTime(), Mb(a, "_p", c))
        },
        Nb = function(a) {
            return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/,/g, "_")
        };
    var Pb = C(),
        M = [],
        N = function(a) {
            throw Error("Bad hint: " + a);
        };
    M.push(["jsl", function(a) {
        for (var b in a)
            if (D(a, b)) {
                var c = a[b];
                "object" == typeof c ? I[b] = B(I, b, []).concat(c) : B(I, b, c)
            }
        if (b = a.u) a = B(I, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var Qb = /^(\/[a-zA-Z0-9_\-]+)+$/,
        Rb = [/\/amp\//, /\/amp$/, /^\/amp$/],
        Sb = /^[a-zA-Z0-9\-_\.,!]+$/,
        Tb = /^gapi\.loaded_[0-9]+$/,
        Ub = /^[a-zA-Z0-9,._-]+$/,
        Yb = function(a, b, c, d, e) {
            var f = a.split(";"),
                g = f.shift(),
                k = Pb[g],
                h = null;
            k ? h = k(f, b, c, d) : N("no hint processor for: " + g);
            h || N("failed to generate load url");
            b = h;
            c = b.match(Vb);
            (d = b.match(Wb)) && 1 === d.length && Xb.test(b) && c && 1 === c.length || N("failed sanity: " + a);
            try {
                a = "?";
                if (e && 0 < e.length) {
                    c = b = 0;
                    for (d = {}; c < e.length;) {
                        var l = e[c++];
                        f = void 0;
                        f = ma(l) ? "o" + (Object.prototype.hasOwnProperty.call(l,
                            na) && l[na] || (l[na] = ++oa)) : (typeof l).charAt(0) + l;
                        Object.prototype.hasOwnProperty.call(d, f) || (d[f] = !0, e[b++] = l)
                    }
                    e.length = b;
                    h = h + "?le=" + e.join(",");
                    a = "&"
                }
                if (I.rol) {
                    var n = I.ol;
                    n && n.length && (h = "" + h + a + "ol=" + n.length)
                }
            } catch (p) {}
            return h
        },
        ac = function(a, b, c, d) {
            a = Zb(a);
            Tb.test(c) || N("invalid_callback");
            b = $b(b);
            d = d && d.length ? $b(d) : null;
            var e = function(f) {
                return encodeURIComponent(f).replace(/%2C/g, ",")
            };
            return [encodeURIComponent(a.pathPrefix).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=",
                e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.U ? "/am=" + e(a.U) : "", a.aa ? "/rs=" + e(a.aa) : "", a.ca ? "/t=" + e(a.ca) : "", "/cb=", e(c)
            ].join("")
        },
        Zb = function(a) {
            "/" !== a.charAt(0) && N("relative path");
            for (var b = a.substring(1).split("/"), c = []; b.length;) {
                a = b.shift();
                if (!a.length || 0 == a.indexOf(".")) N("empty/relative directory");
                else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c.push(a)
            }
            a = {};
            for (var d = 0, e = b.length; d < e; ++d) {
                var f = b[d].split("="),
                    g = decodeURIComponent(f[0]),
                    k = decodeURIComponent(f[1]);
                2 == f.length && g && k && (a[g] =
                    a[g] || k)
            }
            b = "/" + c.join("/");
            Qb.test(b) || N("invalid_prefix");
            c = 0;
            for (d = Rb.length; c < d; ++c) Rb[c].test(b) && N("invalid_prefix");
            c = bc(a, "k", !0);
            d = bc(a, "am");
            e = bc(a, "rs");
            a = bc(a, "t");
            return {
                pathPrefix: b,
                version: c,
                U: d,
                aa: e,
                ca: a
            }
        },
        $b = function(a) {
            for (var b = [], c = 0, d = a.length; c < d; ++c) {
                var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                Ub.test(e) && b.push(e)
            }
            return b.join(",")
        },
        bc = function(a, b, c) {
            a = a[b];
            !a && c && N("missing: " + b);
            if (a) {
                if (Sb.test(a)) return a;
                N("invalid: " + b)
            }
            return null
        },
        Xb = /^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        Wb = /\/cb=/g,
        Vb = /\/\//g;
    Pb.m = function(a, b, c, d) {
        (a = a[0]) || N("missing_hint");
        return "https://apis.google.com" + ac(a, b, c, d)
    };
    var cc = decodeURI("%73cript"),
        dc = /^[-+_0-9\/A-Za-z]+={0,2}$/,
        ec = function(a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var e = a[d];
                e && 0 > ab.call(b, e) && c.push(e)
            }
            return c
        },
        fc = function() {
            var a = I.nonce;
            return void 0 !== a ? a && a === String(a) && a.match(dc) ? a : I.nonce = null : y.querySelector ? (a = y.querySelector("script[nonce]")) ? (a = a.nonce || a.getAttribute("nonce") || "", a && a === String(a) && a.match(dc) ? I.nonce = a : I.nonce = null) : null : null
        },
        ic = function(a) {
            if ("loading" != y.readyState) gc(a);
            else {
                var b = fc(),
                    c = "";
                null !== b && (c = ' nonce="' +
                    b + '"');
                a = "<" + cc + ' src="' + encodeURI(a) + '"' + c + "></" + cc + ">";
                y.write(hc ? hc.createHTML(a) : a)
            }
        },
        gc = function(a) {
            var b = y.createElement(cc);
            b.setAttribute("src", hc ? hc.createScriptURL(a) : a);
            a = fc();
            null !== a && b.setAttribute("nonce", a);
            b.async = "true";
            (a = y.getElementsByTagName(cc)[0]) ? a.parentNode.insertBefore(b, a): (y.head || y.body || y.documentElement).appendChild(b)
        },
        kc = function(a, b, c) {
            jc(function() {
                var d = b === Eb(Xa.href) ? B(G, "_", C()) : C();
                d = B(Ib(b), "_", d);
                a(d)
            }, c)
        },
        mc = function(a, b) {
            var c = b || {};
            "function" == typeof b &&
                (c = {}, c.callback = b);
            var d = (b = c) && b._c;
            if (d)
                for (var e = 0; e < M.length; e++) {
                    var f = M[e][0],
                        g = M[e][1];
                    g && D(d, f) && g(d[f], a, b)
                }
            b = [];
            a ? b = a.split(":") : c.features && (b = c.features);
            if (!(a = c.h) && (a = Eb(Xa.href), !a)) throw Error("Bad hint: !hint");
            lc(b || [], c, a)
        },
        lc = function(a, b, c) {
            a = bb(a) || [];
            var d = b.callback,
                e = b.config,
                f = b.timeout,
                g = b.ontimeout,
                k = b.onerror,
                h = void 0;
            "function" == typeof k && (h = k);
            var l = null,
                n = !1;
            if (f && !g || !f && g) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            k = B(Ib(c),
                "r", []).sort();
            var p = B(Ib(c), "L", []).sort(),
                r = I.le,
                z = [].concat(k),
                A = function(P, fa) {
                    if (n) return 0;
                    x.clearTimeout(l);
                    p.push.apply(p, u);
                    var ha = ((G || {}).config || {}).update;
                    ha ? ha(e) : e && B(I, "cu", []).push(e);
                    if (fa) {
                        Ob("me0", P, z);
                        try {
                            kc(fa, c, h)
                        } finally {
                            Ob("me1", P, z)
                        }
                    }
                    return 1
                };
            0 < f && (l = x.setTimeout(function() {
                n = !0;
                g()
            }, f));
            var u = ec(a, p);
            if (u.length) {
                u = ec(a, k);
                var J = B(I, "CP", []),
                    L = J.length;
                J[L] = function(P) {
                    if (!P) return 0;
                    Ob("ml1", u, z);
                    var fa = function(Da) {
                            J[L] = null;
                            A(u, P) && Hb(function() {
                                d && d();
                                Da()
                            })
                        },
                        ha = function() {
                            var Da =
                                J[L + 1];
                            Da && Da()
                        };
                    0 < L && J[L - 1] ? J[L] = function() {
                        fa(ha)
                    } : fa(ha)
                };
                if (u.length) {
                    var Za = "loaded_" + I.I++;
                    G[Za] = function(P) {
                        J[L](P);
                        G[Za] = null
                    };
                    a = Yb(c, u, "gapi." + Za, k, r);
                    k.push.apply(k, u);
                    Ob("ml0", u, z);
                    b.sync || x.___gapisync ? ic(a) : gc(a)
                } else J[L](Ya)
            } else A(u) && d && d()
        },
        hc = ua("gapi#gapi");
    var jc = function(a, b) {
        if (I.hee && 0 < I.hel) try {
            return a()
        } catch (c) {
            b && b(c), I.hel--, mc("debug_error", function() {
                try {
                    window.___jsl.hefn(c)
                } catch (d) {
                    throw c;
                }
            })
        } else try {
            return a()
        } catch (c) {
            throw b && b(c), c;
        }
    };
    var nc = G.load;
    nc && B(I, "ol", []).push(nc);
    G.load = function(a, b) {
        return jc(function() {
            return mc(a, b)
        })
    };
    var oc = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b[a] = b[a] || [];
            return b[a]
        },
        pc = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b.cfg = !a && b.cfg || {};
            return b.cfg
        },
        qc = function(a) {
            return "object" === typeof a && /\[native code\]/.test(a.push)
        },
        O = function(a, b, c) {
            if (b && "object" === typeof b)
                for (var d in b) !Object.prototype.hasOwnProperty.call(b, d) || c && "___goc" === d && "undefined" === typeof b[d] || (a[d] && b[d] && "object" === typeof a[d] && "object" === typeof b[d] && !qc(a[d]) && !qc(b[d]) ? O(a[d], b[d]) : b[d] && "object" ===
                    typeof b[d] ? (a[d] = qc(b[d]) ? [] : {}, O(a[d], b[d])) : a[d] = b[d])
        },
        rc = function(a) {
            if (a && !/^\s+$/.test(a)) {
                for (; 0 == a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
                try {
                    var b = window.JSON.parse(a)
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return (" + a + "\n)"))()
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return ({" + a + "\n})"))()
                } catch (c) {}
                return "object" === typeof b ? b : {}
            }
        },
        sc = function(a, b) {
            var c = {
                ___goc: void 0
            };
            a.length && a[a.length - 1] && Object.hasOwnProperty.call(a[a.length -
                1], "___goc") && "undefined" === typeof a[a.length - 1].___goc && (c = a.pop());
            O(c, b);
            a.push(c)
        },
        tc = function(a) {
            pc(!0);
            var b = window.___gcfg,
                c = oc("cu"),
                d = window.___gu;
            b && b !== d && (sc(c, b), window.___gu = b);
            b = oc("cu");
            var e = document.scripts || document.getElementsByTagName("script") || [];
            d = [];
            var f = [];
            f.push.apply(f, oc("us"));
            for (var g = 0; g < e.length; ++g)
                for (var k = e[g], h = 0; h < f.length; ++h) k.src && 0 == k.src.indexOf(f[h]) && d.push(k);
            0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
            for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") ||
                (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g = f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || "") : f = void 0, (f = rc(f)) && b.push(f));
            a && sc(c, a);
            d = oc("cd");
            a = 0;
            for (b = d.length; a < b; ++a) O(pc(), d[a], !0);
            d = oc("ci");
            a = 0;
            for (b = d.length; a < b; ++a) O(pc(), d[a], !0);
            a = 0;
            for (b = c.length; a < b; ++a) O(pc(), c[a], !0)
        },
        Q = function(a) {
            var b = pc();
            if (!a) return b;
            a = a.split("/");
            for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
            return c === a.length && void 0 !== b ? b : void 0
        },
        uc = function(a, b) {
            var c;
            if ("string" === typeof a) {
                var d =
                    c = {};
                a = a.split("/");
                for (var e = 0, f = a.length; e < f - 1; ++e) {
                    var g = {};
                    d = d[a[e]] = g
                }
                d[a[e]] = b
            } else c = a;
            tc(c)
        };
    var vc = function() {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), B(I, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    var wc = {
            callback: 1,
            clientid: 1,
            cookiepolicy: 1,
            openidrealm: -1,
            includegrantedscopes: -1,
            requestvisibleactions: 1,
            scope: 1
        },
        xc = !1,
        yc = C(),
        zc = function() {
            if (!xc) {
                for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                    var c = a[b].name.toLowerCase();
                    if (0 == c.lastIndexOf("google-signin-", 0)) {
                        c = c.substring(14);
                        var d = a[b].content;
                        wc[c] && d && (yc[c] = d)
                    }
                }
                if (window.self !== window.top) {
                    a = document.location.toString();
                    for (var e in wc) 0 < wc[e] && (b = H(a, e, "")) && (yc[e] = b)
                }
                xc = !0
            }
            e = C();
            E(yc, e);
            return e
        },
        Ac = function(a) {
            return !!(a.clientid &&
                a.scope && a.callback)
        };
    var Bc = function() {
        this.i = window.console
    };
    Bc.prototype.log = function(a) {
        this.i && this.i.log && this.i.log(a)
    };
    Bc.prototype.error = function(a) {
        this.i && (this.i.error ? this.i.error(a) : this.i.log && this.i.log(a))
    };
    Bc.prototype.warn = function(a) {
        this.i && (this.i.warn ? this.i.warn(a) : this.i.log && this.i.log(a))
    };
    Bc.prototype.debug = function() {};
    var Cc = new Bc;
    var Dc = function() {
            return !!I.oa
        },
        Ec = function() {};
    var R = B(I, "rw", C()),
        Fc = function(a) {
            for (var b in R) a(R[b])
        },
        Gc = function(a, b) {
            (a = R[a]) && a.state < b && (a.state = b)
        };
    var S = function(a) {
        var b = window.___jsl = window.___jsl || {};
        b.cfg = b.cfg || {};
        b = b.cfg;
        if (!a) return b;
        a = a.split("/");
        for (var c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
        return c === a.length && void 0 !== b ? b : void 0
    };
    var Hc = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,
        Ic = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,
        Jc = function() {
            var a = S("googleapis.config/sessionIndex");
            "string" === typeof a && 254 < a.length && (a = null);
            null == a && (a = window.__X_GOOG_AUTHUSER);
            "string" === typeof a && 254 < a.length && (a = null);
            if (null == a) {
                var b = window.google;
                b && (a = b.authuser)
            }
            "string" === typeof a && 254 < a.length && (a = null);
            null == a && (b = window.location.href, a = H(b, "authuser") ||
                null, null == a && (a = (a = b.match(Hc)) ? a[1] : null));
            if (null == a) return null;
            a = String(a);
            254 < a.length && (a = null);
            return a
        },
        Kc = function() {
            var a = S("googleapis.config/sessionDelegate");
            "string" === typeof a && 21 < a.length && (a = null);
            null == a && (a = (a = window.location.href.match(Ic)) ? a[1] : null);
            if (null == a) return null;
            a = String(a);
            21 < a.length && (a = null);
            return a
        };
    var Lc, T, U = void 0,
        V = function(a) {
            try {
                return t.JSON.parse.call(t.JSON, a)
            } catch (b) {
                return !1
            }
        },
        W = function(a) {
            return Object.prototype.toString.call(a)
        },
        Mc = W(0),
        Nc = W(new Date(0)),
        Oc = W(!0),
        Pc = W(""),
        Qc = W({}),
        Rc = W([]),
        X = function(a, b) {
            if (b)
                for (var c = 0, d = b.length; c < d; ++c)
                    if (a === b[c]) throw new TypeError("Converting circular structure to JSON");
            d = typeof a;
            if ("undefined" !== d) {
                c = Array.prototype.slice.call(b || [], 0);
                c[c.length] = a;
                b = [];
                var e = W(a);
                if (null != a && "function" === typeof a.toJSON && (Object.prototype.hasOwnProperty.call(a,
                        "toJSON") || (e !== Rc || a.constructor !== Array && a.constructor !== Object) && (e !== Qc || a.constructor !== Array && a.constructor !== Object) && e !== Pc && e !== Mc && e !== Oc && e !== Nc)) return X(a.toJSON.call(a), c);
                if (null == a) b[b.length] = "null";
                else if (e === Mc) a = Number(a), isNaN(a) || isNaN(a - a) ? a = "null" : -0 === a && 0 > 1 / a && (a = "-0"), b[b.length] = String(a);
                else if (e === Oc) b[b.length] = String(!!Number(a));
                else {
                    if (e === Nc) return X(a.toISOString.call(a), c);
                    if (e === Rc && W(a.length) === Mc) {
                        b[b.length] = "[";
                        var f = 0;
                        for (d = Number(a.length) >> 0; f < d; ++f) f &&
                            (b[b.length] = ","), b[b.length] = X(a[f], c) || "null";
                        b[b.length] = "]"
                    } else if (e == Pc && W(a.length) === Mc) {
                        b[b.length] = '"';
                        f = 0;
                        for (c = Number(a.length) >> 0; f < c; ++f) d = String.prototype.charAt.call(a, f), e = String.prototype.charCodeAt.call(a, f), b[b.length] = "\b" === d ? "\\b" : "\f" === d ? "\\f" : "\n" === d ? "\\n" : "\r" === d ? "\\r" : "\t" === d ? "\\t" : "\\" === d || '"' === d ? "\\" + d : 31 >= e ? "\\u" + (e + 65536).toString(16).substr(1) : 32 <= e && 65535 >= e ? d : "\ufffd";
                        b[b.length] = '"'
                    } else if ("object" === d) {
                        b[b.length] = "{";
                        d = 0;
                        for (f in a) Object.prototype.hasOwnProperty.call(a,
                            f) && (e = X(a[f], c), void 0 !== e && (d++ && (b[b.length] = ","), b[b.length] = X(f), b[b.length] = ":", b[b.length] = e));
                        b[b.length] = "}"
                    } else return
                }
                return b.join("")
            }
        },
        Sc = /[\0-\x07\x0b\x0e-\x1f]/,
        Tc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,
        Uc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,
        Vc = /^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,
        Wc = /"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,
        Xc = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,
        Yc = /[ \t\n\r]+/g,
        Zc = /[^"]:/,
        $c = /""/g,
        ad = /true|false|null/g,
        bd = /00/,
        cd = /[\{]([^0\}]|0[^:])/,
        dd = /(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,
        ed = /[^\[,:][\[\{]/,
        fd = /^(\{|\}|\[|\]|,|:|0)+/,
        gd = /\u2028/g,
        hd = /\u2029/g,
        id = function(a) {
            a = String(a);
            if (Sc.test(a) || Tc.test(a) || Uc.test(a) || Vc.test(a)) return !1;
            var b = a.replace(Wc, '""');
            b = b.replace(Xc, "0");
            b = b.replace(Yc, "");
            if (Zc.test(b)) return !1;
            b = b.replace($c, "0");
            b = b.replace(ad, "0");
            if (bd.test(b) || cd.test(b) || dd.test(b) || ed.test(b) || !b || (b = b.replace(fd, ""))) return !1;
            a = a.replace(gd, "\\u2028").replace(hd,
                "\\u2029");
            b = void 0;
            try {
                b = U ? [V(a)] : eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n" + a + "\n)")
            } catch (c) {
                return !1
            }
            return b && 1 === b.length ? b[0] : !1
        },
        jd = function() {
            var a = ((t.document || {}).scripts || []).length;
            if ((void 0 === Lc || void 0 === U || T !== a) && -1 !== T) {
                Lc = U = !1;
                T = -1;
                try {
                    try {
                        U = !!t.JSON && '{"a":[3,true,"1970-01-01T00:00:00.000Z"]}' === t.JSON.stringify.call(t.JSON, {
                            a: [3, !0, new Date(0)],
                            c: function() {}
                        }) && !0 === V("true") && 3 === V('[{"a":3}]')[0].a
                    } catch (b) {}
                    Lc = U && !V("[00]") &&
                        !V('"\u0007"') && !V('"\\0"') && !V('"\\v"')
                } finally {
                    T = a
                }
            }
        },
        kd = function(a) {
            if (-1 === T) return !1;
            jd();
            return (Lc ? V : id)(a)
        },
        ld = function(a) {
            if (-1 !== T) return jd(), U ? t.JSON.stringify.call(t.JSON, a) : X(a)
        },
        md = !Date.prototype.toISOString || "function" !== typeof Date.prototype.toISOString || "1970-01-01T00:00:00.000Z" !== (new Date(0)).toISOString(),
        nd = function() {
            var a = Date.prototype.getUTCFullYear.call(this);
            return [0 > a ? "-" + String(1E6 - a).substr(1) : 9999 >= a ? String(1E4 + a).substr(1) : "+" + String(1E6 + a).substr(1), "-", String(101 +
                Date.prototype.getUTCMonth.call(this)).substr(1), "-", String(100 + Date.prototype.getUTCDate.call(this)).substr(1), "T", String(100 + Date.prototype.getUTCHours.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCMinutes.call(this)).substr(1), ":", String(100 + Date.prototype.getUTCSeconds.call(this)).substr(1), ".", String(1E3 + Date.prototype.getUTCMilliseconds.call(this)).substr(1), "Z"].join("")
        };
    Date.prototype.toISOString = md ? nd : Date.prototype.toISOString;
    var od = function() {
        this.blockSize = -1
    };
    var pd = function() {
        this.blockSize = -1;
        this.blockSize = 64;
        this.g = [];
        this.L = [];
        this.fa = [];
        this.H = [];
        this.H[0] = 128;
        for (var a = 1; a < this.blockSize; ++a) this.H[a] = 0;
        this.J = this.v = 0;
        this.reset()
    };
    sa(pd, od);
    pd.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.g[4] = 3285377520;
        this.J = this.v = 0
    };
    var qd = function(a, b, c) {
        c || (c = 0);
        var d = a.fa;
        if ("string" === typeof b)
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.g[0];
        c = a.g[1];
        var g = a.g[2],
            k = a.g[3],
            h = a.g[4];
        for (e = 0; 80 > e; e++) {
            if (40 > e)
                if (20 > e) {
                    f = k ^ c & (g ^ k);
                    var l = 1518500249
                } else f = c ^ g ^ k, l = 1859775393;
            else 60 > e ? (f = c & g | k & (c | g), l = 2400959708) :
                (f = c ^ g ^ k, l = 3395469782);
            f = (b << 5 | b >>> 27) + f + h + l + d[e] & 4294967295;
            h = k;
            k = g;
            g = (c << 30 | c >>> 2) & 4294967295;
            c = b;
            b = f
        }
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + c & 4294967295;
        a.g[2] = a.g[2] + g & 4294967295;
        a.g[3] = a.g[3] + k & 4294967295;
        a.g[4] = a.g[4] + h & 4294967295
    };
    pd.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.blockSize, d = 0, e = this.L, f = this.v; d < b;) {
                if (0 == f)
                    for (; d <= c;) qd(this, a, d), d += this.blockSize;
                if ("string" === typeof a)
                    for (; d < b;) {
                        if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.blockSize) {
                            qd(this, e);
                            f = 0;
                            break
                        }
                    } else
                        for (; d < b;)
                            if (e[f] = a[d], ++f, ++d, f == this.blockSize) {
                                qd(this, e);
                                f = 0;
                                break
                            }
            }
            this.v = f;
            this.J += b
        }
    };
    pd.prototype.digest = function() {
        var a = [],
            b = 8 * this.J;
        56 > this.v ? this.update(this.H, 56 - this.v) : this.update(this.H, this.blockSize - (this.v - 56));
        for (var c = this.blockSize - 1; 56 <= c; c--) this.L[c] = b & 255, b /= 256;
        qd(this, this.L);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8) a[b] = this.g[c] >> d & 255, ++b;
        return a
    };
    var rd = function() {
        this.R = new pd
    };
    rd.prototype.reset = function() {
        this.R.reset()
    };
    var sd = x.crypto,
        td = !1,
        ud = 0,
        vd = 0,
        wd = 1,
        xd = 0,
        yd = "",
        zd = function(a) {
            a = a || x.event;
            var b = a.screenX + a.clientX << 16;
            b += a.screenY + a.clientY;
            b *= (new Date).getTime() % 1E6;
            wd = wd * b % xd;
            0 < ud && ++vd == ud && xb("mousemove", zd, "remove", "de")
        },
        Ad = function(a) {
            var b = new rd;
            a = unescape(encodeURIComponent(a));
            for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a.charCodeAt(d));
            b.R.update(c);
            b = b.R.digest();
            a = "";
            for (c = 0; c < b.length; c++) a += "0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) + "0123456789ABCDEF".charAt(b[c] % 16);
            return a
        };
    td = !!sd && "function" == typeof sd.getRandomValues;
    td || (xd = 1E6 * (screen.width * screen.width + screen.height), yd = Ad(y.cookie + "|" + y.location + "|" + (new Date).getTime() + "|" + Math.random()), ud = S("random/maxObserveMousemove") || 0, 0 != ud && xb("mousemove", zd, "add", "at"));
    var Bd = function() {
            var a = I.onl;
            if (!a) {
                a = C();
                I.onl = a;
                var b = C();
                a.e = function(c) {
                    var d = b[c];
                    d && (delete b[c], d())
                };
                a.a = function(c, d) {
                    b[c] = d
                };
                a.r = function(c) {
                    delete b[c]
                }
            }
            return a
        },
        Cd = function(a, b) {
            b = b.onload;
            return "function" === typeof b ? (Bd().a(a, b), b) : null
        },
        Dd = function(a) {
            F(/^\w+$/.test(a), "Unsupported id - " + a);
            return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        },
        Ed = function(a) {
            Bd().r(a)
        };
    var Fd = {
            allowtransparency: "true",
            frameborder: "0",
            hspace: "0",
            marginheight: "0",
            marginwidth: "0",
            scrolling: "no",
            style: "",
            tabindex: "0",
            vspace: "0",
            width: "100%"
        },
        Gd = {
            allowtransparency: !0,
            onload: !0
        },
        Hd = 0,
        Id = function(a) {
            F(!a || vb.test(a), "Illegal url for new iframe - " + a)
        },
        Jd = function(a, b, c, d, e) {
            Id(c.src);
            var f, g = Cd(d, c),
                k = g ? Dd(d) : "";
            try {
                document.all && (f = a.createElement('<iframe frameborder="' + hb(String(c.frameborder)) + '" scrolling="' + hb(String(c.scrolling)) + '" ' + k + ' name="' + hb(String(c.name)) + '"/>'))
            } catch (l) {} finally {
                f ||
                    (f = (a ? new Wa(Va(a)) : wa || (wa = new Wa)).ha("IFRAME"), g && (f.onload = function() {
                        f.onload = null;
                        g.call(this)
                    }, Ed(d)))
            }
            f.setAttribute("ng-non-bindable", "");
            for (var h in c) a = c[h], "style" === h && "object" === typeof a ? E(a, f.style) : Gd[h] || f.setAttribute(h, String(a));
            (h = e && e.beforeNode || null) || e && e.dontclear || Cb(b);
            b.insertBefore(f, h);
            f = h ? h.previousSibling : b.lastChild;
            c.allowtransparency && (f.allowTransparency = !0);
            return f
        };
    var Kd = /^:[\w]+$/,
        Ld = /:([a-zA-Z_]+):/g,
        Md = function() {
            var a = Jc() || "0",
                b = Kc();
            var c = Jc() || a;
            var d = Kc(),
                e = "";
            c && (e += "u/" + encodeURIComponent(String(c)) + "/");
            d && (e += "b/" + encodeURIComponent(String(d)) + "/");
            c = e || null;
            (e = (d = !1 === S("isLoggedIn")) ? "_/im/" : "") && (c = "");
            var f = S("iframes/:socialhost:"),
                g = S("iframes/:im_socialhost:");
            return wb = {
                socialhost: f,
                ctx_socialhost: d ? g : f,
                session_index: a,
                session_delegate: b,
                session_prefix: c,
                im_prefix: e
            }
        },
        Nd = function(a, b) {
            return Md()[b] || ""
        },
        Od = function(a) {
            return function(b,
                c) {
                return a ? Md()[c] || a[c] || "" : Md()[c] || ""
            }
        };
    var Pd = function(a) {
            var b;
            a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
            a = b ? b : a;
            return ub(document, a)
        },
        Qd = function(a) {
            a = a || "canonical";
            for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
                var e = b[c],
                    f = e.getAttribute("rel");
                if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = Pd(e)) && null != e.match(/^https?:\/\/[\w\-_\.]+/i)) return e
            }
            return window.location.href
        };
    var Rd = {
            se: "0"
        },
        Sd = {
            post: !0
        },
        Td = {
            style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
        },
        Ud = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),
        Vd = B(I, "WI", C()),
        Wd = function(a, b, c) {
            var d;
            var e = {};
            var f = d = a;
            "plus" == a && b.action && (d = a + "_" + b.action, f = a + "/" + b.action);
            (d = Q("iframes/" + d + "/url")) || (d = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + f + "?usegapi=1");
            for (var g in Rd) e[g] = g + "/" + (b[g] || Rd[g]) + "/";
            e = ub(y, d.replace(Ld,
                Od(e)));
            g = "iframes/" + a + "/params/";
            f = {};
            E(b, f);
            (d = Q("lang") || Q("gwidget/lang")) && (f.hl = d);
            Sd[a] || (f.origin = window.location.origin || window.location.protocol + "//" + window.location.host);
            f.exp = Q(g + "exp");
            if (g = Q(g + "location"))
                for (d = 0; d < g.length; d++) {
                    var k = g[d];
                    f[k] = x.location[k]
                }
            switch (a) {
                case "plus":
                case "follow":
                    g = f.href;
                    d = b.action ? void 0 : "publisher";
                    g = (g = "string" == typeof g ? g : void 0) ? Pd(g) : Qd(d);
                    f.url = g;
                    delete f.href;
                    break;
                case "plusone":
                    g = (g = b.href) ? Pd(g) : Qd();
                    f.url = g;
                    g = b.db;
                    d = Q();
                    null == g && d && (g = d.db,
                        null == g && (g = d.gwidget && d.gwidget.db));
                    f.db = g || void 0;
                    g = b.ecp;
                    d = Q();
                    null == g && d && (g = d.ecp, null == g && (g = d.gwidget && d.gwidget.ecp));
                    f.ecp = g || void 0;
                    delete f.href;
                    break;
                case "signin":
                    f.url = Qd()
            }
            I.ILI && (f.iloader = "1");
            delete f["data-onload"];
            delete f.rd;
            for (var h in Rd) f[h] && delete f[h];
            f.gsrc = Q("iframes/:source:");
            h = Q("inline/css");
            "undefined" !== typeof h && 0 < c && h >= c && (f.ic = "1");
            h = /^#|^fr-/;
            c = {};
            for (var l in f) D(f, l) && h.test(l) && (c[l.replace(h, "")] = f[l], delete f[l]);
            l = "q" == Q("iframes/" + a + "/params/si") ? f :
                c;
            h = zc();
            for (var n in h) !D(h, n) || D(f, n) || D(c, n) || (l[n] = h[n]);
            n = [].concat(Ud);
            (l = Q("iframes/" + a + "/methods")) && "object" === typeof l && $a.test(l.push) && (n = n.concat(l));
            for (var p in b) D(b, p) && /^on/.test(p) && ("plus" != a || "onconnect" != p) && (n.push(p), delete f[p]);
            delete f.callback;
            c._methods = n.join(",");
            return sb(e, f, c)
        },
        Xd = ["style", "data-gapiscan"],
        Zd = function(a) {
            for (var b = C(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
                var f = a.attributes[d],
                    g = f.name,
                    k = f.value;
                0 <= ab.call(Xd,
                    g) || c && 0 != g.indexOf("data-") || "null" === k || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = k)
            }
            a = a.style;
            (c = Yd(a && a.height)) && (b.height = String(c));
            (a = Yd(a && a.width)) && (b.width = String(a));
            return b
        },
        Yd = function(a) {
            var b = void 0;
            "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
            return b
        },
        be = function() {
            var a = I.drw;
            Fc(function(b) {
                if (a !== b.id && 4 != b.state && "share" != b.type) {
                    var c = b.id,
                        d = b.type,
                        e = b.url;
                    b = b.userParams;
                    var f = y.getElementById(c);
                    if (f) {
                        var g = Wd(d, b, 0);
                        g ? (f = f.parentNode,
                            $d(e) !== $d(g) && (b.dontclear = !0, b.rd = !0, b.ri = !0, b.type = d, ae(f, b), (d = R[f.lastChild.id]) && (d.oid = c), Gc(c, 4))) : delete R[c]
                    } else delete R[c]
                }
            })
        },
        $d = function(a) {
            var b = RegExp("(\\?|&)ic=1");
            return a.replace(/#.*/, "").replace(b, "")
        };
    var ce, de, Y, ee, fe, ge = /(?:^|\s)g-((\S)*)(?:$|\s)/,
        he = {
            plusone: !0,
            autocomplete: !0,
            profile: !0,
            signin: !0,
            signin2: !0
        };
    ce = B(I, "SW", C());
    de = B(I, "SA", C());
    Y = B(I, "SM", C());
    ee = B(I, "FW", []);
    fe = null;
    var ie = function(a, b) {
            return ("string" === typeof a ? document.getElementById(a) : a) || b
        },
        ke = function(a, b) {
            je(void 0, !1, a, b)
        },
        je = function(a, b, c, d) {
            K("ps0", !0);
            c = ie(c, y);
            var e = y.documentMode;
            if (c.querySelectorAll && (!e || 8 < e)) {
                e = d ? [d] : ib(ce).concat(ib(de)).concat(ib(Y));
                for (var f = [], g = 0; g < e.length; g++) {
                    var k = e[g];
                    f.push(".g-" + k, "g\\:" + k)
                }
                e = c.querySelectorAll(f.join(","))
            } else e = c.getElementsByTagName("*");
            c = C();
            for (f = 0; f < e.length; f++) {
                g = e[f];
                var h = g;
                k = d;
                var l = h.nodeName.toLowerCase(),
                    n = void 0;
                if (h.getAttribute("data-gapiscan")) k =
                    null;
                else {
                    var p = l.indexOf("g:");
                    0 == p ? n = l.substr(2) : (p = (p = String(h.className || h.getAttribute("class"))) && ge.exec(p)) && (n = p[1]);
                    k = !n || !(ce[n] || de[n] || Y[n]) || k && n !== k ? null : n
                }
                k && (he[k] || 0 == g.nodeName.toLowerCase().indexOf("g:") || 0 != ib(Zd(g)).length) && (g.setAttribute("data-gapiscan", !0), B(c, k, []).push(g))
            }
            if (b)
                for (var r in c)
                    for (b = c[r], d = 0; d < b.length; d++) b[d].setAttribute("data-onload", !0);
            for (var z in c) ee.push(z);
            K("ps1", !0);
            if ((r = ee.join(":")) || a) try {
                G.load(r, a)
            } catch (u) {
                Cc.log(u);
                return
            }
            if (le(fe || {}))
                for (var A in c) {
                    a = c[A];
                    z = 0;
                    for (b = a.length; z < b; z++) a[z].removeAttribute("data-gapiscan");
                    me(A)
                } else {
                    d = [];
                    for (A in c)
                        for (a = c[A], z = 0, b = a.length; z < b; z++) e = a[z], ne(A, e, Zd(e), d, b);
                    oe(r, d)
                }
        },
        pe = function(a) {
            var b = B(G, a, {});
            b.go || (b.go = function(c) {
                return ke(c, a)
            }, b.render = function(c, d) {
                d = d || {};
                d.type = a;
                return ae(c, d)
            })
        },
        qe = function(a) {
            ce[a] = !0
        },
        re = function(a) {
            de[a] = !0
        },
        se = function(a) {
            Y[a] = !0
        };
    var me = function(a, b) {
            var c = Gb(a);
            b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : G.load(a, function() {
                var d = Gb(a),
                    e = b && b.iframeNode,
                    f = b && b.userParams;
                e && d ? (d(b), e.setAttribute("data-gapiattached", !0)) : (d = G[a].go, "signin2" == a ? d(e, f) : d(e && e.parentNode, f))
            })
        },
        le = function() {
            return !1
        },
        oe = function() {},
        ne = function(a, b, c, d, e, f) {
            switch (te(b, a, f)) {
                case 0:
                    a = Y[a] ? a + "_annotation" : a;
                    d = {};
                    d.iframeNode = b;
                    d.userParams = c;
                    me(a, d);
                    break;
                case 1:
                    if (b.parentNode) {
                        for (var g in c) {
                            if (f = D(c, g)) f = c[g], f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                            if (f) try {
                                c[g] = ld(c[g])
                            } catch (J) {
                                delete c[g]
                            }
                        }
                        var k = !0;
                        c.dontclear && (k = !1);
                        delete c.dontclear;
                        Ec();
                        f = Wd(a, c, e);
                        g = {
                            allowPost: 1,
                            attributes: Td
                        };
                        g.dontclear = !k;
                        e = {};
                        e.userParams = c;
                        e.url = f;
                        e.type = a;
                        if (c.rd) var h = b;
                        else h = document.createElement("div"), b.setAttribute("data-gapistub", !0), h.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(h, b);
                        e.siteElement =
                            h;
                        h.id || (b = h, B(Vd, a, 0), k = "___" + a + "_" + Vd[a]++, b.id = k);
                        b = C();
                        b[">type"] = a;
                        E(c, b);
                        k = f;
                        c = h;
                        f = g || {};
                        b = f.attributes || {};
                        F(!(f.allowPost || f.forcePost) || !b.onload, "onload is not supported by post iframe (allowPost or forcePost)");
                        g = b = k;
                        Kd.test(b) && (g = S("iframes/" + g.substring(1) + "/url"), F(!!g, "Unknown iframe url config for - " + b));
                        k = ub(y, g.replace(Ld, Nd));
                        b = c.ownerDocument || y;
                        h = 0;
                        do g = f.id || ["I", Hd++, "_", (new Date).getTime()].join(""); while (b.getElementById(g) && 5 > ++h);
                        F(5 > h, "Error creating iframe id");
                        h = {};
                        var l = {};
                        b.documentMode && 9 > b.documentMode && (h.hostiemode = b.documentMode);
                        E(f.queryParams || {}, h);
                        E(f.fragmentParams || {}, l);
                        var n = f.pfname;
                        var p = C();
                        S("iframes/dropLegacyIdParam") || (p.id = g);
                        p._gfid = g;
                        p.parent = b.location.protocol + "//" + b.location.host;
                        var r = H(b.location.href, "parent");
                        n = n || "";
                        !n && r && (r = H(b.location.href, "_gfid", "") || H(b.location.href, "id", ""), n = H(b.location.href, "pfname", ""), n = r ? n + "/" + r : "");
                        n || (r = kd(H(b.location.href, "jcp", ""))) && "object" == typeof r && (n = (n = r.id) ? r.pfname + "/" + n : "");
                        p.pfname =
                            n;
                        f.connectWithJsonParam && (r = {}, r.jcp = ld(p), p = r);
                        r = H(k, "rpctoken") || h.rpctoken || l.rpctoken;
                        if (!r) {
                            if (!(r = f.rpctoken)) {
                                r = String;
                                n = Math;
                                var z = n.round;
                                if (td) {
                                    var A = new x.Uint32Array(1);
                                    sd.getRandomValues(A);
                                    A = Number("0." + A[0])
                                } else A = wd, A += parseInt(yd.substr(0, 20), 16), yd = Ad(yd), A /= xd + Math.pow(16, 20);
                                r = r(z.call(n, 1E8 * A))
                            }
                            p.rpctoken = r
                        }
                        f.rpctoken = r;
                        E(p, f.connectWithQueryParams ? h : l);
                        r = b.location.href;
                        p = C();
                        (n = H(r, "_bsh", I.bsh)) && (p._bsh = n);
                        (r = Eb(r)) && (p.jsh = r);
                        f.hintInFragment ? E(p, l) : E(p, h);
                        k = sb(k, h, l, f.paramsSerializer);
                        l = C();
                        E(Fd, l);
                        E(f.attributes, l);
                        l.name = l.id = g;
                        l.src = k;
                        f.eurl = k;
                        h = f || {};
                        p = !!h.allowPost;
                        if (h.forcePost || p && 2E3 < k.length) {
                            h = pb(k);
                            l.src = "";
                            f.dropDataPostorigin || (l["data-postorigin"] = k);
                            k = Jd(b, c, l, g);
                            if (-1 != navigator.userAgent.indexOf("WebKit")) {
                                var u = k.contentWindow.document;
                                u.open();
                                l = u.createElement("div");
                                p = {};
                                r = g + "_inner";
                                p.name = r;
                                p.src = "";
                                p.style = "display:none";
                                Jd(b, l, p, r, f)
                            }
                            l = (f = h.query[0]) ? f.split("&") : [];
                            f = [];
                            for (p = 0; p < l.length; p++) r = l[p].split("=", 2), f.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                            h.query = [];
                            l = qb(h);
                            F(vb.test(l), "Invalid URL: " + l);
                            h = b.createElement("form");
                            h.method = "POST";
                            h.target = g;
                            h.style.display = "none";
                            g = l instanceof w ? l : Na(l);
                            Qa(h, "HTMLFormElement").action = La(g);
                            for (g = 0; g < f.length; g++) l = b.createElement("input"), l.type = "hidden", l.name = f[g][0], l.value = f[g][1], h.appendChild(l);
                            c.appendChild(h);
                            h.submit();
                            h.parentNode.removeChild(h);
                            u && u.close();
                            u = k
                        } else u = Jd(b, c, l, g, f);
                        e.iframeNode = u;
                        e.id = u.getAttribute("id");
                        u = e.id;
                        c = C();
                        c.id = u;
                        c.userParams = e.userParams;
                        c.url = e.url;
                        c.type =
                            e.type;
                        c.state = 1;
                        R[u] = c;
                        u = e
                    } else u = null;
                    u && ((e = u.id) && d.push(e), me(a, u))
            }
        },
        te = function(a, b, c) {
            if (a && 1 === a.nodeType && b) {
                if (c) return 1;
                if (Y[b]) {
                    if (Db[a.nodeName.toLowerCase()]) return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
                } else {
                    if (de[b]) return 0;
                    if (ce[b]) return 1
                }
            }
            return null
        },
        ae = function(a, b) {
            var c = b.type;
            delete b.type;
            var d = ie(a);
            if (d) {
                a = {};
                for (var e in b) D(b, e) && (a[e.toLowerCase()] = b[e]);
                a.rd = 1;
                (b = !!a.ri) && delete a.ri;
                e = [];
                ne(c, d, a, e, 0, b);
                oe(c, e)
            } else Cc.log("string" === "gapi." +
                c + ".render: missing element " + typeof a ? a : "")
        };
    B(G, "platform", {}).go = ke;
    le = function(a) {
        for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++) a = a[b[c]];
        b = Eb(Xa.href);
        return !a || 0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b
    };
    oe = function(a, b) {
        ue(a, b)
    };
    var zb = function(a) {
            je(a, !0)
        },
        ve = function(a, b) {
            b = b || [];
            for (var c = 0; c < b.length; ++c) a(b[c]);
            for (a = 0; a < b.length; a++) pe(b[a])
        };
    M.push(["platform", function(a, b, c) {
        fe = c;
        (b || c.features) && ee.push(b || c.features.join(":"));
        ve(qe, a);
        ve(re, c._c.annotation);
        ve(se, c._c.bimodal);
        vc();
        tc();
        if ("explicit" != Q("parsetags")) {
            Fb(a);
            Ac(zc()) && !Q("disableRealtimeCallback") && Ec();
            if (c && (a = c.callback)) {
                var d = jb(a);
                delete c.callback
            }
            Bb(function() {
                zb(d)
            })
        }
    }]);
    G._pl = !0;
    var we = function(a) {
        a = (a = R[a]) ? a.oid : void 0;
        if (a) {
            var b = y.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete R[a];
            we(a)
        }
    };
    var xe = /^\{h:'/,
        ye = /^!_/,
        ze = "",
        ue = function(a, b) {
            function c() {
                xb("message", d, "remove", "de")
            }

            function d(f) {
                var g = f.data,
                    k = f.origin;
                if (Ae(g, b)) {
                    var h = e;
                    e = !1;
                    h && K("rqe");
                    Be(a, function() {
                        h && K("rqd");
                        c();
                        for (var l = B(I, "RPMQ", []), n = 0; n < l.length; n++) l[n]({
                            data: g,
                            origin: k
                        })
                    })
                }
            }
            if (0 !== b.length) {
                ze = H(Xa.href, "pfname", "");
                var e = !0;
                xb("message", d, "add", "at");
                mc(a, c)
            }
        },
        Ae = function(a, b) {
            a = String(a);
            if (xe.test(a)) return !0;
            var c = !1;
            ye.test(a) && (c = !0, a = a.substr(2));
            if (!/^\{/.test(a)) return !1;
            var d = kd(a);
            if (!d) return !1;
            a = d.f;
            if (d.s && a && -1 != ab.call(b, a)) {
                if ("_renderstart" === d.s || d.s === ze + "/" + a + "::_renderstart")
                    if (d = d.a && d.a[c ? 0 : 1], b = y.getElementById(a), Gc(a, 2), d && b && d.width && d.height) {
                        a: {
                            c = b.parentNode;a = d || {};
                            if (Dc()) {
                                var e = b.id;
                                if (e) {
                                    d = (d = R[e]) ? d.state : void 0;
                                    if (1 === d || 4 === d) break a;
                                    we(e)
                                }
                            }(d = c.nextSibling) && d.getAttribute && d.getAttribute("data-gapistub") && (c.parentNode.removeChild(d), c.style.cssText = "");d = a.width;
                            var f = a.height,
                                g = c.style;g.textIndent = "0";g.margin = "0";g.padding = "0";g.background = "transparent";g.borderStyle =
                            "none";g.cssFloat = "none";g.styleFloat = "none";g.lineHeight = "normal";g.fontSize = "1px";g.verticalAlign = "baseline";c = c.style;c.display = "inline-block";g = b.style;g.position = "static";g.left = "0";g.top = "0";g.visibility = "visible";d && (c.width = g.width = d + "px");f && (c.height = g.height = f + "px");a.verticalAlign && (c.verticalAlign = a.verticalAlign);e && Gc(e, 3)
                        }
                        b["data-csi-wdt"] = (new Date).getTime()
                    }
                return !0
            }
            return !1
        },
        Be = function(a, b) {
            mc(a, b)
        };
    var Ce = function(a, b) {
        this.N = a;
        a = b || {};
        this.ia = Number(a.maxAge) || 0;
        this.W = a.domain;
        this.Y = a.path;
        this.ja = !!a.secure
    };
    Ce.prototype.read = function() {
        for (var a = this.N + "=", b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c];
            if (0 == d.indexOf(a)) return d.substr(a.length)
        }
    };
    Ce.prototype.write = function(a, b) {
        if (!De.test(this.N)) throw "Invalid cookie name";
        if (!Ee.test(a)) throw "Invalid cookie value";
        a = this.N + "=" + a;
        this.W && (a += ";domain=" + this.W);
        this.Y && (a += ";path=" + this.Y);
        b = "number" === typeof b ? b : this.ia;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.ja && (a += ";secure");
        document.cookie = a;
        return !0
    };
    Ce.prototype.clear = function() {
        this.write("", 0)
    };
    var Ee = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
        De = /^[A-Z_][A-Z0-9_]{0,63}$/;
    Ce.iterate = function(a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="),
                e = d.shift();
            a(e, d.join("="))
        }
    };
    var Fe = function(a) {
        this.G = a
    };
    Fe.prototype.read = function() {
        if (Z.hasOwnProperty(this.G)) return Z[this.G]
    };
    Fe.prototype.write = function(a) {
        Z[this.G] = a;
        return !0
    };
    Fe.prototype.clear = function() {
        delete Z[this.G]
    };
    var Z = {};
    Fe.iterate = function(a) {
        for (var b in Z) Z.hasOwnProperty(b) && a(b, Z[b])
    };
    var Ge = "https:" === window.location.protocol,
        He = Ge || "http:" === window.location.protocol ? Ce : Fe,
        Ie = function(a) {
            var b = a.substr(1),
                c = "",
                d = window.location.hostname;
            if ("" !== b) {
                c = parseInt(b, 10);
                if (isNaN(c)) return null;
                b = d.split(".");
                if (b.length < c - 1) return null;
                b.length == c - 1 && (d = "." + d)
            } else d = "";
            return {
                l: "S" == a.charAt(0),
                domain: d,
                o: c
            }
        },
        Je = function() {
            var a, b = null;
            He.iterate(function(c, d) {
                0 === c.indexOf("G_AUTHUSER_") && (c = Ie(c.substring(11)), !a || c.l && !a.l || c.l == a.l && c.o > a.o) && (a = c, b = d)
            });
            return {
                ga: a,
                K: b
            }
        };

    function Ke(a) {
        if (0 !== a.indexOf("GCSC")) return null;
        var b = {
            X: !1
        };
        a = a.substr(4);
        if (!a) return b;
        var c = a.charAt(0);
        a = a.substr(1);
        var d = a.lastIndexOf("_");
        if (-1 == d) return b;
        var e = Ie(a.substr(d + 1));
        if (null == e) return b;
        a = a.substring(0, d);
        if ("_" !== a.charAt(0)) return b;
        d = "E" === c && e.l;
        return !d && ("U" !== c || e.l) || d && !Ge ? b : {
            X: !0,
            l: d,
            na: a.substr(1),
            domain: e.domain,
            o: e.o
        }
    }
    var Le = function(a) {
            if (!a) return [];
            a = a.split("=");
            return a[1] ? a[1].split("|") : []
        },
        Me = function(a) {
            a = a.split(":");
            return {
                clientId: a[0].split("=")[1],
                la: Le(a[1]),
                qa: Le(a[2]),
                pa: Le(a[3])
            }
        },
        Ne = function() {
            var a = Je(),
                b = a.ga;
            a = a.K;
            if (null !== a) {
                var c;
                He.iterate(function(f, g) {
                    (f = Ke(f)) && f.X && f.l == b.l && f.o == b.o && (c = g)
                });
                if (c) {
                    var d = Me(c),
                        e = d && d.la[Number(a)];
                    d = d && d.clientId;
                    if (e) return {
                        K: a,
                        ka: e,
                        clientId: d
                    }
                }
            }
            return null
        };
    var Pe = function() {
        this.V = Oe
    };
    m = Pe.prototype;
    m.ba = function() {
        this.M || (this.A = 0, this.M = !0, this.Z())
    };
    m.Z = function() {
        this.M && (this.V() ? this.A = this.T : this.A = Math.min(2 * (this.A || this.T), 120), window.setTimeout(ra(this.Z, this), 1E3 * this.A))
    };
    m.A = 0;
    m.T = 2;
    m.V = null;
    m.M = !1;
    var Qe = null;
    Dc = function() {
        return I.oa = !0
    };
    Ec = function() {
        I.oa = !0;
        var a = Ne();
        (a = a && a.K) && uc("googleapis.config/sessionIndex", a);
        Qe || (Qe = B(I, "ss", new Pe));
        a = Qe;
        a.ba && a.ba()
    };
    var Oe = function() {
        var a = Ne(),
            b = a && a.ka || null,
            c = a && a.clientId;
        mc("auth", {
            callback: function() {
                var d = x.gapi.auth,
                    e = {
                        client_id: c,
                        session_state: b
                    };
                d.checkSessionState(e, function(f) {
                    var g = e.session_state,
                        k = !!Q("isLoggedIn");
                    f = Q("debug/forceIm") ? !1 : g && f || !g && !f;
                    if (k = k !== f) uc("isLoggedIn", f), Ec(), be(), f || ((f = d.signOut) ? f() : (f = d.setToken) && f(null));
                    f = zc();
                    var h = Q("savedUserState");
                    g = d._guss(f.cookiepolicy);
                    h = h != g && "undefined" != typeof h;
                    uc("savedUserState", g);
                    (k || h) && Ac(f) && !Q("disableRealtimeCallback") && d._pimf(f, !0)
                })
            }
        });
        return !0
    };
    M.unshift(["url", function(a, b, c) {
        !a || b && "" !== b || !a.endsWith(".js") || (a = a.substring(0, a.length - 3), b = a.lastIndexOf("/") + 1, b >= a.length || (a = a.substr(b).split(":").filter(function(d) {
            return !["api", "platform"].includes(d)
        }), c.features = a))
    }]);
    K("bs0", !0, window.gapi._bs);
    K("bs1", !0);
    delete window.gapi._bs;
    window.gapi.load("", {
        callback: window["renderButton"],
        _c: {
            url: "https://apis.google.com/js/platform.js",
            jsl: {
                ci: {
                    "oauth-flow": {
                        authUrl: "https://accounts.google.com/o/oauth2/auth",
                        proxyUrl: "https://accounts.google.com/o/oauth2/postmessageRelay",
                        disableOpt: !0,
                        idpIframeUrl: "https://accounts.google.com/o/oauth2/iframe",
                        usegapi: !1
                    },
                    debug: {
                        reportExceptionRate: 1,
                        forceIm: !1,
                        rethrowException: !0,
                        host: "https://apis.google.com"
                    },
                    enableMultilogin: !0,
                    "googleapis.config": {
                        auth: {
                            useFirstPartyAuthV2: !0
                        },
                        root: "https://content.googleapis.com",
                        "root-1p": "https://clients6.google.com"
                    },
                    inline: {
                        css: 1
                    },
                    disableRealtimeCallback: !1,
                    drive_share: {
                        skipInitCommand: !0
                    },
                    csi: {
                        rate: .01
                    },
                    client: {
                        cors: !1
                    },
                    signInDeprecation: {
                        rate: 0
                    },
                    include_granted_scopes: !0,
                    llang: "en",
                    iframes: {
                        youtube: {
                            params: {
                                location: ["search", "hash"]
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi=1",
                            methods: ["scroll", "openwindow"]
                        },
                        ytsubscribe: {
                            url: "https://www.youtube.com/subscribe_embed?usegapi=1"
                        },
                        plus_circle: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi=1"
                        },
                        plus_share: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare=true&usegapi=1"
                        },
                        rbr_s: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                        },
                        ":source:": "3p",
                        playemm: {
                            url: "https://play.google.com/work/embedded/search?usegapi=1&usegapi=1"
                        },
                        savetoandroidpay: {
                            url: "https://pay.google.com/gp/v/widget/save"
                        },
                        blogger: {
                            params: {
                                location: ["search", "hash"]
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi=1",
                            methods: ["scroll", "openwindow"]
                        },
                        evwidget: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix:_/events/widget?usegapi=1"
                        },
                        partnersbadge: {
                            url: "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi=1"
                        },
                        dataconnector: {
                            url: "https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi=1"
                        },
                        surveyoptin: {
                            url: "https://www.google.com/shopping/customerreviews/optin?usegapi=1"
                        },
                        ":socialhost:": "https://apis.google.com",
                        shortlists: {
                            url: ""
                        },
                        hangout: {
                            url: "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                        },
                        plus_followers: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/_/im/_/widget/render/plus/followers?usegapi=1"
                        },
                        post: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi=1"
                        },
                        signin: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/signin?usegapi=1",
                            methods: ["onauth"]
                        },
                        rbr_i: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                        },
                        share: {
                            url: ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi=1"
                        },
                        plusone: {
                            params: {
                                count: "",
                                size: "",
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi=1"
                        },
                        comments: {
                            params: {
                                location: ["search", "hash"]
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/comments?usegapi=1",
                            methods: ["scroll", "openwindow"]
                        },
                        ":im_socialhost:": "https://plus.googleapis.com",
                        backdrop: {
                            url: "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi=1"
                        },
                        visibility: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi=1"
                        },
                        autocomplete: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                        },
                        ":signuphost:": "https://plus.google.com",
                        ratingbadge: {
                            url: "https://www.google.com/shopping/customerreviews/badge?usegapi=1"
                        },
                        appcirclepicker: {
                            url: ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                        },
                        follow: {
                            url: ":socialhost:/:session_prefix:_/widget/render/follow?usegapi=1"
                        },
                        community: {
                            url: ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi=1"
                        },
                        sharetoclassroom: {
                            url: "https://classroom.google.com/sharewidget?usegapi=1"
                        },
                        ytshare: {
                            params: {
                                url: ""
                            },
                            url: ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi=1"
                        },
                        plus: {
                            url: ":socialhost:/:session_prefix:_/widget/render/badge?usegapi=1"
                        },
                        family_creation: {
                            params: {
                                url: ""
                            },
                            url: "https://families.google.com/webcreation?usegapi=1&usegapi=1"
                        },
                        commentcount: {
                            url: ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi=1"
                        },
                        configurator: {
                            url: ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi=1"
                        },
                        zoomableimage: {
                            url: "https://ssl.gstatic.com/microscope/embed/"
                        },
                        appfinder: {
                            url: "https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi=1"
                        },
                        savetowallet: {
                            url: "https://pay.google.com/gp/v/widget/save"
                        },
                        person: {
                            url: ":socialhost:/:session_prefix:_/widget/render/person?usegapi=1"
                        },
                        savetodrive: {
                            url: "https://drive.google.com/savetodrivebutton?usegapi=1",
                            methods: ["save"]
                        },
                        page: {
                            url: ":socialhost:/:session_prefix:_/widget/render/page?usegapi=1"
                        },
                        card: {
                            url: ":socialhost:/:session_prefix:_/hovercard/card"
                        }
                    }
                },
                h: "m;/_/scs/abc-static/_/js/k=gapi.lb.en.S0MFEB7Jrgw.O/d=1/rs=AHpOoo_rrjPu-arphKs_q6oTtOBLYqL7zQ/m=__features__",
                u: "https://apis.google.com/js/platform.js",
                hee: !0,
                dpo: !1,
                le: ["scs"]
            },
            platform: "backdrop blogger comments commentcount community donation family_creation follow hangout health page partnersbadge person playemm playreview plus plusone post ratingbadge savetoandroidpay savetodrive savetowallet sharetoclassroom shortlists signin2 surveyoptin visibility youtube ytsubscribe zoomableimage".split(" "),
            annotation: ["interactivepost", "recobar", "signin2", "autocomplete", "profile"]
        }
    });
}).call(this);