"use strict";
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//mol/ambient/ambient.ts
;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));
//mol/delegate/delegate.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//mol/owning/owning.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            if (Symbol.toStringTag in this)
                return this[Symbol.toStringTag];
            return this.name;
        }
        destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '()';
        }
        toJSON() {
            return this.toString();
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//mol/object2/object2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        promise;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            this.promise = Promise.resolve().then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));
//mol/after/tick/tick.ts
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        const mod = target.require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        const path = target.require('path');
        const fs = target.require('fs');
        let dir = path.resolve('.');
        const suffix = `./node_modules/${name}`;
        const $$ = $;
        while (!fs.existsSync(path.join(dir, suffix))) {
            const parent = path.resolve(dir, '..');
            if (parent === dir) {
                $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '--no-save', name);
                try {
                    $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '--no-save', '@types/' + name);
                }
                catch { }
                break;
            }
            else {
                dir = parent;
            }
        }
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);
//node/node.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));
//mol/log3/log3.ts
;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = `${this.uri}#${this.row}:${this.col}/${this.length}`;
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, length);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message}${this}`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(`Begin value '${begin}' out of range ${this}`);
            if (end < 0 || end > len)
                this.$.$mol_fail(`End value '${end}' out of range ${this}`);
            if (end < begin)
                this.$.$mol_fail(`End value '${end}' can't be less than begin value ${this}`);
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));
//mol/span/span.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));
//mol/tree2/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
                }
                return this.clone(sub);
            }
            else if (typeof type === 'number') {
                const sub = this.kids.slice();
                sub[type] = (sub[type] || this.list([]))
                    .insert(value, ...path.slice(1));
                return this.clone(sub.filter(Boolean));
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .map(item => item.insert(value, ...path.slice(1)))
                    .filter(Boolean);
                return this.clone(kids);
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => {
                let handle = belt[child.type] || belt[''];
                if (!handle || handle === Object.prototype[child.type]) {
                    handle = (input, belt, context) => [
                        input.clone(input.hack(belt, context), context.span)
                    ];
                }
                try {
                    return handle(child, belt, context);
                }
                catch (error) {
                    error.message += `\n${child.clone([])}${child.span}`;
                    $mol_fail_hidden(error);
                }
            }));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));
//mol/tree2/tree2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));
//mol/error/syntax/syntax.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));
//mol/tree2/from/string/string.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            return $mol_tree2.data(String.fromCharCode(...buf), [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));
//mol/tree2/from/json/json.ts
;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));
//mol/term/color/color.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { time: new Date().toISOString(), ...event };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));
//mol/log3/log3.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));
//mol/env/env.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));
//mol/env/env.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        let [app, ...args0] = command.split(' ');
        args = [...args0, ...args];
        this.$mol_log3_come({
            place: '$mol_exec',
            dir: $node.path.relative('', dir),
            message: 'Run',
            command: `${app} ${args.join(' ')}`,
        });
        var res = $node['child_process'].spawnSync(app, args, {
            cwd: $node.path.resolve(dir),
            shell: true,
            env: this.$mol_env(),
        });
        if (res.status || res.error)
            return $mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = Buffer.from([]);
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//mol/exec/exec.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//mol/dom/context/context.node.ts
;
"use strict";
var $;
(function ($) {
    let all = [];
    let el = null;
    let timer = null;
    function $mol_style_attach(id, text) {
        all.push(`/* ${id} */\n\n${text}`);
        if (timer)
            return el;
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        el = doc.createElement('style');
        el.id = `$mol_style_attach`;
        doc.head.appendChild(el);
        timer = new $mol_after_tick(() => {
            el.innerHTML = '\n' + all.join('\n\n');
            all = [];
            el = null;
            timer = null;
        });
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));
//mol/style/attach/attach.ts
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//mol/window/window.node.ts
;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));
//mol/wire/cursor/cursor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.pop();
            this.data.pop();
            if (this.data.length === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));
//mol/wire/wire.ts
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                return val[$.$mol_dev_format_head]();
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        if (typeof obj !== 'object' && typeof obj !== 'function')
            return obj;
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        if (typeof obj === 'object' && $.$mol_dev_format_head in obj) {
            return obj[$.$mol_dev_format_head]();
        }
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', {
            'vertical-align': '8%',
            ...style,
        }, ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));
//mol/dev/format/format.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
                this.data.pop();
                this.data.pop();
            }
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let tail = 0;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.data.length - 2, cursor);
                    this.data.pop();
                    this.data.pop();
                }
                else {
                    ++tail;
                }
            }
            for (; tail; --tail) {
                this.data.pop();
                this.data.pop();
            }
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/pub/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        return val && typeof val.then === 'function';
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));
//mol/promise/like/like.ts
;
"use strict";
var $;
(function ($) {
    const handled = new WeakSet();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_frame(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        [Symbol.toStringTag];
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(cursor + ' '), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    const put = (res) => {
                        if (this.cache === result)
                            this.put(res);
                        return res;
                    };
                    result = Object.assign(result.then(put, put), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result) && !handled.has(result)) {
                    result = Object.assign(result.finally(() => {
                        if (this.cache === result)
                            this.absorb();
                    }), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));
//mol/wire/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//mol/func/name/name.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));
//mol/guid/guid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    function $mol_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));
//mol/key/key.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && left.stack === right.stack;
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap([[right, true]]);
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));
//mol/compare/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                return new $mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}(#)`, task, host, args);
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));
//mol/wire/task/task.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));
//mol/wire/method/method.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
//mol/type/foot/foot.ts
;
"use strict";
var $;
(function ($) {
    const catched = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.get(error))
            return false;
        catched.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//mol/fail/catch/catch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = `${prefix}.${field}`;
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const id = `${prefix}.${task.name}(${$mol_key(key)})`;
            if (dict) {
                const existen = dict.get(id);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(id, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            const prev = this.cache;
            if ($mol_owning_check(this, prev)) {
                prev.destructor();
            }
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete(this[Symbol.toStringTag]);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));
//mol/wire/atom/atom.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));
//mol/wire/solo/solo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));
//mol/wire/plex/plex.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
//mol/mem/mem.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//mol/view/selection/selection.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//mol/wrapper/wrapper.ts
;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            return function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));
//mol/memo/memo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));
//mol/dom/qname/qname.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));
//mol/wire/probe/probe.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));
//mol/wire/watch/watch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        const current = $mol_wire_auto();
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//mol/const/const.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//mol/dom/render/attributes/attributes.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));
//mol/wire/async/async.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));
//mol/dom/render/events/events.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//mol/dom/render/styles/styles.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));
//mol/dom/render/children/children.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));
//mol/dom/render/fields/fields.ts
;
"use strict";
//mol/type/keys/extract/extract.ts
;
"use strict";
//mol/type/pick/pick.ts
;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));
//mol/decor/decor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));
//mol/style/unit/unit.ts
;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));
//mol/style/func/func.ts
;
"use strict";
//mol/type/override/override.ts
;
"use strict";
//mol/style/properties/properties.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_theme = {
        back: vary('--mol_theme_back'),
        hover: vary('--mol_theme_hover'),
        card: vary('--mol_theme_card'),
        current: vary('--mol_theme_current'),
        special: vary('--mol_theme_special'),
        text: vary('--mol_theme_text'),
        control: vary('--mol_theme_control'),
        shade: vary('--mol_theme_shade'),
        line: vary('--mol_theme_line'),
        focus: vary('--mol_theme_focus'),
        field: vary('--mol_theme_field'),
        image: vary('--mol_theme_image'),
    };
})($ || ($ = {}));
//mol/theme/theme.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 210deg;\n\t--mol_theme_luma: -1;\n\t--mol_theme_satur: 1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme] {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n}\n:where([mol_theme]) {\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme] {\n\t--mol_theme_back: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 20% ), calc( 55% + 45% * var(--mol_theme_luma) ) );\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, calc( 40% - 40% * var(--mol_theme_luma) ) );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 50% ), calc( 54% + 46% * var(--mol_theme_luma) ), .25 );\n\t\n\t--mol_theme_card: hsl( var(--mol_theme_hue), calc( var(--mol_theme_satur) * 50% ), calc( 55% + 35% * var(--mol_theme_luma) ), .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .2 );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 50%, 1 );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, calc( 55% - 10% * var(--mol_theme_luma) ) );\n\t\n}\n\n[mol_theme=\"$mol_theme_light\"] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme=\"$mol_theme_dark\"] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n}\n\n[mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50%, 40% );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 60%, 30% );\n\t--mol_theme_current: hsl( var(--mol_theme_hue), 100%, 20% );\n}\n\n[mol_theme=\"$mol_theme_current\"] {\n\tbackground-color: var(--mol_theme_back);\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% + 30% * var(--mol_theme_luma) ) );\n}\n\n[mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_card: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 55% + 35% * var(--mol_theme_luma) ), .25 );\n}\n\n[mol_theme=\"$mol_theme_accent\"] {\n\tbackground-color: var(--mol_theme_back);\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 180deg ), 90%, 50% );\n\t--mol_theme_hover: hsl( calc( var(--mol_theme_hue) + 180deg ), 80%, 35% );\n}\n\n[mol_theme=\"$mol_theme_accent\"] [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: black;\n}\n");
})($ || ($ = {}));
//mol/theme/-css/theme.css.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_gap = {
        block: vary('--mol_gap_block'),
        text: vary('--mol_gap_text'),
        round: vary('--mol_gap_round'),
        space: vary('--mol_gap_space'),
        blur: vary('--mol_gap_blur'),
    };
})($ || ($ = {}));
//mol/gap/gap.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));
//mol/gap/-css/gap.css.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    const error_showed = new WeakMap();
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        autorun() {
            try {
                this.dom_tree();
                document.title = this.title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        static autobind() {
            const nodes = $mol_dom_context.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_node(nodes.item(i));
                view.autorun();
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = next || $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                $mol_dom_render_attributes(node, { mol_view_error: error.name || error.constructor.name });
                if ($mol_promise_like(error))
                    break render;
                if ((error_showed.get(error) ?? this) !== this)
                    break render;
                try {
                    const message = error.message || error;
                    node.innerText = message.replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
                error_showed.set(error, this);
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            $mol_dom_render_styles(node, this.style_size());
            const attr = this.attr();
            const style = this.style();
            const fields = this.field();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return null;
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {};
        }
        style_size() {
            return {
                minHeight: this.minimal_height(),
                minWidth: this.minimal_width(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (check(this))
                return yield [...path, this];
            try {
                for (const item of this.sub()) {
                    if (item instanceof $mol_view) {
                        yield* item.view_find(check, [...path, this]);
                    }
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            catch (err) {
                $mol_fail_log(err);
            }
            view.dom_node().scrollIntoView({ block: align });
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            new this.$.$mol_after_frame(() => {
                this.dom_node().scrollIntoView({ block: 'start', inline: 'end' });
                this.focused(true);
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "autorun", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//mol/view/view/view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps( 20, end ) infinite;\n}\n");
})($ || ($ = {}));
//mol/view/view/-css/view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node(next) {
            const node = next || $mol_owning_get(this).host.dom_node();
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            for (let event_name in events) {
                node.addEventListener(event_name, events[event_name], { passive: false });
            }
            return node;
        }
        attr_static() {
            return {};
        }
        event() {
            return {};
        }
        render() {
            this.dom_node_actual();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_plugin.prototype, "dom_node", null);
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//mol/plugin/plugin.ts
;
"use strict";
var $;
(function ($) {
    class $mol_example extends $mol_view {
        tags() {
            return [];
        }
        aspects() {
            return [];
        }
    }
    $.$mol_example = $mol_example;
})($ || ($ = {}));
//mol/example/-view.tree/example.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/example.view.css", "[mol_example] {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/example/-css/example.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_example_large extends $mol_example {
    }
    $.$mol_example_large = $mol_example_large;
})($ || ($ = {}));
//mol/example/large/-view.tree/large.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/large/large.view.css", "[mol_example_large] {\n\tflex: 1 1 auto;\n\tflex-direction: column;\n\tbackground: var(--mol_theme_back);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n\tmax-width: 100%;\n\tmax-height: 100%;\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//mol/example/large/-css/large.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_router extends $mol_view {
        dom_name() {
            return "ion-router";
        }
    }
    $.$milkywaystd_ionui_router = $milkywaystd_ionui_router;
})($ || ($ = {}));
//milkywaystd/ionui/router/-view.tree/router.view.tree.ts
;
"use strict";
var $;
(function ($) {
    const error_showed = new WeakMap();
    class $milkywaystd_viewcontainer extends $mol_view {
        loaderElement = null;
        addLoaderElement() {
            if (!this.loaderElement) {
                this.loaderElement = this.getLoaderElement();
            }
            this.dom_node().parentNode?.insertBefore(this.loaderElement, this.dom_node());
            this.loaderElement.appendChild(this.dom_node());
        }
        removeLoaderElement() {
            this.dom_node().parentNode?.parentNode?.insertBefore(this.dom_node(), this.loaderElement);
            this.loaderElement?.remove();
        }
        getLoaderElement() {
            const templateInner = $mol_dom_context.document.querySelector("#loader-container");
            return templateInner ? templateInner.children.item(0)?.cloneNode(true) : null;
        }
        loading(value) {
            if (undefined !== value) {
                if (value) {
                    this.addLoaderElement();
                }
                else {
                    this.removeLoaderElement();
                }
                return value;
            }
            return false;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                    if (this.loading()) {
                        this.loading(false);
                    }
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                $mol_dom_render_attributes(node, { mol_view_error: error.name || error.constructor.name });
                if (error instanceof Promise) {
                    if (!this.loading()) {
                        this.loading(true);
                    }
                    break render;
                }
                if ((error_showed.get(error) ?? this) !== this)
                    break render;
                try {
                    const message = error.message || error;
                    node.innerText = message.replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
                error_showed.set(error, this);
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_viewcontainer.prototype, "loading", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_viewcontainer.prototype, "dom_tree", null);
    $.$milkywaystd_viewcontainer = $milkywaystd_viewcontainer;
})($ || ($ = {}));
//milkywaystd/viewcontainer/viewcontainer.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_component extends $milkywaystd_viewcontainer {
        classes(next) {
            if (next !== undefined)
                return next;
            return [];
        }
        attr() {
            const attr = super.attr();
            this.dom_node().classList.remove(...this.classes());
            this.dom_node().classList.add(...this.classes());
            attr['class'] = this.dom_node().classList.toString();
            return attr;
        }
        style_size() {
            return {};
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_component.prototype, "classes", null);
    $.$milkywaystd_ionui_component = $milkywaystd_ionui_component;
})($ || ($ = {}));
//milkywaystd/ionui/component/component.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_app extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-app";
        }
    }
    $.$milkywaystd_ionui_app = $milkywaystd_ionui_app;
})($ || ($ = {}));
//milkywaystd/ionui/app/-view.tree/app.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_app extends $.$milkywaystd_ionui_app {
            constructor() {
                super();
                window.document.querySelector("[id='$mol_style_attach']")?.remove();
            }
        }
        $$.$milkywaystd_ionui_app = $milkywaystd_ionui_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/app/app.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/app/app.view.css", "\n");
})($ || ($ = {}));
//milkywaystd/ionui/app/-css/app.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_routeroutlet extends $mol_view {
        dom_name() {
            return "ion-router-outlet";
        }
        sub() {
            return this.getSubs();
        }
        getSubs() {
            return [];
        }
    }
    $.$milkywaystd_ionui_routeroutlet = $milkywaystd_ionui_routeroutlet;
})($ || ($ = {}));
//milkywaystd/ionui/routeroutlet/-view.tree/routeroutlet.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_routeroutlet extends $.$milkywaystd_ionui_routeroutlet {
            auto() {
                this.dom_node().delegate = this.delegate();
                this.dom_node().addEventListener('ionNavWillLoad', this.ionNavWillLoad);
                this.dom_node().addEventListener('ionNavWillChange', this.ionNavWillChange);
                this.dom_node().addEventListener('ionNavDidChange', this.ionNavDidChange);
            }
            delegate() {
                return this;
            }
            ionNavWillChange(ev) {
            }
            ionNavWillLoad(ev) {
            }
            ionNavDidChange(ev) {
            }
            subelement(next) {
                if (next !== undefined)
                    return next;
                return null;
            }
            getSubs() {
                return this.subelement() ? [this.subelement()] : [];
            }
            attachViewToDom(container, component, propsOrDataObj, cssClasses) {
                let comp = propsOrDataObj().component;
                if (!(comp instanceof $mol_view)) {
                    comp = new comp();
                }
                const el = comp.dom_node();
                el.classList.add(...cssClasses);
                el.style.removeProperty('display');
                this.subelement(comp);
                return el;
            }
            removeViewFromDom(container, component) {
                return Promise.resolve();
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_routeroutlet.prototype, "subelement", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_routeroutlet.prototype, "getSubs", null);
        $$.$milkywaystd_ionui_routeroutlet = $milkywaystd_ionui_routeroutlet;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/routeroutlet/routeroutlet.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menu extends $mol_view {
        dom_name() {
            return "ion-menu";
        }
    }
    $.$milkywaystd_ionui_menu = $milkywaystd_ionui_menu;
})($ || ($ = {}));
//milkywaystd/ionui/menu/-view.tree/menu.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_title extends $mol_view {
        dom_name() {
            return "ion-title";
        }
    }
    $.$milkywaystd_ionui_title = $milkywaystd_ionui_title;
})($ || ($ = {}));
//milkywaystd/ionui/title/-view.tree/title.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_toolbar extends $mol_view {
        dom_name() {
            return "ion-toolbar";
        }
    }
    $.$milkywaystd_ionui_toolbar = $milkywaystd_ionui_toolbar;
})($ || ($ = {}));
//milkywaystd/ionui/toolbar/-view.tree/toolbar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_header extends $mol_view {
        dom_name() {
            return "ion-header";
        }
    }
    $.$milkywaystd_ionui_header = $milkywaystd_ionui_header;
})($ || ($ = {}));
//milkywaystd/ionui/header/-view.tree/header.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_listheader extends $mol_view {
        dom_name() {
            return "ion-list-header";
        }
    }
    $.$milkywaystd_ionui_listheader = $milkywaystd_ionui_listheader;
})($ || ($ = {}));
//milkywaystd/ionui/listheader/-view.tree/listheader.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_icon extends $mol_view {
        dom_name() {
            return "ion-icon";
        }
    }
    $.$milkywaystd_ionui_icon = $milkywaystd_ionui_icon;
})($ || ($ = {}));
//milkywaystd/ionui/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_label extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-label";
        }
    }
    $.$milkywaystd_ionui_label = $milkywaystd_ionui_label;
})($ || ($ = {}));
//milkywaystd/ionui/label/-view.tree/label.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_item extends $mol_view {
        dom_name() {
            return "ion-item";
        }
    }
    $.$milkywaystd_ionui_item = $milkywaystd_ionui_item;
})($ || ($ = {}));
//milkywaystd/ionui/item/-view.tree/item.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menutoggle extends $mol_view {
        dom_name() {
            return "ion-menu-toggle";
        }
    }
    $.$milkywaystd_ionui_menutoggle = $milkywaystd_ionui_menutoggle;
})($ || ($ = {}));
//milkywaystd/ionui/menutoggle/-view.tree/menutoggle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_content extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-content";
        }
    }
    $.$milkywaystd_ionui_content = $milkywaystd_ionui_content;
})($ || ($ = {}));
//milkywaystd/ionui/content/-view.tree/content.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_route extends $mol_view {
        sub() {
            return [
                this.IonRouter(),
                this.IonApp()
            ];
        }
        getRoutes() {
            return [];
        }
        IonRouter() {
            const obj = new this.$.$milkywaystd_ionui_router();
            obj.sub = () => this.getRoutes();
            return obj;
        }
        IonMenuI() {
            const obj = new this.$.$IonMenu();
            return obj;
        }
        RouterOutlet() {
            const obj = new this.$.$RouterOutlet();
            return obj;
        }
        IonApp() {
            const obj = new this.$.$milkywaystd_ionui_app();
            obj.sub = () => [
                this.IonMenuI(),
                this.RouterOutlet()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonRouter", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonMenuI", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "RouterOutlet", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_route.prototype, "IonApp", null);
    $.$milkywaystd_ionui_demo_route = $milkywaystd_ionui_demo_route;
    class $RouterOutlet extends $milkywaystd_ionui_routeroutlet {
        attr() {
            return {
                ...super.attr(),
                id: "outlet"
            };
        }
    }
    $.$RouterOutlet = $RouterOutlet;
    class $IonMenu extends $milkywaystd_ionui_menu {
        attr() {
            return {
                ...super.attr(),
                "content-id": "outlet"
            };
        }
        sub() {
            return [
                this.IonHeader(),
                this.MenuContent()
            ];
        }
        MenuTitleText() {
            return "Menu";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.MenuTitleText()
            ];
            return obj;
        }
        IonToolbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonToolbar()
            ];
            return obj;
        }
        ilh() {
            return "Navigation";
        }
        IonListHeader() {
            const obj = new this.$.$milkywaystd_ionui_listheader();
            obj.sub = () => [
                this.ilh()
            ];
            return obj;
        }
        ic1() {
            const obj = new this.$.$milkywaystd_ionui_icon();
            obj.attr = () => ({
                slot: "start",
                name: "home"
            });
            return obj;
        }
        hl() {
            return "Home";
        }
        il1() {
            const obj = new this.$.$milkywaystd_ionui_label();
            obj.sub = () => [
                this.hl()
            ];
            return obj;
        }
        IonItem() {
            const obj = new this.$.$milkywaystd_ionui_item();
            obj.attr = () => ({
                button: "true",
                href: "/"
            });
            obj.sub = () => [
                this.ic1(),
                this.il1()
            ];
            return obj;
        }
        IonMenuToggle() {
            const obj = new this.$.$milkywaystd_ionui_menutoggle();
            obj.sub = () => [
                this.IonItem()
            ];
            return obj;
        }
        ic3() {
            const obj = new this.$.$milkywaystd_ionui_icon();
            obj.attr = () => ({
                slot: "start",
                name: "logo-octocat"
            });
            return obj;
        }
        hl3() {
            return "Foto feed";
        }
        il3() {
            const obj = new this.$.$milkywaystd_ionui_label();
            obj.sub = () => [
                this.hl3()
            ];
            return obj;
        }
        IonItem3() {
            const obj = new this.$.$milkywaystd_ionui_item();
            obj.attr = () => ({
                button: "true",
                href: "virtual"
            });
            obj.sub = () => [
                this.ic3(),
                this.il3()
            ];
            return obj;
        }
        IonMenuToggle3() {
            const obj = new this.$.$milkywaystd_ionui_menutoggle();
            obj.sub = () => [
                this.IonItem3()
            ];
            return obj;
        }
        MenuContent() {
            const obj = new this.$.$milkywaystd_ionui_content();
            obj.sub = () => [
                this.IonListHeader(),
                this.IonMenuToggle(),
                this.IonMenuToggle3()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonToolbar", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonListHeader", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "ic1", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "il1", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonItem", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonMenuToggle", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "ic3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "il3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonItem3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "IonMenuToggle3", null);
    __decorate([
        $mol_mem
    ], $IonMenu.prototype, "MenuContent", null);
    $.$IonMenu = $IonMenu;
})($ || ($ = {}));
//milkywaystd/ionui/demo/route/-view.tree/route.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_route extends $mol_view {
        dom_name() {
            return "ion-route";
        }
    }
    $.$milkywaystd_ionui_route = $milkywaystd_ionui_route;
})($ || ($ = {}));
//milkywaystd/ionui/route/-view.tree/route.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_route extends $.$milkywaystd_ionui_route {
            component = null;
            url = null;
            cmp = null;
            constructor(component = null, url = null, cmp = null) {
                super();
                this.component = component;
                this.url = url;
                this.cmp = cmp;
            }
            attr() {
                return { ...super.attr(),
                    url: this.url,
                    id: "route_" + this.component?.toString(),
                    component: "component_" + this.component?.toString(),
                };
            }
            auto() {
                this.dom_node().componentProps = () => ({
                    component: this.component,
                });
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_route.prototype, "attr", null);
        $$.$milkywaystd_ionui_route = $milkywaystd_ionui_route;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/route/route.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_menubutton extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-menu-button";
        }
    }
    $.$milkywaystd_ionui_menubutton = $milkywaystd_ionui_menubutton;
})($ || ($ = {}));
//milkywaystd/ionui/menubutton/-view.tree/menubutton.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_buttons extends $mol_view {
        dom_name() {
            return "ion-buttons";
        }
    }
    $.$milkywaystd_ionui_buttons = $milkywaystd_ionui_buttons;
})($ || ($ = {}));
//milkywaystd/ionui/buttons/-view.tree/buttons.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_pages_page2 extends $milkywaystd_ionui_component {
        sub() {
            return [
                this.IonHeader(),
                this.IonContent()
            ];
        }
        IonMenuButton() {
            const obj = new this.$.$milkywaystd_ionui_menubutton();
            return obj;
        }
        IonButtons() {
            const obj = new this.$.$milkywaystd_ionui_buttons();
            obj.attr = () => ({
                slot: "start"
            });
            obj.sub = () => [
                this.IonMenuButton()
            ];
            return obj;
        }
        Text() {
            return "Main";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.Text()
            ];
            return obj;
        }
        IonTollbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonButtons(),
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonTollbar()
            ];
            return obj;
        }
        IonContent() {
            const obj = new this.$.$IC2();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonMenuButton", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonButtons", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonTollbar", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page2.prototype, "IonContent", null);
    $.$milkywaystd_ionui_demo_pages_page2 = $milkywaystd_ionui_demo_pages_page2;
    class $IC2 extends $milkywaystd_ionui_content {
        classes() {
            return [
                "ion-padding"
            ];
        }
        sub() {
            return [
                this.titleel()
            ];
        }
        text1() {
            return "Hello $mol!";
        }
        titleel() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.text1()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $IC2.prototype, "titleel", null);
    $.$IC2 = $IC2;
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page2/-view.tree/page2.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_route extends $.$milkywaystd_ionui_demo_route {
            getRoutes() {
                return [
                    new $milkywaystd_ionui_route(new $milkywaystd_ionui_demo_pages_page2(), '/'),
                    new $milkywaystd_ionui_route(new $$.$milkywaystd_ionui_demo_pages_page4(), '/virtual')
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_route.prototype, "getRoutes", null);
        $$.$milkywaystd_ionui_demo_route = $milkywaystd_ionui_demo_route;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/route/route.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_refreshercontent extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-refresher-content";
        }
    }
    $.$milkywaystd_ionui_refreshercontent = $milkywaystd_ionui_refreshercontent;
})($ || ($ = {}));
//milkywaystd/ionui/refreshercontent/-view.tree/refreshercontent.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_refresher extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-refresher";
        }
    }
    $.$milkywaystd_ionui_refresher = $milkywaystd_ionui_refresher;
})($ || ($ = {}));
//milkywaystd/ionui/refresher/-view.tree/refresher.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_spinner extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-spinner";
        }
    }
    $.$milkywaystd_ionui_spinner = $milkywaystd_ionui_spinner;
})($ || ($ = {}));
//milkywaystd/ionui/spinner/-view.tree/spinner.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_classes_StreamClass {
            listeners = [];
            dependents = [];
            started = false;
            value = undefined;
            changed = false;
            constructor() { }
            static create(init) {
                const stream$ = function (val) {
                    if (typeof val === "undefined") {
                        return stream$.value;
                    }
                    else {
                        stream$.started = true;
                        stream$.update(val);
                        stream$.flush();
                    }
                };
                stream$.started = !(typeof init === "undefined");
                stream$.value = init;
                stream$.changed = false;
                stream$.listeners = [];
                stream$.dependents = [];
                Object.setPrototypeOf(stream$, $milkywaystd_classes_StreamClass.prototype);
                return stream$;
            }
            static combine(combiner, streams) {
                let cached = streams.map((stream$) => stream$());
                const allHasValue = (arr) => arr.every((elem) => typeof elem !== "undefined");
                const combined$ = Stream(allHasValue(cached) ? combiner(...cached) : undefined);
                streams.forEach((stream, i) => {
                    stream.dependents.push({
                        updateDependent(val) {
                            cached[i] = val;
                            if (allHasValue(cached)) {
                                combined$.update(combiner(...cached));
                            }
                        },
                        flushDependent() {
                            combined$.flush();
                        },
                    });
                });
                return combined$;
            }
            static merge(streams) {
                const merged$ = Stream();
                streams.forEach((stream$) => {
                    stream$.subscribe((val) => merged$(val));
                });
                return merged$;
            }
            static interval(interval) {
                const interval$ = Stream();
                setInterval(() => interval$(null), interval);
                return interval$;
            }
            static fromEvent(elem, type) {
                const event$ = Stream();
                elem.addEventListener(type, event$);
                return event$;
            }
            update(val) {
                this.value = val;
                this.started = true;
                this.changed = true;
                this.dependents.forEach((dep) => dep.updateDependent(val));
            }
            flush() {
                if (this.changed) {
                    this.changed = false;
                    if (this.started) {
                        this.listeners.forEach((l) => l(this.value));
                    }
                    this.dependents.forEach((dep) => dep.flushDependent());
                }
            }
            asStream() {
                return this;
            }
            subscribe(listener, emitOnSubscribe) {
                if (emitOnSubscribe && this.started) {
                    listener(this.value);
                }
                this.listeners.push(listener);
                return this;
            }
            log(name) {
                this.subscribe((val) => console.log(`[stream] ${name}: ${JSON.stringify(val)}`));
                return this;
            }
            map(mapper) {
                return Stream.combine(mapper, [this.asStream()]);
            }
            unique() {
                let lastValue = this.value;
                const unique$ = Stream(lastValue);
                this.subscribe((val) => {
                    if (val !== lastValue) {
                        unique$(val);
                        lastValue = val;
                    }
                });
                return unique$;
            }
            filter(predict) {
                const filtered$ = Stream();
                this.subscribe((val) => {
                    if (predict(val)) {
                        filtered$(val);
                    }
                });
                return filtered$;
            }
            delay(delayInMs) {
                const delayed$ = Stream();
                this.subscribe((value) => {
                    setTimeout(() => {
                        delayed$(value);
                    }, delayInMs);
                });
                return delayed$;
            }
            trottle(delay) {
                const throttled$ = Stream();
                let timer;
                let saved = null;
                let isThrottled = false;
                this.unique().subscribe((val) => {
                    if (isThrottled) {
                        saved = val;
                        return;
                    }
                    throttled$(val);
                    timer = setTimeout(function () {
                        if (saved) {
                            throttled$(saved);
                            saved = null;
                        }
                    }, delay);
                });
                return throttled$;
            }
            auditTime(delay) {
                const throttled$ = Stream();
                let timer;
                let saved = null;
                this.unique().subscribe((val) => {
                    saved = val;
                    if (!timer) {
                        timer = setTimeout(function () {
                            if (saved) {
                                throttled$(saved);
                                saved = null;
                            }
                            timer = null;
                        }, delay);
                    }
                });
                return throttled$;
            }
            debounce(delay) {
                const debounced$ = Stream();
                let timer;
                this.unique().subscribe((val) => {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        debounced$(val);
                    }, delay);
                });
                return debounced$;
            }
            until(condition$) {
                let pending = !condition$();
                const until$ = Stream(pending ? undefined : this.value);
                condition$.subscribe((isOk) => {
                    if (isOk && pending) {
                        pending = false;
                        until$(this.value);
                    }
                });
                this.subscribe((val) => {
                    if (!condition$()) {
                        pending = true;
                    }
                    else {
                        until$(val);
                    }
                });
                return until$;
            }
        }
        $$.$milkywaystd_classes_StreamClass = $milkywaystd_classes_StreamClass;
        const Stream = Object.assign($milkywaystd_classes_StreamClass.create, $milkywaystd_classes_StreamClass);
        $$.$milkywaystd_classes_stream = Object.assign($milkywaystd_classes_StreamClass.create, $milkywaystd_classes_StreamClass);
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/classes/stream.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_classes_DefaultIterableDifferFactory {
            constructor() { }
            supports(obj) {
                return isListLikeIterable(obj);
            }
            create(trackByFn) {
                return new DefaultIterableDiffer(trackByFn);
            }
        }
        $$.$milkywaystd_classes_DefaultIterableDifferFactory = $milkywaystd_classes_DefaultIterableDifferFactory;
        const trackByIdentity = (index, item) => item;
        class DefaultIterableDiffer {
            length = 0;
            collection;
            _linkedRecords = null;
            _unlinkedRecords = null;
            _previousItHead = null;
            _itHead = null;
            _itTail = null;
            _additionsHead = null;
            _additionsTail = null;
            _movesHead = null;
            _movesTail = null;
            _removalsHead = null;
            _removalsTail = null;
            _identityChangesHead = null;
            _identityChangesTail = null;
            _trackByFn;
            constructor(trackByFn) {
                this._trackByFn = trackByFn || trackByIdentity;
            }
            forEachItem(fn) {
                let record;
                for (record = this._itHead; record !== null; record = record._next) {
                    fn(record);
                }
            }
            forEachOperation(fn) {
                let nextIt = this._itHead;
                let nextRemove = this._removalsHead;
                let addRemoveOffset = 0;
                let moveOffsets = null;
                while (nextIt || nextRemove) {
                    const record = !nextRemove ||
                        nextIt &&
                            nextIt.currentIndex <
                                getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                        nextIt :
                        nextRemove;
                    const adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
                    const currentIndex = record.currentIndex;
                    if (record === nextRemove) {
                        addRemoveOffset--;
                        nextRemove = nextRemove._nextRemoved;
                    }
                    else {
                        nextIt = nextIt._next;
                        if (record.previousIndex == null) {
                            addRemoveOffset++;
                        }
                        else {
                            if (!moveOffsets)
                                moveOffsets = [];
                            const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                            const localCurrentIndex = currentIndex - addRemoveOffset;
                            if (localMovePreviousIndex != localCurrentIndex) {
                                for (let i = 0; i < localMovePreviousIndex; i++) {
                                    const offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                                    const index = offset + i;
                                    if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                        moveOffsets[i] = offset + 1;
                                    }
                                }
                                const previousIndex = record.previousIndex;
                                moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                            }
                        }
                    }
                    if (adjPreviousIndex !== currentIndex) {
                        fn(record, adjPreviousIndex, currentIndex);
                    }
                }
            }
            forEachPreviousItem(fn) {
                let record;
                for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
                    fn(record);
                }
            }
            forEachAddedItem(fn) {
                let record;
                for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                    fn(record);
                }
            }
            forEachMovedItem(fn) {
                let record;
                for (record = this._movesHead; record !== null; record = record._nextMoved) {
                    fn(record);
                }
            }
            forEachRemovedItem(fn) {
                let record;
                for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
                    fn(record);
                }
            }
            forEachIdentityChange(fn) {
                let record;
                for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
                    fn(record);
                }
            }
            diff(collection) {
                if (collection == null)
                    collection = [];
                if (!isListLikeIterable(collection)) {
                    throw new Error(`Error trying to diff '${stringify(collection)}'. Only arrays and iterables are allowed`);
                }
                if (this.check(collection)) {
                    return this;
                }
                else {
                    return null;
                }
            }
            onDestroy() { }
            check(collection) {
                this._reset();
                let record = this._itHead;
                let mayBeDirty = false;
                let index;
                let item;
                let itemTrackBy;
                if (Array.isArray(collection)) {
                    this.length = collection.length;
                    for (let index = 0; index < this.length; index++) {
                        item = collection[index];
                        itemTrackBy = this._trackByFn(index, item);
                        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
                            record = this._mismatch(record, item, itemTrackBy, index);
                            mayBeDirty = true;
                        }
                        else {
                            if (mayBeDirty) {
                                record = this._verifyReinsertion(record, item, itemTrackBy, index);
                            }
                            if (!Object.is(record.item, item))
                                this._addIdentityChange(record, item);
                        }
                        record = record._next;
                    }
                }
                else {
                    index = 0;
                    iterateListLike(collection, (item) => {
                        itemTrackBy = this._trackByFn(index, item);
                        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
                            record = this._mismatch(record, item, itemTrackBy, index);
                            mayBeDirty = true;
                        }
                        else {
                            if (mayBeDirty) {
                                record = this._verifyReinsertion(record, item, itemTrackBy, index);
                            }
                            if (!Object.is(record.item, item))
                                this._addIdentityChange(record, item);
                        }
                        record = record._next;
                        index++;
                    });
                    this.length = index;
                }
                this._truncate(record);
                this.collection = collection;
                return this.isDirty;
            }
            get isDirty() {
                return this._additionsHead !== null || this._movesHead !== null ||
                    this._removalsHead !== null || this._identityChangesHead !== null;
            }
            _reset() {
                if (this.isDirty) {
                    let record;
                    for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                        record._nextPrevious = record._next;
                    }
                    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                        record.previousIndex = record.currentIndex;
                    }
                    this._additionsHead = this._additionsTail = null;
                    for (record = this._movesHead; record !== null; record = record._nextMoved) {
                        record.previousIndex = record.currentIndex;
                    }
                    this._movesHead = this._movesTail = null;
                    this._removalsHead = this._removalsTail = null;
                    this._identityChangesHead = this._identityChangesTail = null;
                }
            }
            _mismatch(record, item, itemTrackBy, index) {
                let previousRecord;
                if (record === null) {
                    previousRecord = this._itTail;
                }
                else {
                    previousRecord = record._prev;
                    this._remove(record);
                }
                record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                if (record !== null) {
                    if (!Object.is(record.item, item))
                        this._addIdentityChange(record, item);
                    this._reinsertAfter(record, previousRecord, index);
                }
                else {
                    record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
                    if (record !== null) {
                        if (!Object.is(record.item, item))
                            this._addIdentityChange(record, item);
                        this._moveAfter(record, previousRecord, index);
                    }
                    else {
                        record =
                            this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
                    }
                }
                return record;
            }
            _verifyReinsertion(record, item, itemTrackBy, index) {
                let reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
                if (reinsertRecord !== null) {
                    record = this._reinsertAfter(reinsertRecord, record._prev, index);
                }
                else if (record.currentIndex != index) {
                    record.currentIndex = index;
                    this._addToMoves(record, index);
                }
                return record;
            }
            _truncate(record) {
                while (record !== null) {
                    const nextRecord = record._next;
                    this._addToRemovals(this._unlink(record));
                    record = nextRecord;
                }
                if (this._unlinkedRecords !== null) {
                    this._unlinkedRecords.clear();
                }
                if (this._additionsTail !== null) {
                    this._additionsTail._nextAdded = null;
                }
                if (this._movesTail !== null) {
                    this._movesTail._nextMoved = null;
                }
                if (this._itTail !== null) {
                    this._itTail._next = null;
                }
                if (this._removalsTail !== null) {
                    this._removalsTail._nextRemoved = null;
                }
                if (this._identityChangesTail !== null) {
                    this._identityChangesTail._nextIdentityChange = null;
                }
            }
            _reinsertAfter(record, prevRecord, index) {
                if (this._unlinkedRecords !== null) {
                    this._unlinkedRecords.remove(record);
                }
                const prev = record._prevRemoved;
                const next = record._nextRemoved;
                if (prev === null) {
                    this._removalsHead = next;
                }
                else {
                    prev._nextRemoved = next;
                }
                if (next === null) {
                    this._removalsTail = prev;
                }
                else {
                    next._prevRemoved = prev;
                }
                this._insertAfter(record, prevRecord, index);
                this._addToMoves(record, index);
                return record;
            }
            _moveAfter(record, prevRecord, index) {
                this._unlink(record);
                this._insertAfter(record, prevRecord, index);
                this._addToMoves(record, index);
                return record;
            }
            _addAfter(record, prevRecord, index) {
                this._insertAfter(record, prevRecord, index);
                if (this._additionsTail === null) {
                    this._additionsTail = this._additionsHead = record;
                }
                else {
                    this._additionsTail = this._additionsTail._nextAdded = record;
                }
                return record;
            }
            _insertAfter(record, prevRecord, index) {
                const next = prevRecord === null ? this._itHead : prevRecord._next;
                record._next = next;
                record._prev = prevRecord;
                if (next === null) {
                    this._itTail = record;
                }
                else {
                    next._prev = record;
                }
                if (prevRecord === null) {
                    this._itHead = record;
                }
                else {
                    prevRecord._next = record;
                }
                if (this._linkedRecords === null) {
                    this._linkedRecords = new _DuplicateMap();
                }
                this._linkedRecords.put(record);
                record.currentIndex = index;
                return record;
            }
            _remove(record) {
                return this._addToRemovals(this._unlink(record));
            }
            _unlink(record) {
                if (this._linkedRecords !== null) {
                    this._linkedRecords.remove(record);
                }
                const prev = record._prev;
                const next = record._next;
                if (prev === null) {
                    this._itHead = next;
                }
                else {
                    prev._next = next;
                }
                if (next === null) {
                    this._itTail = prev;
                }
                else {
                    next._prev = prev;
                }
                return record;
            }
            _addToMoves(record, toIndex) {
                if (record.previousIndex === toIndex) {
                    return record;
                }
                if (this._movesTail === null) {
                    this._movesTail = this._movesHead = record;
                }
                else {
                    this._movesTail = this._movesTail._nextMoved = record;
                }
                return record;
            }
            _addToRemovals(record) {
                if (this._unlinkedRecords === null) {
                    this._unlinkedRecords = new _DuplicateMap();
                }
                this._unlinkedRecords.put(record);
                record.currentIndex = null;
                record._nextRemoved = null;
                if (this._removalsTail === null) {
                    this._removalsTail = this._removalsHead = record;
                    record._prevRemoved = null;
                }
                else {
                    record._prevRemoved = this._removalsTail;
                    this._removalsTail = this._removalsTail._nextRemoved = record;
                }
                return record;
            }
            _addIdentityChange(record, item) {
                record.item = item;
                if (this._identityChangesTail === null) {
                    this._identityChangesTail = this._identityChangesHead = record;
                }
                else {
                    this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
                }
                return record;
            }
        }
        $$.DefaultIterableDiffer = DefaultIterableDiffer;
        class IterableChangeRecord_ {
            item;
            trackById;
            currentIndex = null;
            previousIndex = null;
            _nextPrevious = null;
            _prev = null;
            _next = null;
            _prevDup = null;
            _nextDup = null;
            _prevRemoved = null;
            _nextRemoved = null;
            _nextAdded = null;
            _nextMoved = null;
            _nextIdentityChange = null;
            constructor(item, trackById) {
                this.item = item;
                this.trackById = trackById;
            }
        }
        $$.IterableChangeRecord_ = IterableChangeRecord_;
        class _DuplicateItemRecordList {
            _head = null;
            _tail = null;
            add(record) {
                if (this._head === null) {
                    this._head = this._tail = record;
                    record._nextDup = null;
                    record._prevDup = null;
                }
                else {
                    this._tail._nextDup = record;
                    record._prevDup = this._tail;
                    record._nextDup = null;
                    this._tail = record;
                }
            }
            get(trackById, atOrAfterIndex) {
                let record;
                for (record = this._head; record !== null; record = record._nextDup) {
                    if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex) &&
                        Object.is(record.trackById, trackById)) {
                        return record;
                    }
                }
                return null;
            }
            remove(record) {
                const prev = record._prevDup;
                const next = record._nextDup;
                if (prev === null) {
                    this._head = next;
                }
                else {
                    prev._nextDup = next;
                }
                if (next === null) {
                    this._tail = prev;
                }
                else {
                    next._prevDup = prev;
                }
                return this._head === null;
            }
        }
        class _DuplicateMap {
            map = new Map();
            put(record) {
                const key = record.trackById;
                let duplicates = this.map.get(key);
                if (!duplicates) {
                    duplicates = new _DuplicateItemRecordList();
                    this.map.set(key, duplicates);
                }
                duplicates.add(record);
            }
            get(trackById, atOrAfterIndex) {
                const key = trackById;
                const recordList = this.map.get(key);
                return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
            }
            remove(record) {
                const key = record.trackById;
                const recordList = this.map.get(key);
                if (recordList.remove(record)) {
                    this.map.delete(key);
                }
                return record;
            }
            get isEmpty() {
                return this.map.size === 0;
            }
            clear() {
                this.map.clear();
            }
        }
        function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
            const previousIndex = item.previousIndex;
            if (previousIndex === null)
                return previousIndex;
            let moveOffset = 0;
            if (moveOffsets && previousIndex < moveOffsets.length) {
                moveOffset = moveOffsets[previousIndex];
            }
            return previousIndex + addRemoveOffset + moveOffset;
        }
        function defaultIterableDiffersFactory() {
            return new IterableDiffers([new $milkywaystd_classes_DefaultIterableDifferFactory()]);
        }
        $$.defaultIterableDiffersFactory = defaultIterableDiffersFactory;
        class IterableDiffers {
            factories;
            constructor(factories) {
                this.factories = factories;
            }
            static create(factories, parent) {
                if (parent != null) {
                    const copied = parent.factories.slice();
                    factories = factories.concat(copied);
                }
                return new IterableDiffers(factories);
            }
            find(iterable) {
                const factory = this.factories.find(f => f.supports(iterable));
                if (factory != null) {
                    return factory;
                }
                else {
                    throw new Error(`Cannot find a differ supporting object '${iterable}' of type '${getTypeNameForDebugging(iterable)}'`);
                }
            }
        }
        $$.IterableDiffers = IterableDiffers;
        function getTypeNameForDebugging(type) {
            return type['name'] || typeof type;
        }
        $$.getTypeNameForDebugging = getTypeNameForDebugging;
        function isIterable(obj) {
            return obj !== null && typeof obj === 'object' && obj[getSymbolIterator()] !== undefined;
        }
        $$.isIterable = isIterable;
        function isListLikeIterable(obj) {
            if (!isJsObject(obj))
                return false;
            return Array.isArray(obj) ||
                (!(obj instanceof Map) &&
                    getSymbolIterator() in obj);
        }
        $$.isListLikeIterable = isListLikeIterable;
        function areIterablesEqual(a, b, comparator) {
            const iterator1 = a[getSymbolIterator()]();
            const iterator2 = b[getSymbolIterator()]();
            while (true) {
                const item1 = iterator1.next();
                const item2 = iterator2.next();
                if (item1.done && item2.done)
                    return true;
                if (item1.done || item2.done)
                    return false;
                if (!comparator(item1.value, item2.value))
                    return false;
            }
        }
        $$.areIterablesEqual = areIterablesEqual;
        function iterateListLike(obj, fn) {
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    fn(obj[i]);
                }
            }
            else {
                const iterator = obj[getSymbolIterator()]();
                let item;
                while (!((item = iterator.next()).done)) {
                    fn(item.value);
                }
            }
        }
        $$.iterateListLike = iterateListLike;
        function isJsObject(o) {
            return o !== null && (typeof o === 'function' || typeof o === 'object');
        }
        $$.isJsObject = isJsObject;
        let _symbolIterator = null;
        function getSymbolIterator() {
            if (!_symbolIterator) {
                const Symbol = _global['Symbol'];
                if (Symbol && Symbol.iterator) {
                    _symbolIterator = Symbol.iterator;
                }
                else {
                    const keys = Object.getOwnPropertyNames(Map.prototype);
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        if (key !== 'entries' && key !== 'size' &&
                            Map.prototype[key] === Map.prototype['entries']) {
                            _symbolIterator = key;
                        }
                    }
                }
            }
            return _symbolIterator;
        }
        $$.getSymbolIterator = getSymbolIterator;
        const _global = ((() => (typeof globalThis !== 'undefined' && globalThis) ||
            (typeof global !== 'undefined' && global) || (typeof window !== 'undefined' && window) ||
            (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
                self instanceof WorkerGlobalScope && self))());
        function stringify(token) {
            if (typeof token === 'string') {
                return token;
            }
            if (Array.isArray(token)) {
                return '[' + token.map(stringify).join(', ') + ']';
            }
            if (token == null) {
                return '' + token;
            }
            if (token.overriddenName) {
                return `${token.overriddenName}`;
            }
            if (token.name) {
                return `${token.name}`;
            }
            const res = token.toString();
            if (res == null) {
                return '' + res;
            }
            const newLineIndex = res.indexOf('\n');
            return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
        }
        $$.stringify = stringify;
        function concatStringsWithSpace(before, after) {
            return (before == null || before === '') ?
                (after === null ? '' : after) :
                ((after == null || after === '') ? before : before + ' ' + after);
        }
        $$.concatStringsWithSpace = concatStringsWithSpace;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/classes/DefaultIterableDiffer.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualForOf extends $mol_view {
    }
    $.$milkywaystd_scroll_VirtualForOf = $milkywaystd_scroll_VirtualForOf;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualForOF.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualScrollSpacer extends $mol_view {
    }
    $.$milkywaystd_scroll_VirtualScrollSpacer = $milkywaystd_scroll_VirtualScrollSpacer;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualScrollSpacer.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_scroll_VirtualScrollViewport extends $mol_view {
        pre_sub() {
            return [];
        }
        post_sub() {
            return [];
        }
        sub() {
            return [
                this.getForOf(),
                this.spacer()
            ];
        }
        getForOf() {
            return null;
        }
        totalContentWidth() {
            return 0;
        }
        totalContentHeight() {
            return 0;
        }
        spacer() {
            const obj = new this.$.$milkywaystd_scroll_VirtualScrollSpacer();
            obj.style = () => ({
                width: this.totalContentWidth(),
                height: this.totalContentHeight()
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "spacer", null);
    $.$milkywaystd_scroll_VirtualScrollViewport = $milkywaystd_scroll_VirtualScrollViewport;
})($ || ($ = {}));
//milkywaystd/scroll/-view.tree/VirtualScrollViewport.view.tree.ts
;
"use strict";
//milkywaystd/scroll/interface/IVirtualScrollStrategy.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_Differ {
            _diff = [];
            _map = new Map();
            create(init) {
            }
            diff(items) {
                this._diff = [];
                const s = new Set();
                for (let index = 0; index < items.length; index++) {
                    const element = items[index];
                    const idx = this._map.get(element);
                    if (idx === undefined) {
                        this._map.set(element, index);
                        this._diff.push({
                            currentIndex: index,
                            previousIndex: null,
                            item: element,
                        });
                    }
                    else if (index !== idx) {
                        this._map.set(element, index);
                    }
                    s.add(element);
                }
                this._map.forEach((value, key, map) => {
                    if (!s.has(key)) {
                        this._diff.push({
                            currentIndex: null,
                            previousIndex: value,
                            item: key,
                        });
                        map.delete(key);
                        this._diff;
                    }
                });
                return this._diff;
            }
        }
        $$.$milkywaystd_scroll_Differ = $milkywaystd_scroll_Differ;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/Differ.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_Scrollable {
            _destroyed = $milkywaystd_classes_stream(true);
            _elementScrolled = null;
            _elementRef;
            destructor() {
            }
            scrollDispatcher;
            constructor(elementRef, scrollDispatcher, dirr) {
                this._elementRef = elementRef;
                this.scrollDispatcher = scrollDispatcher;
            }
            getElementRef() {
                return this._elementRef;
            }
            deinit() {
                this.scrollDispatcher.deregister(this);
                this._destroyed(false);
            }
            Init() {
                this._elementScrolled = $milkywaystd_classes_StreamClass.fromEvent(this._elementRef, "scroll");
                this.scrollDispatcher.register(this);
            }
            elementScrolled() {
                return this._elementScrolled;
            }
            get_elementRef() {
                return this._elementRef;
            }
            dir = null;
            scrollTo(options) {
                const el = this._elementRef;
                const isRtl = this.dir && this.dir.value == "rtl";
                if (options.left == null) {
                    options.left = isRtl ? options.end : options.start;
                }
                if (options.right == null) {
                    options.right = isRtl ? options.start : options.end;
                }
                if (options.bottom != null) {
                    options.top =
                        el.scrollHeight - el.clientHeight - options.bottom;
                }
                if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
                    if (options.left != null) {
                        options.right =
                            el.scrollWidth - el.clientWidth - options.left;
                    }
                    if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                        options.left = options.right;
                    }
                    else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                        options.left = options.right
                            ? -options.right
                            : options.right;
                    }
                }
                else {
                    if (options.right != null) {
                        options.left =
                            el.scrollWidth - el.clientWidth - options.right;
                    }
                }
                this._applyScrollToOptions(options);
            }
            _applyScrollToOptions(options) {
                const el = this._elementRef;
                if (supportsScrollBehavior()) {
                    el.scrollTo(options);
                }
                else {
                    if (options.top != null) {
                        el.scrollTop = options.top;
                    }
                    if (options.left != null) {
                        el.scrollLeft = options.left;
                    }
                }
            }
            measureScrollOffset(from) {
                const LEFT = "left";
                const RIGHT = "right";
                const el = this._elementRef;
                if (from == "top") {
                    return el.scrollTop;
                }
                if (from == "bottom") {
                    return el.scrollHeight - el.clientHeight - el.scrollTop;
                }
                const isRtl = this.dir && this.dir.value == "rtl";
                if (from == "start") {
                    from = isRtl ? RIGHT : LEFT;
                }
                else if (from == "end") {
                    from = isRtl ? LEFT : RIGHT;
                }
                if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                    if (from == LEFT) {
                        return el.scrollWidth - el.clientWidth - el.scrollLeft;
                    }
                    else {
                        return el.scrollLeft;
                    }
                }
                else if (isRtl &&
                    getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                    if (from == LEFT) {
                        return el.scrollLeft + el.scrollWidth - el.clientWidth;
                    }
                    else {
                        return -el.scrollLeft;
                    }
                }
                else {
                    if (from == LEFT) {
                        return el.scrollLeft;
                    }
                    else {
                        return el.scrollWidth - el.clientWidth - el.scrollLeft;
                    }
                }
            }
        }
        $$.$milkywaystd_scroll_Scrollable = $milkywaystd_scroll_Scrollable;
        let RtlScrollAxisType;
        (function (RtlScrollAxisType) {
            RtlScrollAxisType[RtlScrollAxisType["NORMAL"] = 0] = "NORMAL";
            RtlScrollAxisType[RtlScrollAxisType["NEGATED"] = 1] = "NEGATED";
            RtlScrollAxisType[RtlScrollAxisType["INVERTED"] = 2] = "INVERTED";
        })(RtlScrollAxisType = $$.RtlScrollAxisType || ($$.RtlScrollAxisType = {}));
        let rtlScrollAxisType;
        let scrollBehaviorSupported;
        function supportsScrollBehavior() {
            if (scrollBehaviorSupported == null) {
                if (typeof document !== "object" ||
                    !document ||
                    typeof Element !== "function" ||
                    !Element) {
                    scrollBehaviorSupported = false;
                    return scrollBehaviorSupported;
                }
                if ("scrollBehavior" in document.documentElement.style) {
                    scrollBehaviorSupported = true;
                }
                else {
                    const scrollToFunction = Element.prototype.scrollTo;
                    if (scrollToFunction) {
                        scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(scrollToFunction.toString());
                    }
                    else {
                        scrollBehaviorSupported = false;
                    }
                }
            }
            return scrollBehaviorSupported;
        }
        $$.supportsScrollBehavior = supportsScrollBehavior;
        function getRtlScrollAxisType() {
            if (typeof document !== "object" || !document) {
                return RtlScrollAxisType.NORMAL;
            }
            if (rtlScrollAxisType == null) {
                const scrollContainer = document.createElement("div");
                const containerStyle = scrollContainer.style;
                scrollContainer.dir = "rtl";
                containerStyle.width = "1px";
                containerStyle.overflow = "auto";
                containerStyle.visibility = "hidden";
                containerStyle.pointerEvents = "none";
                containerStyle.position = "absolute";
                const content = document.createElement("div");
                const contentStyle = content.style;
                contentStyle.width = "2px";
                contentStyle.height = "1px";
                scrollContainer.appendChild(content);
                document.body.appendChild(scrollContainer);
                rtlScrollAxisType = RtlScrollAxisType.NORMAL;
                if (scrollContainer.scrollLeft === 0) {
                    scrollContainer.scrollLeft = 1;
                    rtlScrollAxisType =
                        scrollContainer.scrollLeft === 0
                            ? RtlScrollAxisType.NEGATED
                            : RtlScrollAxisType.INVERTED;
                }
                scrollContainer.remove();
            }
            return rtlScrollAxisType;
        }
        $$.getRtlScrollAxisType = getRtlScrollAxisType;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/Scrollable.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        let _ViewRepeaterOperation;
        (function (_ViewRepeaterOperation) {
            _ViewRepeaterOperation[_ViewRepeaterOperation["REPLACED"] = 0] = "REPLACED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["INSERTED"] = 1] = "INSERTED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["MOVED"] = 2] = "MOVED";
            _ViewRepeaterOperation[_ViewRepeaterOperation["REMOVED"] = 3] = "REMOVED";
        })(_ViewRepeaterOperation = $$._ViewRepeaterOperation || ($$._ViewRepeaterOperation = {}));
        class $milkywaystd_scroll_RecycleViewRepeaterStrategy {
            viewCacheSize = 20;
            _viewCache = [];
            applyChanges2(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                if (!changes.length)
                    return;
                viewContainerRef.startMutation();
                changes.sort((a, b) => { return a.currentIndex === null && b.currentIndex !== null ? -1 : 1; });
                for (const record of changes) {
                    let adjustedPreviousIndex = record.previousIndex;
                    let currentIndex = record.currentIndex;
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = view
                            ? _ViewRepeaterOperation.INSERTED
                            : _ViewRepeaterOperation.REPLACED;
                    }
                    else if (currentIndex == null) {
                        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                }
                viewContainerRef.applyMutation();
            }
            applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = view ? _ViewRepeaterOperation.INSERTED : _ViewRepeaterOperation.REPLACED;
                    }
                    else if (currentIndex == null) {
                        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                });
            }
            detach() {
                for (const view of this._viewCache) {
                    if (view.destroy)
                        view.destroy();
                }
                this._viewCache = [];
            }
            _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
                const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
                if (cachedView) {
                    cachedView.implicit(value);
                    return undefined;
                }
                const viewArgs = viewArgsFactory();
                return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
            }
            _detachAndCacheView(index, viewContainerRef) {
                const detachedView = viewContainerRef.detach(index);
                if (detachedView)
                    this._maybeCacheView(detachedView, viewContainerRef);
            }
            _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
                const view = viewContainerRef.get(adjustedPreviousIndex);
                viewContainerRef.move(view, currentIndex);
                view.implicit(value);
                return view;
            }
            _maybeCacheView(view, viewContainerRef) {
                if (this._viewCache.length < this.viewCacheSize) {
                    this._viewCache.push(view);
                }
                else {
                    const index = viewContainerRef.indexOf(view);
                    if (index === -1) {
                        console.warn("SET DESTROY FUNCTION!");
                    }
                    else {
                        viewContainerRef.remove(index);
                    }
                }
            }
            _insertViewFromCache(index, viewContainerRef) {
                const cachedView = this._viewCache.pop();
                if (cachedView) {
                    viewContainerRef.insert(cachedView, index);
                }
                return cachedView || null;
            }
        }
        $$.$milkywaystd_scroll_RecycleViewRepeaterStrategy = $milkywaystd_scroll_RecycleViewRepeaterStrategy;
        class $milkywaystd_scroll_DisposeViewRepeaterStrategy {
            applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
                let mutStarted = false;
                changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
                    if (!mutStarted) {
                        mutStarted = true;
                    }
                    let view;
                    let operation;
                    if (record.previousIndex == null) {
                        const insertContext = itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                        view = viewContainerRef.createEmbeddedView(insertContext.templateRef, insertContext.context, insertContext.index);
                        operation = _ViewRepeaterOperation.INSERTED;
                    }
                    else if (currentIndex == null) {
                        viewContainerRef.remove(adjustedPreviousIndex);
                        operation = _ViewRepeaterOperation.REMOVED;
                    }
                    else {
                        view = viewContainerRef.get(adjustedPreviousIndex);
                        viewContainerRef.move(view, currentIndex);
                        operation = _ViewRepeaterOperation.MOVED;
                    }
                    if (itemViewChanged) {
                        itemViewChanged({
                            context: view?.context,
                            operation,
                            record,
                        });
                    }
                });
                return mutStarted;
            }
            detach() { }
        }
        $$.$milkywaystd_scroll_DisposeViewRepeaterStrategy = $milkywaystd_scroll_DisposeViewRepeaterStrategy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ViewRepeater.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function getOffset(orientation, direction, node) {
            const el = node;
            if (!el.getBoundingClientRect) {
                return 0;
            }
            const rect = el.getBoundingClientRect();
            if (orientation === "horizontal") {
                return direction === "start" ? rect.left : rect.right;
            }
            return direction === "start" ? rect.top : rect.bottom;
        }
        class $milkywaystd_scroll_VirtualForOf extends $.$mol_view {
            viewChange = $milkywaystd_classes_stream();
            _dataSourceChanges = $milkywaystd_classes_stream();
            get cdkVirtualForOf() {
                return this._cdkVirtualForOf;
            }
            set cdkVirtualForOf(value) {
                this._cdkVirtualForOf = value;
                this._dataSourceChanges(value);
            }
            _cdkVirtualForOf;
            sub() {
                return this.calculatedSubs();
            }
            calculatedSubs(val) {
                if (undefined !== val) {
                    return val;
                }
                return [];
            }
            idx = 0;
            get cdkVirtualForTrackBy() {
                return this._cdkVirtualForTrackBy;
            }
            set cdkVirtualForTrackBy(fn) {
                this._needsUpdate = true;
                this._cdkVirtualForTrackBy = fn
                    ? (index, item) => fn(index +
                        (this._renderedRange
                            ? this._renderedRange.start
                            : 0), item)
                    : undefined;
            }
            _cdkVirtualForTrackBy;
            set cdkVirtualForTemplate(value) {
                if (value) {
                    this._needsUpdate = true;
                    this._template = value;
                }
            }
            get cdkVirtualForTemplateCacheSize() {
                return this._viewRepeater.viewCacheSize;
            }
            set cdkVirtualForTemplateCacheSize(size) {
                this._viewRepeater.viewCacheSize = size;
            }
            dataStream = this._dataSourceChanges;
            _differ = new $milkywaystd_classes_DefaultIterableDifferFactory().create();
            _data;
            _renderedItems;
            _renderedRange = { start: 0, end: 0 };
            _needsUpdate = false;
            _destroyed = $milkywaystd_classes_stream();
            _viewContainerRef() {
                return this;
            }
            _template = null;
            _viewRepeater = new $milkywaystd_scroll_RecycleViewRepeaterStrategy();
            _viewport = null;
            init() {
                this.dataStream.subscribe((data) => {
                    this._data = data;
                    this._onRenderedDataChange();
                });
                this._viewport?.renderedRangeStream.subscribe((range) => {
                    this._renderedRange = range;
                    this.viewChange(this._renderedRange);
                    this._onRenderedDataChange();
                });
                this._viewport?.attach(this);
            }
            measureRangeSize(range, orientation) {
                if (range.start >= range.end) {
                    return 0;
                }
                if (range.start < this._renderedRange.start ||
                    range.end > this._renderedRange.end) {
                    throw Error(`Error: attempted to measure an item that isn't rendered.`);
                }
                const renderedStartIndex = range.start - this._renderedRange.start;
                const rangeLen = range.end - range.start;
                let firstNode;
                let lastNode;
                for (let i = 0; i < rangeLen; i++) {
                    const view = this._viewContainerRef()
                        .get(i + renderedStartIndex)
                        .dom_node();
                    if (view && view.rootNodes.length) {
                        firstNode = lastNode = view.rootNodes[0];
                        break;
                    }
                }
                for (let i = rangeLen - 1; i > -1; i--) {
                    const view = this._viewContainerRef()
                        .get(i + renderedStartIndex)
                        .dom_node();
                    if (view && view.rootNodes.length) {
                        lastNode = view.rootNodes[view.rootNodes.length - 1];
                        break;
                    }
                }
                return firstNode && lastNode
                    ? getOffset(orientation, "end", lastNode) -
                        getOffset(orientation, "start", firstNode)
                    : 0;
            }
            ngDoCheck() {
                if (this._differ && this._needsUpdate) {
                    const changes = this._differ.diff(this._renderedItems);
                    if (!changes) {
                        this._updateContext();
                    }
                    else {
                        this._applyChanges(changes);
                    }
                    this._needsUpdate = false;
                }
            }
            destructor() {
                console.log("VOF DESTRUCTOR");
                this._viewRepeater.detach();
            }
            _onRenderedDataChange() {
                if (!this._renderedRange) {
                    return;
                }
                this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
                this._needsUpdate = true;
                this.ngDoCheck();
            }
            _updateContext() {
                const count = this._data.length;
                let i = this.tempSubs.length;
                while (i--) {
                    const view = this._viewContainerRef().get(i);
                    view.context.index = this._renderedRange.start + i;
                    view.context.count = count;
                    this._updateComputedContextProperties(view.context);
                }
            }
            _applyChanges(changes) {
                this._viewRepeater.applyChanges(changes, this._viewContainerRef(), (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
                changes.forEachIdentityChange((record) => {
                    const view = this._viewContainerRef().get(record.currentIndex);
                    view.implicit(record.item);
                });
                const count = this._data.length;
                let i = this.tempSubs.length;
                while (i--) {
                    const view = this._viewContainerRef().get(i);
                    const context = view.context();
                    context.index = this._renderedRange.start + i;
                    context.count = count;
                    this._updateComputedContextProperties(context);
                }
                this.applyMutation();
            }
            _updateComputedContextProperties(context) {
                context.first = context.index === 0;
                context.last = context.index === context.count - 1;
                context.even = context.index % 2 === 0;
                context.odd = !context.even;
            }
            _getEmbeddedViewArgs(record, index) {
                return {
                    templateRef: this._template,
                    context: {
                        implicit: record.item,
                        cdkVirtualForOf: this._cdkVirtualForOf,
                        index: -1,
                        count: -1,
                        first: false,
                        last: false,
                        odd: false,
                        even: false,
                    },
                    index,
                };
            }
            mutationstarted = false;
            tempSubs = [];
            startMutation() {
                if (this.mutationstarted)
                    throw new Error("already mutation");
                this.mutationstarted = true;
                this.tempSubs = [...this.calculatedSubs()];
            }
            applyMutation() {
                this.calculatedSubs([...this.tempSubs]);
                this.mutationstarted = false;
            }
            indexOf(view) {
                return this.tempSubs.indexOf(view);
            }
            insert(view, index) {
                this.tempSubs.splice(index, 0, view);
            }
            move(view, index) {
            }
            remove(index) {
                let removed = this.tempSubs.splice(index, 1);
                if (removed && removed.length) {
                    removed = removed[0];
                    removed._index = null;
                }
                else {
                    return null;
                }
                return removed;
            }
            detach(index) {
                const detached = this.remove(index);
                return detached;
            }
            get(index) {
                return this.tempSubs[index];
            }
            createEmbeddedView(templateRef, context, index) {
                if (!templateRef)
                    throw new Error("templateRef is not a function");
                const b = templateRef();
                b.onData(context);
                this.insert(b, index);
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualForOf.prototype, "calculatedSubs", null);
        $$.$milkywaystd_scroll_VirtualForOf = $milkywaystd_scroll_VirtualForOf;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualForOf.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/scroll/scroll.view.css", "\n[milkywaystd_scroll_virtualscrollviewport] {\n\tdisplay: block;\n\tposition: relative;\n\ttransform: translateZ(0);\n  }\n  \n  \n  .cdkvirtualscrollable {\n\toverflow: auto;\n\twill-change: scroll-position;\n\tcontain: strict;\n\t-webkit-overflow-scrolling: touch;\n  }\n  \n  \n  [milkywaystd_scroll_virtualforof] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tcontain: content;\n  \twidth: 100%;\n\ttransition: none;\n\tdisplay: block;\n  }\n  \n  /*.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n\tmin-height: 100%;\n\t\n  }\n  \n  .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {\n\tmin-width: 100%;\n  \n  }*/\n  \n  \n  [milkywaystd_scroll_virtualscrollspacer] {\n\theight: 1px;\n\ttransform-origin: 0 0;\n\tflex: 0 0 auto; \n  display: block;\n   \n  }\n");
})($ || ($ = {}));
//milkywaystd/scroll/-css/scroll.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_VirtualScrollViewport extends $.$milkywaystd_scroll_VirtualScrollViewport {
            forOf = null;
            forOfCtl = null;
            getForOf() {
                if (!this.forOf) {
                    this.forOfCtl = new $milkywaystd_scroll_VirtualScrollViewportController(this.dom_node(), new $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy(this.itemHeight(), this.minBufferPx(), this.maxBufferPx()), null, new $milkywaystd_scroll_ScrollDispatcher(window.document), new $milkywaystd_scroll_ViewportRuler(window.document));
                    this.forOfCtl.Init();
                    this.forOf = new $milkywaystd_scroll_VirtualForOf();
                    this.forOf.cdkVirtualForTemplate = this.itemRendererFactory;
                    this.forOfCtl._contentWrapper = this.forOf.dom_node();
                    this.forOf._viewport = this.forOfCtl;
                    this.forOf.init();
                }
                return this.forOf;
            }
            auto() {
                console.log("AAA");
            }
            itemHeight() {
                return 0;
            }
            itemRendererFactory() {
                return null;
            }
            setData(data) {
                this.forOf?.dataStream(data);
            }
            totalContentWidth() {
                return this.forOfCtl?._totalContentWidth();
            }
            totalContentHeight() {
                return this.forOfCtl?._totalContentHeight();
            }
            minBufferPx() {
                return 100;
            }
            maxBufferPx() {
                return 200;
            }
            sub() {
                return [...this.pre_sub(), ...super.sub(), ...this.post_sub()];
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "totalContentWidth", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewport.prototype, "totalContentHeight", null);
        $$.$milkywaystd_scroll_VirtualScrollViewport = $milkywaystd_scroll_VirtualScrollViewport;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollViewport.view.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $$.DEFAULT_RESIZE_TIME = 20;
        class $milkywaystd_scroll_ViewportRuler {
            _viewportSize = null;
            _change = $milkywaystd_classes_stream();
            _changeListener = (event) => {
                this._change(event);
            };
            _document;
            constructor(document) {
                this._document = document;
                const window = this._getWindow();
                window.addEventListener('resize', this._changeListener);
                window.addEventListener('orientationchange', this._changeListener);
                this.change().subscribe(() => (this._viewportSize = null));
            }
            ngOnDestroy() {
            }
            getViewportSize() {
                if (!this._viewportSize) {
                    this._updateViewportSize();
                }
                const output = { width: this._viewportSize.width, height: this._viewportSize.height };
                return output;
            }
            getViewportRect() {
                const scrollPosition = this.getViewportScrollPosition();
                const { width, height } = this.getViewportSize();
                return {
                    top: scrollPosition.top,
                    left: scrollPosition.left,
                    bottom: scrollPosition.top + height,
                    right: scrollPosition.left + width,
                    height,
                    width,
                };
            }
            getViewportScrollPosition() {
                const document = this._document;
                const window = this._getWindow();
                const documentElement = document.documentElement;
                const documentRect = documentElement.getBoundingClientRect();
                const top = -documentRect.top ||
                    document.body.scrollTop ||
                    window.scrollY ||
                    documentElement.scrollTop ||
                    0;
                const left = -documentRect.left ||
                    document.body.scrollLeft ||
                    window.scrollX ||
                    documentElement.scrollLeft ||
                    0;
                return { top, left };
            }
            change(throttleTime = $$.DEFAULT_RESIZE_TIME) {
                return throttleTime > 0 ? this._change.auditTime(throttleTime) : this._change;
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _updateViewportSize() {
                const window = this._getWindow();
                this._viewportSize = { width: window.innerWidth, height: window.innerHeight };
            }
        }
        $$.$milkywaystd_scroll_ViewportRuler = $milkywaystd_scroll_ViewportRuler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ViewportRuler.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_ScrollDispatcher {
            _document;
            constructor(document) {
                this._document = document;
            }
            _scrolled = $milkywaystd_classes_stream();
            _globalSubscription = null;
            _scrolledCount = 0;
            scrollContainers = new Map();
            register(scrollable) {
                if (!this.scrollContainers.has(scrollable)) {
                    this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled(scrollable)));
                }
            }
            deregister(scrollable) {
                const scrollableReference = this.scrollContainers.get(scrollable);
                if (scrollableReference) {
                    this.scrollContainers.delete(scrollable);
                }
            }
            scrolled(auditTimeInMs = 20) {
                if (!this._globalSubscription) {
                    this._addGlobalListener();
                }
                const subscription = auditTimeInMs > 0
                    ? this._scrolled.auditTime(auditTimeInMs)
                    : this._scrolled;
                this._scrolledCount++;
                return subscription;
            }
            ngOnDestroy() {
                this._removeGlobalListener();
                this.scrollContainers.forEach((_, container) => this.deregister(container));
            }
            ancestorScrolled(elementOrElementRef, auditTimeInMs) {
                const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
                return this.scrolled(auditTimeInMs).filter(target => {
                    return !target || ancestors.indexOf(target) > -1;
                });
            }
            getAncestorScrollContainers(elementOrElementRef) {
                const scrollingContainers = [];
                this.scrollContainers.forEach((_subscription, scrollable) => {
                    if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
                        scrollingContainers.push(scrollable);
                    }
                });
                return scrollingContainers;
            }
            _getWindow() {
                return this._document.defaultView || window;
            }
            _scrollableContainsElement(scrollable, elementOrElementRef) {
                let element = elementOrElementRef;
                let scrollableElement = scrollable.getElementRef();
                do {
                    if (element == scrollableElement) {
                        return true;
                    }
                } while ((element = element.parentElement));
                return false;
            }
            _addGlobalListener() {
                this._globalSubscription = $milkywaystd_classes_stream.fromEvent(window.document, 'scroll').subscribe(() => this._scrolled());
            }
            _removeGlobalListener() {
                if (this._globalSubscription) {
                    this._globalSubscription = null;
                }
            }
        }
        $$.$milkywaystd_scroll_ScrollDispatcher = $milkywaystd_scroll_ScrollDispatcher;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/ScrollDispatcher.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_VirtualScrollable extends $milkywaystd_scroll_Scrollable {
            constructor(elementRef, scrollDispatcher, dir) {
                super(elementRef, scrollDispatcher, dir);
            }
            measureViewportSize(orientation) {
                const viewportEl = this._elementRef;
                return orientation === 'horizontal' ? viewportEl.clientWidth : viewportEl.clientHeight;
            }
        }
        $$.$milkywaystd_scroll_VirtualScrollable = $milkywaystd_scroll_VirtualScrollable;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollable.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function rangesEqual(r1, r2) {
            return r1.start == r2.start && r1.end == r2.end;
        }
        class $milkywaystd_scroll_VirtualScrollViewportController extends $milkywaystd_scroll_VirtualScrollable {
            _detachedSubject = $milkywaystd_classes_stream();
            _renderedRangeSubject = $milkywaystd_classes_stream();
            orientation(orientation) {
                if (orientation !== undefined) {
                    return orientation;
                }
                return 'vertical';
            }
            get appendOnly() {
                return this._appendOnly;
            }
            set appendOnly(value) {
                this._appendOnly = value;
            }
            _appendOnly = false;
            scrolledIndexChange = $milkywaystd_classes_stream();
            _contentWrapper = null;
            renderedRangeStream = this._renderedRangeSubject;
            _totalContentSize(size) {
                if (undefined !== size)
                    return size;
                return 0;
            }
            ;
            _totalContentWidth() {
                this.orientation() === 'horizontal' ? `${this._totalContentSize()}px` : '';
            }
            ;
            _totalContentHeight() {
                return this.orientation() === 'horizontal' ? '' : `${this._totalContentSize()}px`;
            }
            ;
            _renderedContentTransform = '';
            _renderedRange = { start: 0, end: 0 };
            _dataLength = 0;
            _viewportSize = 0;
            _forOf = null;
            _renderedContentOffset = 0;
            _renderedContentOffsetNeedsRewrite = false;
            _isChangeDetectionPending = false;
            _runAfterChangeDetection = [];
            _viewportChanges = null;
            _scrollStrategy;
            scrollable;
            subscripion;
            constructor(elementRef, scrollStrategy, dir, scrollDispatcher, viewportRuler, scrollable) {
                super(elementRef, scrollDispatcher, dir);
                if (!scrollStrategy) {
                    throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
                }
                this.scrollable = scrollable;
                this._scrollStrategy = scrollStrategy;
                this._viewportChanges = viewportRuler.change().subscribe(() => {
                    this.checkViewportSize();
                });
                if (!this.scrollable) {
                    this._elementRef.classList.add('cdkvirtualscrollable');
                    this.scrollable = this;
                }
                this._scrollStrategy.scrolledIndexChange?.subscribe(() => Promise.resolve().then(this.scrolledIndexChange));
            }
            Init() {
                if (this.scrollable === this) {
                    super.Init();
                }
                Promise.resolve().then(() => {
                    this._measureViewportSize();
                    this._scrollStrategy.attach(this);
                    this.subscripion = this.scrollable?.elementScrolled()
                        .auditTime(0)
                        .subscribe(() => this._scrollStrategy.onContentScrolled());
                    this.subscripion(null);
                    this._markChangeDetectionNeeded();
                });
            }
            deinit() {
                this.detach();
                this._scrollStrategy.detach();
                super.deinit();
            }
            attach(forOf) {
                if (this._forOf) {
                    throw Error('$milkywaystd_scroll_VirtualForOf is already attached.');
                }
                this._forOf = forOf;
                this._forOf.dataStream.subscribe(data => {
                    const newLength = data.length;
                    if (newLength !== this._dataLength) {
                        this._dataLength = newLength;
                        this._scrollStrategy.onDataLengthChanged();
                    }
                    this._doChangeDetection();
                });
            }
            detach() {
                this._forOf = null;
                this._detachedSubject();
            }
            getDataLength() {
                return this._dataLength;
            }
            getViewportSize() {
                return this._viewportSize;
            }
            getRenderedRange() {
                return this._renderedRange;
            }
            measureBoundingClientRectWithScrollOffset(from) {
                return this.getElementRef().getBoundingClientRect()[from];
            }
            setTotalContentSize(size) {
                if (this._totalContentSize() !== size) {
                    this._totalContentSize(size);
                    this._markChangeDetectionNeeded();
                }
            }
            setRenderedRange(range) {
                if (!rangesEqual(this._renderedRange, range)) {
                    if (this.appendOnly) {
                        range = { start: 0, end: Math.max(this._renderedRange.end, range.end) };
                    }
                    this._renderedRangeSubject((this._renderedRange = range));
                    this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
                }
            }
            getOffsetToRenderedContentStart() {
                return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
            }
            setRenderedContentOffset(offset, to = 'to-start') {
                offset = this.appendOnly && to === 'to-start' ? 0 : offset;
                const isRtl = this.dir && this.dir.value == 'rtl';
                const isHorizontal = this.orientation() == 'horizontal';
                const axis = isHorizontal ? 'X' : 'Y';
                const axisDirection = isHorizontal && isRtl ? -1 : 1;
                let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
                this._renderedContentOffset = offset;
                if (to === 'to-end') {
                    transform += ` translate${axis}(-100%)`;
                    this._renderedContentOffsetNeedsRewrite = true;
                }
                if (this._renderedContentTransform != transform) {
                    this._renderedContentTransform = transform;
                    this._markChangeDetectionNeeded(() => {
                        if (this._renderedContentOffsetNeedsRewrite) {
                            this._renderedContentOffset -= this.measureRenderedContentSize();
                            this._renderedContentOffsetNeedsRewrite = false;
                            this.setRenderedContentOffset(this._renderedContentOffset);
                        }
                        else {
                            this._scrollStrategy.onRenderedOffsetChanged();
                        }
                    });
                }
            }
            scrollToOffset(offset, behavior = 'auto') {
                const options = { behavior };
                if (this.orientation() === 'horizontal') {
                    options.start = offset;
                }
                else {
                    options.top = offset;
                }
                this.scrollable.scrollTo(options);
            }
            scrollToIndex(index, behavior = 'auto') {
                this._scrollStrategy.scrollToIndex(index, behavior);
            }
            measureScrollOffset(from) {
                let measureScrollOffset;
                if (this.scrollable == this) {
                    measureScrollOffset = (_from) => super.measureScrollOffset(_from);
                }
                else {
                    measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
                }
                return Math.max(0, measureScrollOffset(from ?? (this.orientation() === 'horizontal' ? 'start' : 'top')) -
                    this.measureViewportOffset());
            }
            measureViewportOffset(from) {
                let fromRect;
                const LEFT = 'left';
                const RIGHT = 'right';
                const isRtl = this.dir?.value == 'rtl';
                if (from == 'start') {
                    fromRect = isRtl ? RIGHT : LEFT;
                }
                else if (from == 'end') {
                    fromRect = isRtl ? LEFT : RIGHT;
                }
                else if (from) {
                    fromRect = from;
                }
                else {
                    fromRect = this.orientation() === 'horizontal' ? 'left' : 'top';
                }
                const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
                const viewportClientRect = this._elementRef.getBoundingClientRect()[fromRect];
                return viewportClientRect - scrollerClientRect;
            }
            measureRenderedContentSize() {
                const contentEl = this._contentWrapper;
                return this.orientation() === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
            }
            measureRangeSize(range) {
                if (!this._forOf) {
                    return 0;
                }
                return this._forOf.measureRangeSize(range, this.orientation());
            }
            checkViewportSize() {
                this._measureViewportSize();
                this._scrollStrategy.onDataLengthChanged();
            }
            _measureViewportSize() {
                this._viewportSize = this.scrollable.measureViewportSize(this.orientation());
            }
            _markChangeDetectionNeeded(runAfter) {
                if (runAfter) {
                    this._runAfterChangeDetection.push(runAfter);
                }
                if (!this._isChangeDetectionPending) {
                    this._isChangeDetectionPending = true;
                    Promise.resolve().then(() => {
                        this._doChangeDetection();
                    });
                }
            }
            _doChangeDetection() {
                this._isChangeDetectionPending = false;
                this._contentWrapper.style.transform = this._renderedContentTransform;
                const runAfterChangeDetection = this._runAfterChangeDetection;
                this._runAfterChangeDetection = [];
                for (const fn of runAfterChangeDetection) {
                    fn();
                }
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "orientation", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentSize", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentWidth", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_scroll_VirtualScrollViewportController.prototype, "_totalContentHeight", null);
        $$.$milkywaystd_scroll_VirtualScrollViewportController = $milkywaystd_scroll_VirtualScrollViewportController;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/VirtualScrollViewportController.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy {
            _scrolledIndexChange = $milkywaystd_classes_stream();
            scrolledIndexChange = this._scrolledIndexChange.unique();
            _viewport = null;
            _itemSize;
            _minBufferPx;
            _maxBufferPx;
            constructor(itemSize, minBufferPx, maxBufferPx) {
                this._itemSize = itemSize;
                this._minBufferPx = minBufferPx;
                this._maxBufferPx = maxBufferPx;
            }
            attach(viewport) {
                this._viewport = viewport;
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            detach() {
                this._viewport = null;
            }
            updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
                if (maxBufferPx < minBufferPx) {
                    throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
                }
                this._itemSize = itemSize;
                this._minBufferPx = minBufferPx;
                this._maxBufferPx = maxBufferPx;
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            onContentScrolled() {
                this._updateRenderedRange();
            }
            onDataLengthChanged() {
                this._updateTotalContentSize();
                this._updateRenderedRange();
            }
            onContentRendered() {
            }
            onRenderedOffsetChanged() {
            }
            scrollToIndex(index, behavior) {
                if (this._viewport) {
                    this._viewport.scrollToOffset(index * this._itemSize, behavior);
                }
            }
            _updateTotalContentSize() {
                if (!this._viewport) {
                    return;
                }
                this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
            }
            _updateRenderedRange() {
                if (!this._viewport) {
                    return;
                }
                const renderedRange = this._viewport.getRenderedRange();
                const newRange = { start: renderedRange.start, end: renderedRange.end };
                const viewportSize = this._viewport.getViewportSize();
                const dataLength = this._viewport.getDataLength();
                let scrollOffset = this._viewport.measureScrollOffset();
                let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
                if (newRange.end > dataLength) {
                    const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
                    const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
                    if (firstVisibleIndex != newVisibleIndex) {
                        firstVisibleIndex = newVisibleIndex;
                        scrollOffset = newVisibleIndex * this._itemSize;
                        newRange.start = Math.floor(firstVisibleIndex);
                    }
                    newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
                }
                const startBuffer = scrollOffset - newRange.start * this._itemSize;
                if (startBuffer < this._minBufferPx && newRange.start != 0) {
                    const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
                    newRange.start = Math.max(0, newRange.start - expandStart);
                    newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
                }
                else {
                    const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
                    if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
                        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
                        if (expandEnd > 0) {
                            newRange.end = Math.min(dataLength, newRange.end + expandEnd);
                            newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
                        }
                    }
                }
                this._viewport.setRenderedRange(newRange);
                this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
                this._scrolledIndexChange(Math.floor(firstVisibleIndex));
            }
        }
        $$.$milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy = $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/scroll/strategy/FixedSizeVirtualScrollStrategy.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_pages_page4 extends $milkywaystd_ionui_component {
        sub() {
            return [
                this.IonHeader(),
                this.IonContent()
            ];
        }
        IonMenuButton() {
            const obj = new this.$.$milkywaystd_ionui_menubutton();
            return obj;
        }
        IonButtons() {
            const obj = new this.$.$milkywaystd_ionui_buttons();
            obj.attr = () => ({
                slot: "start"
            });
            obj.sub = () => [
                this.IonMenuButton()
            ];
            return obj;
        }
        Text() {
            return "Foto feed";
        }
        IonTitle() {
            const obj = new this.$.$milkywaystd_ionui_title();
            obj.sub = () => [
                this.Text()
            ];
            return obj;
        }
        IonTollbar() {
            const obj = new this.$.$milkywaystd_ionui_toolbar();
            obj.sub = () => [
                this.IonButtons(),
                this.IonTitle()
            ];
            return obj;
        }
        IonHeader() {
            const obj = new this.$.$milkywaystd_ionui_header();
            obj.sub = () => [
                this.IonTollbar()
            ];
            return obj;
        }
        ionRefresh(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        getRefersherDisabled() {
            return true;
        }
        RefresherContent() {
            const obj = new this.$.$milkywaystd_ionui_refreshercontent();
            return obj;
        }
        Refresher() {
            const obj = new this.$.$milkywaystd_ionui_refresher();
            obj.event = () => ({
                ionRefresh: (val) => this.ionRefresh(val)
            });
            obj.attr = () => ({
                slot: "fixed",
                disabled: this.getRefersherDisabled()
            });
            obj.sub = () => [
                this.RefresherContent()
            ];
            return obj;
        }
        itemRendererFactory() {
            return null;
        }
        getSpinnerDisplay() {
            return "flex";
        }
        infspin() {
            const obj = new this.$.$milkywaystd_ionui_spinner();
            obj.attr = () => ({
                slot: "fixed"
            });
            obj.style = () => ({
                width: "100%",
                height: "32px",
                "margin-top": "22px",
                display: this.getSpinnerDisplay()
            });
            return obj;
        }
        viewPort() {
            const obj = new this.$.$milkywaystd_scroll_VirtualScrollViewport();
            obj.itemRendererFactory = () => this.itemRendererFactory();
            obj.itemHeight = () => 600;
            obj.minBufferPx = () => 2400;
            obj.maxBufferPx = () => 4800;
            obj.style = () => ({
                height: "100%"
            });
            obj.pre_sub = () => [];
            obj.post_sub = () => [
                this.infspin()
            ];
            return obj;
        }
        IonContent() {
            const obj = new this.$.$IC4();
            obj.sub = () => [
                this.Refresher(),
                this.viewPort()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonMenuButton", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonButtons", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonTitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonTollbar", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "ionRefresh", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "RefresherContent", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "Refresher", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "infspin", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "viewPort", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_pages_page4.prototype, "IonContent", null);
    $.$milkywaystd_ionui_demo_pages_page4 = $milkywaystd_ionui_demo_pages_page4;
    class $IC4 extends $milkywaystd_ionui_content {
        attr() {
            return {
                "scroll-y": "false"
            };
        }
        classes() {
            return [
                "ion-padding"
            ];
        }
    }
    $.$IC4 = $IC4;
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page4/-view.tree/page4.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_img extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-img";
        }
    }
    $.$milkywaystd_ionui_img = $milkywaystd_ionui_img;
})($ || ($ = {}));
//milkywaystd/ionui/img/-view.tree/img.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardsubtitle extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-subtitle";
        }
    }
    $.$milkywaystd_ionui_cardsubtitle = $milkywaystd_ionui_cardsubtitle;
})($ || ($ = {}));
//milkywaystd/ionui/cardsubtitle/-view.tree/cardsubtitle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardheader extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-header";
        }
    }
    $.$milkywaystd_ionui_cardheader = $milkywaystd_ionui_cardheader;
})($ || ($ = {}));
//milkywaystd/ionui/cardheader/-view.tree/cardheader.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_button extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-button";
        }
        sub() {
            return [
                this.title()
            ];
        }
    }
    $.$milkywaystd_ionui_button = $milkywaystd_ionui_button;
})($ || ($ = {}));
//milkywaystd/ionui/button/-view.tree/button.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_cardcontent extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card-content";
        }
    }
    $.$milkywaystd_ionui_cardcontent = $milkywaystd_ionui_cardcontent;
})($ || ($ = {}));
//milkywaystd/ionui/cardcontent/-view.tree/cardcontent.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_card extends $milkywaystd_ionui_component {
        dom_name() {
            return "ion-card";
        }
    }
    $.$milkywaystd_ionui_card = $milkywaystd_ionui_card;
})($ || ($ = {}));
//milkywaystd/ionui/card/-view.tree/card.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo_catrotator extends $milkywaystd_viewcontainer {
        sub() {
            return [
                this.IonCard()
            ];
        }
        imgSrc() {
            return null;
        }
        IonImg() {
            const obj = new this.$.$milkywaystd_ionui_img();
            obj.attr = () => ({
                src: this.imgSrc()
            });
            return obj;
        }
        txt() {
            return "Awesome images";
        }
        IonCardSubitle() {
            const obj = new this.$.$milkywaystd_ionui_cardsubtitle();
            obj.sub = () => [
                this.txt()
            ];
            return obj;
        }
        IonCardHeader() {
            const obj = new this.$.$milkywaystd_ionui_cardheader();
            obj.sub = () => [
                this.IonCardSubitle()
            ];
            return obj;
        }
        idx() {
            return 0;
        }
        txt2() {
            return "Vote";
        }
        rotate(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        btn() {
            const obj = new this.$.$milkywaystd_ionui_button();
            obj.sub = () => [
                this.txt2()
            ];
            obj.event = () => ({
                click: (val) => this.rotate(val)
            });
            return obj;
        }
        IonCardcontent() {
            const obj = new this.$.$milkywaystd_ionui_cardcontent();
            obj.sub = () => [
                this.idx(),
                this.btn()
            ];
            return obj;
        }
        IonCard() {
            const obj = new this.$.$milkywaystd_ionui_card();
            obj.sub = () => [
                this.IonImg(),
                this.IonCardHeader(),
                this.IonCardcontent()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonImg", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardSubitle", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardHeader", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "rotate", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "btn", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCardcontent", null);
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo_catrotator.prototype, "IonCard", null);
    $.$milkywaystd_ionui_demo_catrotator = $milkywaystd_ionui_demo_catrotator;
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/-view.tree/catrotator.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                const fiber = temp(self, args);
                return fiber.sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
//mol/wire/sync/sync.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//mol/dom/parse/parse.ts
;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object2 {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        message() {
            return this.native.statusText || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const native = this.native;
            const mime = native.headers.get('content-type') || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_wire_sync(this.native).json();
        }
        buffer() {
            return $mol_wire_sync(this.native).arrayBuffer();
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch extends $mol_object2 {
        static request(input, init = {}) {
            const native = globalThis.fetch ?? $node['undici'].fetch;
            const controller = new AbortController();
            let done = false;
            const promise = native(input, {
                ...init,
                signal: controller.signal,
            }).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        static response(input, init) {
            return new $mol_fetch_response($mol_wire_sync(this).request(input, init));
        }
        static success(input, init) {
            const response = this.response(input, init);
            if (response.status() === 'success')
                return response;
            throw new Error(response.message());
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "response", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "success", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "json", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "html", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));
//mol/fetch/fetch.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_catrotator extends $.$milkywaystd_ionui_demo_catrotator {
            static cache = new Map();
            src() {
                if (this.idx() !== null)
                    return 'https://loremflickr.com/360/640?r=' + this.idx();
                return null;
            }
            idx() {
                return this.implicit() ? this.implicit().id : 0;
            }
            context(next) {
                if (next !== undefined) {
                    this.implicit(next.implicit);
                    return next;
                }
                return {};
            }
            implicit(next) {
                if (next !== undefined) {
                    return next;
                }
                ;
                return null;
            }
            imgSrc() {
                if (!this.src())
                    return null;
                if ($milkywaystd_ionui_demo_catrotator.cache.has(this.src()))
                    return $milkywaystd_ionui_demo_catrotator.cache.get(this.src());
                const buffer = $mol_fetch.buffer(this.src());
                const blob = new Blob([buffer], { type: "image/jpeg" });
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(blob);
                $milkywaystd_ionui_demo_catrotator.cache.set(this.src(), imageUrl);
                return imageUrl;
            }
            subsciber = null;
            rotate() {
                $milkywaystd_ionui_demo_pages_page4.alert();
            }
            dom_id() {
                return '$milkywaystd_ionui_demo_route_catrotator_' + this.idx();
            }
            onData(obj) {
                this.context(obj);
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "src", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "idx", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "context", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "implicit", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_catrotator.prototype, "imgSrc", null);
        $$.$milkywaystd_ionui_demo_catrotator = $milkywaystd_ionui_demo_catrotator;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/catrotator.view.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/demo/catrotator/catrotator.view.css", "[milkywaystd_ionui_demo_catrotator]::part(image) {\n\tmax-height: 240px;\n}\n");
})($ || ($ = {}));
//milkywaystd/ionui/demo/catrotator/-css/catrotator.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $milkywaystd_ionui_demo_pages_page4 extends $.$milkywaystd_ionui_demo_pages_page4 {
            ar = [];
            static alert() {
                const alert = document.createElement('ion-alert');
                alert.header = 'Alert';
                alert.subHeader = 'Vote';
                alert.message = 'Accepted';
                alert.buttons = ['OK'];
                document.body.appendChild(alert);
                alert.present();
            }
            pending(next) {
                if (undefined !== next)
                    return next;
                return false;
            }
            loadnext() {
                this.pending(true);
                setTimeout(() => {
                    this.pending(false);
                    const l = this.ar.length + 1;
                    for (let index = 0; index < 10; index++) {
                        this.ar.push({ id: l + index });
                        this.viewPort().setData(this.ar);
                    }
                }, 2000);
            }
            loadnew() {
                this.pending(true);
                setTimeout(() => {
                    $milkywaystd_ionui_demo_catrotator.cache.clear();
                    this.ar = [];
                    for (let index = 0; index < 10; index++) {
                        this.ar.push({ id: index });
                    }
                    this.viewPort().setData(this.ar);
                    this.Refresher().dom_node().complete();
                    this.pending(false);
                }, 2000);
            }
            getRefersherDisabled(next) {
                if (undefined !== next)
                    return next;
                return false;
            }
            ionRefresh() {
                this.loadnew();
            }
            auto() {
                this.loadnew();
                this.viewPort()
                    .forOfCtl?.elementScrolled()
                    ?.auditTime(200)
                    .subscribe((range) => {
                    if (this.viewPort()?.forOfCtl?.measureScrollOffset("bottom") <
                        20 &&
                        !this.pending()) {
                        this.loadnext();
                    }
                    if (this.viewPort()?.forOfCtl?.measureScrollOffset("top") < 50) {
                        this.getRefersherDisabled(false);
                    }
                    else {
                        this.getRefersherDisabled(true);
                    }
                });
                return null;
            }
            itemRendererFactory() {
                return new $milkywaystd_ionui_demo_catrotator();
            }
            getSpinnerDisplay() {
                return this.pending() ? "flex" : "none";
            }
        }
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "pending", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "getRefersherDisabled", null);
        __decorate([
            $mol_mem
        ], $milkywaystd_ionui_demo_pages_page4.prototype, "getSpinnerDisplay", null);
        $$.$milkywaystd_ionui_demo_pages_page4 = $milkywaystd_ionui_demo_pages_page4;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//milkywaystd/ionui/demo/pages/page4/page4.view.ts
;
"use strict";
var $;
(function ($) {
    class $milkywaystd_ionui_demo extends $mol_example_large {
        title() {
            return "Ionic implementation";
        }
        sub() {
            return [
                this.View()
            ];
        }
        View() {
            const obj = new this.$.$milkywaystd_ionui_demo_route();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $milkywaystd_ionui_demo.prototype, "View", null);
    $.$milkywaystd_ionui_demo = $milkywaystd_ionui_demo;
})($ || ($ = {}));
//milkywaystd/ionui/demo/-view.tree/demo.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("milkywaystd/ionui/demo/demo.view.css", "\n");
})($ || ($ = {}));
//milkywaystd/ionui/demo/-css/demo.view.css.ts
;
"use strict";
var $;
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            const res = test(context);
            if ($mol_promise_like(res)) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));
//mol/test/test.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
        process.exit(0);
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));
//mol/test/test.node.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));
//mol/log3/log3.test.ts
;
"use strict";
//mol/type/error/error.ts
;
"use strict";
//mol/type/assert/assert.ts
;
"use strict";
//mol/type/assert/assert.test.ts
;
"use strict";
//mol/type/equals/equals.ts
;
"use strict";
//mol/type/equals/equals.test.ts
;
"use strict";
//mol/type/partial/deep/deep.ts
;
"use strict";
//mol/type/partial/deep/deep.test.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));
//mol/jsx/jsx.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));
//mol/jsx/jsx.test.tsx
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_not($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
            $mol_assert_ok($mol_compare_deep(Object.create(null), Object.create(null)));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'POJO with symbols'() {
            const sym = Symbol();
            $mol_assert_ok($mol_compare_deep({ [sym]: true }, { [sym]: true }));
            $mol_assert_not($mol_compare_deep({ [Symbol()]: true }, { [Symbol()]: true }));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Serializale'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
        'Iterable'() {
            $mol_assert_ok($mol_compare_deep(new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' })));
        },
    });
})($ || ($ = {}));
//mol/compare/deep/deep.test.tsx
;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));
//mol/dom/serialize/serialize.ts
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            if (!ErrorRight)
                return error;
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message, ErrorRight);
            }
            else {
                $mol_assert_ok(error instanceof ErrorRight);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed'));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (Number.isNaN(args[i]) && Number.isNaN(args[j]))
                    continue;
                if (args[i] !== args[j])
                    $mol_fail(new Error(`Not equal (${i + 1}:${j + 1})\n${args[i]}\n${args[j]}`));
            }
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] === args[j] || (Number.isNaN(args[i]) && Number.isNaN(args[j]))) {
                    $mol_fail(new Error(`args[${i}] = args[${j}] = ${args[i]}`));
                }
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    function $mol_assert_like(head, ...tail) {
        for (let [index, value] of Object.entries(tail)) {
            if (!$mol_compare_deep(value, head)) {
                const print = (val) => {
                    if (!val)
                        return val;
                    if (typeof val !== 'object')
                        return val;
                    if ('outerHTML' in val)
                        return val.outerHTML;
                    try {
                        return JSON.stringify(val);
                    }
                    catch (error) {
                        console.error(error);
                        return val;
                    }
                };
                return $mol_fail(new Error(`Not like (1:${+index + 2})\n${print(head)}\n---\n${print(value)}`));
            }
        }
    }
    $.$mol_assert_like = $mol_assert_like;
    function $mol_assert_dom(left, right) {
        $mol_assert_equal($mol_dom_serialize(left), $mol_dom_serialize(right));
    }
    $.$mol_assert_dom = $mol_assert_dom;
})($ || ($ = {}));
//mol/assert/assert.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([3], [3], [3]);
        },
        'two must be alike'() {
            $mol_assert_like([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_like([3], [3], [3]);
        },
    });
})($ || ($ = {}));
//mol/assert/assert.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));
//mol/func/name/name.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));
//mol/delegate/delegate.test.ts
;
"use strict";
//mol/type/writable/writable.test.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));
//mol/after/mock/mock.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'span for same uri'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.span(4, 5, 8);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 4);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 8);
        },
        'span after of given position'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.after(11);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 7);
            $mol_assert_equal(child.length, 11);
        },
        'slice span - regular'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(1, 4);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 4);
            $mol_assert_equal(child.length, 3);
            const child2 = span.slice(2, 2);
            $mol_assert_equal(child2.col, 5);
            $mol_assert_equal(child2.length, 0);
        },
        'slice span - negative'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(-3, -1);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 2);
        },
        'slice span - out of range'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            $mol_assert_fail(() => span.slice(-1, 3));
            $mol_assert_fail(() => span.slice(1, 6));
            $mol_assert_fail(() => span.slice(1, 10));
        },
        'error handling'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const error = span.error('Some error\n');
            $mol_assert_equal(error.message, 'Some error\ntest.ts#1:3/4');
        }
    });
})($ || ($ = {}));
//mol/span/span.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'inserting'($) {
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), 'a', 'b', 'c')
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), 'a', 'b', 'c', 'd')
                .toString(), 'a b c x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), 0, 0, 0)
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), 0, 0, 0, 0)
                .toString(), 'a b \\\n\tx\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert($mol_tree2.struct('x'), null, null, null)
                .toString(), 'a b x\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b\n')
                .insert($mol_tree2.struct('x'), null, null, null, null)
                .toString(), 'a b \\\n\tx\n');
        },
        'deleting'($) {
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert(null, 'a', 'b', 'c')
                .toString(), 'a b\n');
            $mol_assert_equal($.$mol_tree2_from_string('a b c d\n')
                .insert(null, 0, 0, 0)
                .toString(), 'a b\n');
        },
        'hack'($) {
            const res = $.$mol_tree2_from_string(`foo bar xxx\n`)
                .hack({
                'bar': (input, belt) => [input.struct('777', input.hack(belt))],
            });
            $mol_assert_equal(res.toString(), 'foo 777 xxx\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/tree2.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'($) {
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids[1].type, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo\n\n\n").kids.length, 1);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids[1].value, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar \\pol\n").kids[0].kids[0].kids[0].value, "pol");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar\n\t\\pol\n\t\\men\n").kids[0].kids[0].kids[1].value, "men");
            $mol_assert_equal($.$mol_tree2_from_string('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'Too many tabs'($) {
            const tree = `
				foo
						bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too many tabs\ntest#3:1/6\n!!!!!!\n\t\t\t\t\t\tbar');
        },
        'Too few tabs'($) {
            const tree = `
					foo
				bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too few tabs\ntest#3:1/4\n!!!!\n\t\t\t\tbar');
        },
        'Wrong nodes separator at start'($) {
            const tree = `foo\n \tbar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#2:1/2\n!!\n \tbar');
        },
        'Wrong nodes separator in the middle'($) {
            const tree = `foo  bar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar');
        },
        'Unexpected EOF, LF required'($) {
            const tree = `	foo`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Unexpected EOF, LF required\ntest#1:5/1\n	   !\n	foo');
        },
        'Errors skip and collect'($) {
            const tree = `foo  bar`;
            const errors = [];
            const $$ = $.$mol_ambient({
                $mol_fail: (error) => {
                    errors.push(error.message);
                    return null;
                }
            });
            const res = $$.$mol_tree2_from_string(tree, 'test');
            $mol_assert_like(errors, [
                'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar',
                'Unexpected EOF, LF required\ntest#1:9/1\n        !\nfoo  bar',
            ]);
            $mol_assert_equal(res.toString(), 'foo bar\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/from/string/string.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'fromJSON'() {
            $mol_assert_equal($mol_tree2_from_json([]).toString(), '/\n');
            $mol_assert_equal($mol_tree2_from_json([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $mol_assert_equal($mol_tree2_from_json([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $mol_assert_equal($mol_tree2_from_json(new Uint16Array([1, 10, 256])).toString(), '\\\x01\x00\n\\\x00\x00\x01\n');
            $mol_assert_equal($mol_tree2_from_json(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $mol_assert_equal($mol_tree2_from_json({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
    });
})($ || ($ = {}));
//mol/tree2/from/json/json.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/tick/tick.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//mol/object/object.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));
//mol/wire/pub/sub/sub.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));
//mol/after/timeout/timeout.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/frame/frame.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));
//mol/wire/fiber/fiber.test.ts
;
"use strict";
//mol/type/tail/tail.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise() {
        let done;
        let fail;
        const promise = new Promise((d, f) => {
            done = d;
            fail = f;
        });
        return Object.assign(promise, {
            done,
            fail,
        });
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));
//mol/promise/promise/promise.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));
//mol/wait/timeout/timeout.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    this.$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(NameLogger.first, ['john', 'jin']);
            $mol_assert_like(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(first, ['john', 'jin']);
            $mol_assert_like(last, ['jin']);
        },
    });
})($ || ($ = {}));
//mol/wire/async/async.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static source(next = 1) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.source() : 0;
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.source(10);
            $mol_assert_equal(App.result(), 11);
            $mol_assert_equal(App.counter, 2);
            App.condition(false);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            $mol_wire_fiber.sync();
            $mol_assert_equal(App.source(), 1);
            App.source(20);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            App.condition(true);
            $mol_assert_equal(App.result(), 23);
            $mol_assert_equal(App.counter, 4);
        },
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow();
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result());
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
                static test() {
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title()');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));
//mol/wire/solo/solo.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like(123)');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation([123,[456]])');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));
//mol/wire/plex/plex.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));
//mol/wire/probe/probe.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));
//mol/wrapper/wrapper.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));
//mol/memo/memo.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                toJSON() { return { name: this.name }; }
            }
            $mol_assert_equal($mol_key(new User('jin', 18)), '{"name":"jin"}');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'null');
            $mol_assert_equal($mol_key(new Date('2001-01-02T03:04:05.678Z')), '"2001-01-02T03:04:05.678Z"');
            $mol_assert_equal($mol_key(/./), '"/./"');
            $mol_assert_equal($mol_key(/\./gimsu), '"/\\\\./gimsu"');
        },
    });
})($ || ($ = {}));
//mol/key/key.test.tsx
;
"use strict";
//mol/type/foot/foot.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (fiber.host === this)
                return next;
            if ($mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: '💧 Same',
                    place: fiber,
                });
            }
            else if (prev !== undefined) {
                this.$.$mol_log3_rise({
                    message: '🔥 Next',
                    place: fiber,
                    prev,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));
//mol/wire/log/log.ts
;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));
//mol/wire/atom/atom.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//mol/const/const.test.ts
;
"use strict";
//mol/type/keys/extract/extract.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//mol/view/view/view.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_simple extends $mol_view {
        some() {
            return 1;
        }
        bool() {
            return true;
        }
        str() {
            return "test";
        }
        arr() {
            return [];
        }
        arr_string() {
            return [];
        }
    }
    $.$mol_view_tree_test_simple = $mol_view_tree_test_simple;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/simple.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding extends $mol_view {
        value(next) {
            return this.task_title_new(next);
        }
        enabled() {
            return this.head_complete_enabled();
        }
        task_title_new(next) {
            if (next !== undefined)
                return next;
            return "123";
        }
        head_complete_enabled() {
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding.prototype, "task_title_new", null);
    $.$mol_view_tree_test_binding = $mol_view_tree_test_binding;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_super extends $mol_view {
        some() {
            return {
                a: 0,
                b: 2
            };
        }
    }
    $.$mol_view_tree_test_attributes_super = $mol_view_tree_test_attributes_super;
    class $mol_view_tree_test_attributes extends $mol_view_tree_test_attributes_super {
        some() {
            return {
                ...super.some(),
                a: 1
            };
        }
    }
    $.$mol_view_tree_test_attributes = $mol_view_tree_test_attributes;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/attributes.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_subcomponent extends $mol_view {
        Page(id) {
            const obj = new this.$.$mol_view_tree_test_attributes_subcomponent_page();
            obj.Sub = () => this.page(id);
            return obj;
        }
        page(id) {
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_view_tree_test_attributes_subcomponent.prototype, "Page", null);
    $.$mol_view_tree_test_attributes_subcomponent = $mol_view_tree_test_attributes_subcomponent;
    class $mol_view_tree_test_attributes_subcomponent_page extends $mol_view {
        Sub() {
            return null;
        }
    }
    $.$mol_view_tree_test_attributes_subcomponent_page = $mol_view_tree_test_attributes_subcomponent_page;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/subcomponent.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding_right extends $mol_view {
        outer_width(v) {
            return this.Test().width(v);
        }
        Test() {
            const obj = new this.$.$mol_view_tree_test_binding_right_test();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right.prototype, "Test", null);
    $.$mol_view_tree_test_binding_right = $mol_view_tree_test_binding_right;
    class $mol_view_tree_test_binding_right_test extends $mol_view {
        width(next) {
            if (next !== undefined)
                return next;
            return 0;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right_test.prototype, "width", null);
    $.$mol_view_tree_test_binding_right_test = $mol_view_tree_test_binding_right_test;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding_right.test.view.tree.ts
;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'simple props'($) {
                const app = $mol_view_tree_test_simple.make({ $ });
                $mol_assert_equal(app.some(), 1);
                $mol_assert_equal(app.bool(), true);
                $mol_assert_equal(app.str(), 'test');
                $mol_assert_ok(Array.isArray(app.arr()));
                $mol_assert_ok(Array.isArray(app.arr_string()));
            },
            'default value'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_equal(app.value(), '123');
            },
            'both binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_ok(app.value() !== '1');
                app.value('1');
                $mol_assert_equal(app.value(), '1');
            },
            'left binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_not(app.head_complete_enabled());
                $mol_assert_not(app.enabled());
            },
            'sub component'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                $mol_assert_ok(app.Test() instanceof $mol_view_tree_test_binding_right_test);
            },
            'right binding - change owner property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.outer_width(val);
                $mol_assert_equal(app.outer_width(), val);
                $mol_assert_equal(app.Test().width(), val);
            },
            'right binding - change part property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.Test().width(val);
                $mol_assert_equal(app.Test().width(), val);
                $mol_assert_equal(app.outer_width(), val);
            },
            'attributes merging'($) {
                const app = $mol_view_tree_test_attributes.make({ $ });
                $mol_assert_like(app.some(), { a: 1, b: 2 });
            },
            'subcomponent indexed'($) {
                const app = $mol_view_tree_test_attributes_subcomponent.make({ $ });
                const val = 123;
                app.page = (index) => index;
                $mol_assert_equal(app.Page(val).Sub(), val);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/view/tree/test/tree.test.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_tree_convert = Symbol('$mol_tree_convert');
    class $mol_tree extends $mol_object2 {
        type;
        data;
        sub;
        baseUri;
        row;
        col;
        length;
        constructor(config = {}) {
            super();
            this.type = config.type || '';
            if (config.value !== undefined) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = [...sub, ...(config.sub || [])];
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
            this.length = config.length || 0;
        }
        static values(str, baseUri) {
            return str.split('\n').map((data, index) => new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1,
                length: data.length,
            }));
        }
        clone(config = {}) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                length: ('length' in config) ? config.length : this.length,
                value: config.value
            });
        }
        make(config) {
            return new $mol_tree({
                baseUri: this.baseUri,
                row: this.row,
                col: this.col,
                length: this.length,
                ...config,
            });
        }
        make_data(value, sub) {
            return this.make({ value, sub });
        }
        make_struct(type, sub) {
            return this.make({ type, sub });
        }
        static fromString(str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var prefix = str.replace(/^\n?(\t*)[\s\S]*/, '$1');
            var lines = str.replace(new RegExp('^\\t{0,' + prefix.length + '}', 'mg'), '').split('\n');
            lines.forEach(line => {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    return this.$.$mol_fail(new Error(`Syntax error at ${baseUri}:${row}\n${line}`));
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    return this.$.$mol_fail(new Error(`Too many tabs at ${baseUri}:${row}\n${line}`));
                stack.length = deep + 1;
                var parent = stack[deep];
                let col = deep;
                types.forEach(type => {
                    if (!type)
                        return this.$.$mol_fail(new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`));
                    var next = new $mol_tree({ type, baseUri, row, col, length: type.length });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                    col += type.length + 1;
                });
                if (data) {
                    var next = new $mol_tree({ data: data.substring(1), baseUri, row, col, length: data.length });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        }
        static fromJSON(json, baseUri = '') {
            switch (true) {
                case typeof json === 'boolean':
                case typeof json === 'number':
                case json === null:
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case typeof json === 'string':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case Array.isArray(json):
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                    });
                case json instanceof Date:
                    return new $mol_tree({
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                default:
                    if (typeof json[$.$mol_tree_convert] === 'function') {
                        return json[$.$mol_tree_convert]();
                    }
                    if (typeof json.toJSON === 'function') {
                        return $mol_tree.fromJSON(json.toJSON());
                    }
                    if (json instanceof Error) {
                        const { name, message, stack } = json;
                        json = { ...json, name, message, stack };
                    }
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        const subsub = $mol_tree.fromJSON(json[key], baseUri);
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
        }
        get uri() {
            return this.baseUri + '#' + this.row + ':' + this.col;
        }
        toString(prefix = '') {
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type;
                if (this.sub.length == 1) {
                    return output + ' ' + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var child of this.sub) {
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        }
        toJSON() {
            if (!this.type)
                return this.value;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === '*') {
                var obj = {};
                for (var child of this.sub) {
                    if (child.type === '-')
                        continue;
                    var key = child.type || child.clone({ sub: child.sub.slice(0, child.sub.length - 1) }).value;
                    var val = child.sub[child.sub.length - 1].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === '/') {
                var res = [];
                this.sub.forEach(child => {
                    if (child.type === '-')
                        return;
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            const numb = Number(this.type);
            if (!Number.isNaN(numb) || this.type === 'NaN')
                return numb;
            throw new Error(`Unknown type (${this.type}) at ${this.uri}`);
        }
        get value() {
            var values = [];
            for (var child of this.sub) {
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.sub.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                });
                if (!replaced)
                    sub.push(new $mol_tree({ type }).insert(value, ...path.slice(1)));
                return this.clone({ sub });
            }
            else if (typeof type === 'number') {
                const sub = this.sub.slice();
                sub[type] = (sub[type] || new $mol_tree).insert(value, ...path.slice(1));
                return this.clone({ sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(item => item.insert(value, ...path.slice(1))) });
            }
        }
        select(...path) {
            var next = [this];
            for (var type of path) {
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.sub) {
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push(...item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        }
        filter(path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select(...path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(child => child.value == value);
                }
            });
            return new $mol_tree({ sub: sub });
        }
        transform(visit, stack = []) {
            const sub_stack = [this, ...stack];
            return visit(sub_stack, () => this.sub.map(node => node.transform(visit, sub_stack)).filter(n => n));
        }
        hack(context) {
            const sub = [].concat(...this.sub.map(child => {
                const handle = context[child.type] || context[''];
                if (!handle)
                    $mol_fail(child.error('Handler not defined'));
                return handle(child, context);
            }));
            return this.clone({ sub });
        }
        error(message) {
            return new Error(`${message}:\n${this} ${this.baseUri}:${this.row}:${this.col}`);
        }
    }
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//mol/tree/tree.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'() {
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $mol_assert_equal($mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $mol_assert_equal($mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $mol_assert_equal($mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $mol_assert_equal($mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting'() {
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, null, null, null).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        },
        'fromJSON'() {
            $mol_assert_equal($mol_tree.fromJSON([]).toString(), '/\n');
            $mol_assert_equal($mol_tree.fromJSON([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $mol_assert_equal($mol_tree.fromJSON([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $mol_assert_equal($mol_tree.fromJSON(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $mol_assert_equal($mol_tree.fromJSON({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
        'toJSON'() {
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n').sub[0]), '[]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\tfalse\n\ttrue\n').sub[0]), '[false,true]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t0\n\t1\n\t2.3\n').sub[0]), '[0,1,2.3]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n').sub[0]), '["","foo","bar\\nbaz"]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n').sub[0]), '{"foo":false,"bar\\nbaz":"lol"}');
        },
        'hack'() {
            const res = $mol_tree.fromString(`foo bar xxx`).hack({
                '': (tree, context) => [tree.hack(context)],
                'bar': (tree, context) => [tree.hack(context).clone({ type: '777' })],
            });
            $mol_assert_equal(res.toString(), new $mol_tree({ type: 'foo 777 xxx' }).toString());
        },
        'errors handling'($) {
            const errors = [];
            class Tree extends $mol_tree {
                static $ = $.$mol_ambient({
                    $mol_fail: error => errors.push(error.message)
                });
            }
            Tree.fromString(`
				\t \tfoo
				bar \\data
			`, 'test');
            $mol_assert_like(errors, ['Syntax error at test:2\n \tfoo']);
        },
    });
})($ || ($ = {}));
//mol/tree/tree.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//mol/state/local/local.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//mol/state/local/local.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));
//mol/state/local/local.mock.test.ts
;
"use strict";
//mol/charset/encoding/encoding.ts
;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));
//mol/charset/decode/decode.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));
//mol/charset/decode/decode.test.ts
;
"use strict";
var $;
(function ($) {
    const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder;
    const encoder = new TextEncoder();
    function $mol_charset_encode(value) {
        return encoder.encode(value);
    }
    $.$mol_charset_encode = $mol_charset_encode;
})($ || ($ = {}));
//mol/charset/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_like($mol_charset_encode(str), encoded);
        },
    });
})($ || ($ = {}));
//mol/charset/encode/encode.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file_not_found extends Error {
    }
    $.$mol_file_not_found = $mol_file_not_found;
    class $mol_file extends $mol_object {
        static absolute(path) {
            throw new Error('Not implemented yet');
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        reset() {
            try {
                this.stat(null);
            }
            catch (error) {
                if (error instanceof $mol_file_not_found)
                    return;
                return $mol_fail_hidden(error);
            }
        }
        version() {
            return this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
        }
        watcher() {
            console.warn('$mol_file_web.watcher() not implemented');
            return {
                destructor() { }
            };
        }
        exists(next) {
            let exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next)
                this.parent().exists(true);
            this.ensure();
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (virt) {
                const now = new Date;
                this.stat({
                    type: 'file',
                    size: 0,
                    atime: now,
                    mtime: now,
                    ctime: now,
                }, 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer(undefined));
            }
            else {
                const buffer = next === undefined ? undefined : $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//mol/file/file.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));
//mol/compare/array/array.ts
;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));
//mol/compare/array/array.test.ts
;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    class $mol_file_node extends $mol_file {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher() {
            const watcher = $node.chokidar.watch(this.path(), {
                persistent: true,
                ignored: /(^\.|___$)/,
                depth: 0,
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                },
            });
            watcher
                .on('all', (type, path) => {
                const file = $mol_file.relative(path.replace(/\\/g, '/'));
                file.reset();
                if (type === 'change') {
                    this.stat(null);
                }
                else {
                    file.parent().reset();
                }
            })
                .on('error', $mol_fail_log);
            return {
                destructor() {
                    watcher.close();
                }
            };
        }
        stat(next, virt) {
            let stat = next;
            const path = this.path();
            this.parent().watcher();
            if (virt)
                return next;
            try {
                stat = next ?? stat_convert($node.fs.statSync(path, { throwIfNoEntry: false }));
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    error = new $mol_file_not_found(`File not found`);
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return stat;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path);
            }
            catch (e) {
                e.message += '\n' + path;
                this.$.$mol_fail_hidden(e);
            }
        }
        buffer(next) {
            const path = this.path();
            if (next === undefined) {
                if (!this.stat())
                    return new Uint8Array;
                try {
                    const prev = $mol_mem_cached(() => this.buffer());
                    next = buffer_normalize($node.fs.readFileSync(path));
                    if (prev !== undefined && !$mol_compare_array(prev, next)) {
                        this.$.$mol_log3_rise({
                            place: `$mol_file_node..buffer()`,
                            message: 'Changed',
                            path: this.relate(),
                        });
                    }
                    return next;
                }
                catch (error) {
                    error.message += '\n' + path;
                    return this.$.$mol_fail_hidden(error);
                }
            }
            this.parent().exists(true);
            const now = new Date;
            this.stat({
                type: 'file',
                size: next.length,
                atime: now,
                mtime: now,
                ctime: now,
            }, 'virt');
            try {
                $node.fs.writeFileSync(path, next);
            }
            catch (error) {
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return next;
        }
        sub() {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            const path = this.path();
            this.stat();
            try {
                return $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor.relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        append(next) {
            const path = this.path();
            try {
                $node.fs.appendFileSync(path, next);
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "buffer", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node, "absolute", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));
//mol/file/file.node.ts
;
"use strict";
//hyoo/hyoo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_huggingface_run(space, method, ...data) {
        while (true) {
            try {
                if (typeof method === 'number') {
                    return $mol_wire_sync(this).$mol_huggingface_ws(space, method, ...data);
                }
                else {
                    return this.$mol_huggingface_rest(space, method, ...data);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                if (error instanceof Error && error.message === `Queue full`) {
                    $mol_fail_log(error);
                    continue;
                }
                $mol_fail_hidden(error);
            }
        }
    }
    $.$mol_huggingface_run = $mol_huggingface_run;
    function $mol_huggingface_rest(space, method, ...data) {
        const uri = `https://${space}.hf.space/run/${method}`;
        const response = $mol_fetch.json(uri, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        });
        if ('error' in response) {
            $mol_fail(new Error(response.error ?? 'Unknown API error'));
        }
        return response.data;
    }
    $.$mol_huggingface_rest = $mol_huggingface_rest;
    function $mol_huggingface_ws(space, fn_index, ...data) {
        const session_hash = $mol_guid();
        const socket = new WebSocket(`wss://${space}.hf.space/queue/join`);
        const promise = new Promise((done, fail) => {
            socket.onclose = event => {
                if (event.reason)
                    fail(new Error(event.reason));
            };
            socket.onerror = event => {
                fail(new Error(`Socket error`));
            };
            socket.onmessage = event => {
                const message = JSON.parse(event.data);
                switch (message.msg) {
                    case 'send_hash':
                        return socket.send(JSON.stringify({ session_hash, fn_index }));
                    case 'estimation': return;
                    case 'queue_full':
                        fail(new Error(`Queue full`));
                    case 'send_data':
                        return socket.send(JSON.stringify({ session_hash, fn_index, data }));
                    case 'process_starts': return;
                    case 'process_completed':
                        if (message.success) {
                            return done(message.output.data);
                        }
                        else {
                            return fail(new Error(message.output.error ?? `Unknown API error`));
                        }
                    default:
                        return fail(new Error(`Unknown message type: ${message.msg}`));
                }
            };
        });
        return Object.assign(promise, {
            destructor: () => socket.close()
        });
    }
    $.$mol_huggingface_ws = $mol_huggingface_ws;
})($ || ($ = {}));
//mol/huggingface/huggingface.ts
;
"use strict";
var $;
(function ($) {
    function $hyoo_lingua_translate(lang, text) {
        if (!text.trim())
            return '';
        const cache_key = `$hyoo_lingua_translate(${JSON.stringify(lang)},${JSON.stringify(text)})`;
        const cached = this.$mol_state_local.value(cache_key);
        if (cached)
            return String(cached);
        const translated = this.$mol_huggingface_run('hyoo-translate', 0, lang, text)[0];
        return this.$mol_state_local.value(cache_key, translated);
    }
    $.$hyoo_lingua_translate = $hyoo_lingua_translate;
})($ || ($ = {}));
//hyoo/lingua/translate/translate.ts
;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            try {
                return $mol_wire_sync($hyoo_lingua_translate).call(this.$, lang, en);
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//mol/locale/locale.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_locale_mock extends $mol_locale {
            lang(next = 'en') { return next; }
            static source(lang) {
                return {};
            }
        }
        __decorate([
            $mol_mem
        ], $mol_locale_mock.prototype, "lang", null);
        __decorate([
            $mol_mem_key
        ], $mol_locale_mock, "source", null);
        $.$mol_locale = $mol_locale_mock;
    });
})($ || ($ = {}));
//mol/locale/locale.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(([node], sub) => (node.type === '-') ? null : node.clone({ sub: sub() }));
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        const props = {};
        const catch_prop = (prop, type = '') => {
            let def = prop;
            if (type === '=>') {
                if (prop.sub[0])
                    throw prop.error('Right binding can not have default value');
            }
            else {
                if (prop.sub.length === 0)
                    return;
                if (prop.sub[0].type === '-')
                    return;
                props[prop.type] = props[prop.type];
                def = prop.clone({
                    sub: [prop.sub[0].transform(([node, ...stack], sub) => {
                            if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                                return node.clone({ sub: sub() });
                            catch_prop(node.sub[0], node.type);
                            return node.clone({
                                sub: [node.sub[0].clone({
                                        sub: []
                                    })]
                            });
                        })]
                });
            }
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value' + props[prop.type].error('').message + '\n---');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(sub => catch_prop(sub));
        return def.clone({
            type: '',
            sub: Object.keys(props).map(name => props[name]),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error(`Wrong sub count (${prop.sub.length})`);
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        switch (val.type[0]) {
            case '/': return 'list';
            case '$': return 'object';
        }
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        const splittedUri = tree.uri.split(/[#\\\/]/);
        splittedUri.pop();
        const fileName = splittedUri.pop();
        const SourceNode = (row, col, fileName, text) => text;
        var content = [];
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            const parent = def.sub[0];
            const members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needCache = false;
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    const getValue = (value, definition) => {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return [JSON.stringify(value.value)];
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return [`this.$.$mol_locale.text( ${JSON.stringify(key)} )`];
                                case (value.type === '-'):
                                    return null;
                                case (value.type[0] === '/'):
                                    const item_type = value.type.substring(1);
                                    var items = [];
                                    value.sub.forEach(item => {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push(`...super.${param.type}()`);
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val.join(""));
                                    });
                                    return [`[`, items.join(' , '), `]`, (item_type ? ` as ( ${item_type} )[]` : ` as any[]`)];
                                case (value.type[0] === '$'):
                                    if (!definition)
                                        throw value.error('Objects should be bound');
                                    needCache = true;
                                    const overs = [];
                                    value.sub.forEach(over => {
                                        if (/^[-\/]?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                const [, own_name, own_key, own_next] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.sub[0].sub[0].type);
                                                let own_args = [];
                                                if (own_key)
                                                    own_args.push(` ${own_key} : any `);
                                                if (own_next)
                                                    own_args.push(` ${own_next}? : any `);
                                                let [, their_name, ...their_args] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                                their_args = their_args.filter(Boolean);
                                                members[own_name] = [`\t${own_name}(${own_args.join(',')}) {\n\t\treturn this.${propName[1]}(${propName[2] || ''}).${their_name}( ${their_args.join(' , ')} )\n\t}\n\n`];
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push(...['\t\t\tobj.', SourceNode(over.row, over.col, fileName, overName[1]), ' = (', args.join(','), ') => ', ...(v || []), '\n']);
                                        needSet = ns;
                                    });
                                    const object_args = value.select('/', '').sub.map(arg => getValue(arg)).join(' , ');
                                    return ['(( obj )=>{\n', ...overs, '\t\t\treturn obj\n\t\t})( new this.$.', SourceNode(value.row, value.col, fileName, value.type), '( ', object_args, ' ) )'];
                                case (value.type === '*'):
                                    const opts = [];
                                    for (const opt of value.sub) {
                                        if (opt.type === '-')
                                            continue;
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            continue;
                                        }
                                        const key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        const ns = needSet;
                                        const v = getValue(opt.sub[0]);
                                        const arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push(...[
                                            '\t\t\t"',
                                            SourceNode(opt.row, opt.col, fileName, key[1] + '" : '),
                                            arg,
                                            ' ',
                                            ...(v || []),
                                            ' ,\n'
                                        ]);
                                        needSet = ns;
                                    }
                                    return ['({\n', opts.join(''), '\t\t})'];
                                case (value.type === '<=>'):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )'];
                                    }
                                    break;
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')'];
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return [value.type];
                                case 'null':
                                    return ['null as any'];
                            }
                            if (Number(value.type).toString() == value.type)
                                return [value.type];
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(child => {
                        var val = getValue(child, true);
                        if (!val)
                            return;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_mem_force `);
                        if (needSet)
                            val = [
                                `( ${propName[3]} !== void 0 ) ? ${propName[3]} : `,
                                ...val
                            ];
                        val = ['return ', ...val];
                        let decl = ['\t', SourceNode(param.row, param.col, fileName, propName[1]), '(', args.join(','), ') {\n\t\t', ...val, '\n\t}\n\n'];
                        if (needCache) {
                            if (propName[2])
                                decl = ['\t@ $', 'mol_mem_key\n', ...decl];
                            else
                                decl = ['\t@ $', 'mol_mem\n', ...decl];
                        }
                        decl = ['\t/**\n\t *  ```\n', param.toString().trim().replace(/^/mg, '\t *  '), '\n\t *  ```\n\t **/\n', ...decl];
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    throw err;
                }
            }
            var body = Object.keys(members).reduce(function (acc, name) {
                const items = members[name] ? members[name] : ['\t', name, '() { return null as any }\n\t}\n'];
                return [...acc, ...items];
            }, []);
            var classes = ['namespace $ { export class ', SourceNode(def.row, def.col, fileName, def.type), ' extends ', SourceNode(parent.row, parent.col, fileName, parent.type), ' {\n\n', ...body, '} }\n'];
            content = [...content, ...classes];
        }
        return { script: content.join(''), locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//mol/view/tree/tree.ts
;
"use strict";
//milkywaystd/viewcontainer/viewcontainer.test.ts

//# sourceMappingURL=node.test.js.map
