declare let _$_: {
    new (): {};
} & typeof globalThis;
declare class $ extends _$_ {
}
declare namespace $ {
    export type $ = typeof $$;
    export class $$ extends $ {
    }
    namespace $$ {
        type $$ = $;
    }
    export {};
}

declare namespace $ {
    const $mol_ambient_ref: unique symbol;
    type $mol_ambient_context = $;
    function $mol_ambient(this: $ | void, overrides: Partial<$>): $;
}

declare namespace $ {
    function $mol_delegate<Value extends object>(proto: Value, target: () => Value): Value;
}

declare namespace $ {
    const $mol_owning_map: WeakMap<any, any>;
    function $mol_owning_allow<Having>(having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_get<Having, Owner extends object>(having: Having, Owner?: {
        new (): Owner;
    }): Owner | null;
    function $mol_owning_check<Owner, Having>(owner: Owner, having: Having): having is Having & {
        destructor(): void;
    };
    function $mol_owning_catch<Owner, Having>(owner: Owner, having: Having): boolean;
}

declare namespace $ {
    function $mol_fail(error: any): never;
}

declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}

declare namespace $ {
    type $mol_type_writable<T> = {
        -readonly [P in keyof T]: T[P];
    };
}

declare namespace $ {
    class $mol_object2 {
        static $: typeof $$;
        [Symbol.toStringTag]: string;
        [$mol_ambient_ref]: typeof $$;
        get $(): $;
        set $(next: $);
        static create<Instance>(this: new (init?: (instance: any) => void) => Instance, init?: (instance: $mol_type_writable<Instance>) => void): Instance;
        static [Symbol.toPrimitive](): string;
        static toString(): string;
        destructor(): void;
        toString(): string;
        toJSON(): any;
    }
}

declare namespace $ {
    class $mol_after_tick extends $mol_object2 {
        task: () => void;
        promise: any;
        cancelled: boolean;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    function $mol_style_attach(id: string, text: string): HTMLStyleElement | null;
}

declare namespace $ {
    namespace $$ { }
    const $mol_object_field: unique symbol;
    class $mol_object extends $mol_object2 {
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
    }
}

declare namespace $ {
    enum $mol_wire_cursor {
        stale = -1,
        doubt = -2,
        fresh = -3,
        final = -4
    }
}

declare namespace $ {
    class $mol_wire_pub extends Object {
        data: unknown[];
        static get [Symbol.species](): ArrayConstructor;
        protected sub_from: number;
        get sub_list(): readonly $mol_wire_sub[];
        get sub_empty(): boolean;
        sub_on(sub: $mol_wire_pub, pub_pos: number): number;
        sub_off(sub_pos: number): void;
        reap(): void;
        promote(): void;
        fresh(): void;
        complete(): void;
        get incompleted(): boolean;
        emit(quant?: $mol_wire_cursor): void;
        peer_move(from_pos: number, to_pos: number): void;
        peer_repos(peer_pos: number, self_pos: number): void;
    }
}

declare namespace $ {
    interface $mol_wire_sub extends $mol_wire_pub {
        temp: boolean;
        track_on(): $mol_wire_sub | null;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        pub_off(pub_pos: number): void;
        track_cut(sub: $mol_wire_pub | null): void;
        track_off(sub: $mol_wire_pub | null): void;
        absorb(quant: $mol_wire_cursor): void;
        destructor(): void;
    }
}

declare namespace $ {
    let $mol_wire_auto_sub: $mol_wire_sub | null;
    function $mol_wire_auto(next?: $mol_wire_sub | null): $mol_wire_sub | null;
    const $mol_wire_affected: (number | $mol_wire_sub)[];
}

declare namespace $ {
    function $mol_dev_format_register(config: {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => false;
    } | {
        header: (val: any, config: any) => any;
        hasBody: (val: any, config: any) => boolean;
        body: (val: any, config: any) => any;
    }): void;
    let $mol_dev_format_head: symbol;
    let $mol_dev_format_body: symbol;
    function $mol_dev_format_native(obj: any): any;
    function $mol_dev_format_auto(obj: any): any;
    function $mol_dev_format_element(element: string, style: object, ...content: any[]): any[];
    function $mol_dev_format_span(style: object, ...content: any[]): any[];
    let $mol_dev_format_div: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_ol: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_li: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_table: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_tr: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_td: (style: object, ...content: any[]) => any[];
    let $mol_dev_format_accent: (...args: any[]) => any[];
    let $mol_dev_format_strong: (...args: any[]) => any[];
    let $mol_dev_format_string: (...args: any[]) => any[];
    let $mol_dev_format_shade: (...args: any[]) => any[];
    let $mol_dev_format_indent: (...args: any[]) => any[];
}

declare namespace $ {
    class $mol_wire_pub_sub extends $mol_wire_pub implements $mol_wire_sub {
        protected pub_from: number;
        protected cursor: $mol_wire_cursor;
        get temp(): boolean;
        get pub_list(): $mol_wire_pub[];
        track_on(): $mol_wire_sub | null;
        promote(): void;
        track_next(pub?: $mol_wire_pub): $mol_wire_pub | null;
        track_off(sub: $mol_wire_sub | null): void;
        pub_off(sub_pos: number): void;
        destructor(): void;
        track_cut(): void;
        complete(): void;
        complete_pubs(): void;
        absorb(quant?: $mol_wire_cursor): void;
        get pub_empty(): boolean;
    }
}

declare namespace $ {
    class $mol_after_frame extends $mol_object2 {
        task: () => void;
        static _promise: Promise<void> | null;
        static get promise(): Promise<void>;
        cancelled: boolean;
        promise: Promise<void>;
        constructor(task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    function $mol_promise_like(val: any): val is Promise<any>;
}

declare namespace $ {
    abstract class $mol_wire_fiber<Host, Args extends readonly unknown[], Result> extends $mol_wire_pub_sub {
        readonly task: (this: Host, ...args: Args) => Result;
        readonly host?: Host | undefined;
        static warm: boolean;
        static planning: Set<$mol_wire_fiber<any, any, any>>;
        static reaping: Set<$mol_wire_fiber<any, any, any>>;
        static plan_task: $mol_after_frame | null;
        static plan(): void;
        static sync(): void;
        [Symbol.toStringTag]: string;
        cache: Result | Error | Promise<Result | Error>;
        get args(): Args;
        result(): Result | undefined;
        get incompleted(): boolean;
        field(): string;
        constructor(id: string, task: (this: Host, ...args: Args) => Result, host?: Host | undefined, args?: Args);
        plan(): void;
        reap(): void;
        toString(): string;
        toJSON(): string;
        get $(): any;
        emit(quant?: $mol_wire_cursor): void;
        fresh(): void;
        refresh(): void;
        abstract put(next: Result | Error | Promise<Result | Error>): Result | Error | Promise<Result | Error>;
        sync(): Awaited<Result>;
        async(): Promise<Result>;
    }
}

declare namespace $ {
    function $mol_func_name(this: $, func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}

declare namespace $ {
    function $mol_guid(length?: number, exists?: (id: string) => boolean): string;
}

declare namespace $ {
    const $mol_key_store: WeakMap<object, string>;
    function $mol_key<Value>(value: Value): string;
}

declare namespace $ {
    let $mol_compare_deep_cache: WeakMap<any, WeakMap<any, boolean>>;
    function $mol_compare_deep<Value>(left: Value, right: Value): boolean;
}

declare namespace $ {
    class $mol_wire_task<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static getter<Host, Args extends readonly unknown[], Result>(task: (this: Host, ...args: Args) => Result): (host: Host, args: Args) => $mol_wire_task<Host, Args, Result>;
        get temp(): boolean;
        complete(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    function $mol_wire_method<Host extends object, Args extends readonly any[]>(host: Host, field: PropertyKey, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: Host, ...args: Args) => any;
        enumerable?: boolean | undefined;
        configurable?: boolean | undefined;
        writable?: boolean | undefined;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    type $mol_type_tail<Tuple extends readonly any[]> = ((...tail: Tuple) => any) extends ((head: any, ...tail: infer Tail) => any) ? Tail : never;
}

declare namespace $ {
    type $mol_type_foot<Tuple extends readonly any[]> = Tuple['length'] extends 0 ? never : Tuple[$mol_type_tail<Tuple>['length']];
}

declare namespace $ {
    function $mol_fail_catch(error: unknown): boolean;
}

declare namespace $ {
    function $mol_fail_log(error: unknown): boolean;
}

declare namespace $ {
    class $mol_wire_atom<Host, Args extends readonly unknown[], Result> extends $mol_wire_fiber<Host, Args, Result> {
        static solo<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result): $mol_wire_atom<Host, Args, Result>;
        static plex<Host, Args extends readonly unknown[], Result>(host: Host, task: (this: Host, ...args: Args) => Result, key: Args[0]): $mol_wire_atom<Host, Args, Result>;
        static watching: Set<$mol_wire_atom<any, any, any>>;
        static watcher: $mol_after_frame | null;
        static watch(): void;
        watch(): void;
        resync(args: Args): Error | Result | Promise<Error | Result>;
        once(): Awaited<Result>;
        channel(): ((next?: $mol_type_foot<Args>) => Awaited<Result>) & {
            atom: $mol_wire_atom<Host, Args, Result>;
        };
        destructor(): void;
        put(next: Result | Error | Promise<Result | Error>): Error | Result | Promise<Error | Result>;
    }
}

declare namespace $ {
    export function $mol_wire_solo<Args extends any[]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): TypedPropertyDescriptor<(...args: First_optional<Args>) => any>;
    type First_optional<Args extends any[]> = Args extends [] ? [] : [Args[0] | undefined, ...$mol_type_tail<Args>];
    export {};
}

declare namespace $ {
    function $mol_wire_plex<Args extends [any, ...any[]]>(host: object, field: string, descr?: TypedPropertyDescriptor<(...args: Args) => any>): {
        value: (this: typeof host, ...args: Args) => any;
        enumerable?: boolean | undefined;
        configurable?: boolean | undefined;
        writable?: boolean | undefined;
        get?: (() => (...args: Args) => any) | undefined;
        set?: ((value: (...args: Args) => any) => void) | undefined;
    };
}

declare namespace $ {
    let $mol_mem: typeof $mol_wire_solo;
    let $mol_mem_key: typeof $mol_wire_plex;
}

declare namespace $ {
    class $mol_window extends $mol_object {
        static size(): {
            width: number;
            height: number;
        };
        static resizes(next?: Event): Event | undefined;
    }
}

declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], notify?: 'notify'): Element[];
    }
}

declare namespace $ {
    function $mol_maybe<Value>(value: Value | null | undefined): Value[];
}

declare namespace $ {
}

declare namespace $ {
    class $mol_wrapper extends $mol_object2 {
        static wrap: (task: (...ags: any[]) => any) => (...ags: any[]) => any;
        static run<Result>(task: () => Result): Result;
        static func<Args extends any[], Result, Host = void>(func: (this: Host, ...args: Args) => Result): (this: Host, ...args: Args) => Result;
        static get class(): <Class extends new (...args: any[]) => any>(Class: Class) => Class;
        static get method(): (obj: object, name: PropertyKey, descr: PropertyDescriptor) => PropertyDescriptor;
        static get field(): <Host, Field extends keyof Host, Args extends any[], Result>(obj: Host, name: Field, descr: TypedPropertyDescriptor<Result>) => TypedPropertyDescriptor<Result>;
    }
}

declare namespace $ {
    class $mol_memo extends $mol_wrapper {
        static wrap<This extends object, Value>(task: (this: This, next?: Value) => Value): (this: This, next?: Value) => Value | undefined;
    }
}

declare namespace $ {
    function $mol_dom_qname(name: string): string;
}

declare namespace $ {
    function $mol_wire_probe<Value>(task: () => Value, def?: Value): Value | undefined;
}

declare namespace $ {
    function $mol_wire_watch(): void;
}

declare namespace $ {
    function $mol_wire_solid(): void;
}

declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}

declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean | null;
    }): void;
}

declare namespace $ {
    function $mol_wire_async<Host extends object>(obj: Host): (Host extends (...args: infer Args) => infer Res ? Res extends Promise<any> ? Host : (...args: Args) => Promise<Res> : {}) & { [key in keyof Host]: Host[key] extends (...args: infer Args_1) => infer Res_1 ? Res_1 extends Promise<any> ? Host[key] : (...args: Args_1) => Promise<Res_1> : Host[key]; };
}

declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }, passive?: boolean): void;
}

declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}

declare namespace $ {
    function $mol_dom_render_children(el: Element | DocumentFragment, childNodes: NodeList | Array<Node | string | null>): void;
}

declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}

declare namespace $ {
    type $mol_type_keys_extract<Input, Upper> = {
        [Field in keyof Input]: unknown extends Input[Field] ? never : Input[Field] extends never ? never : Input[Field] extends Upper ? Field : never;
    }[keyof Input];
}

declare namespace $ {
    type $mol_type_pick<Input, Upper> = Pick<Input, $mol_type_keys_extract<Input, Upper>>;
}

declare namespace $ {
    class $mol_decor<Value> {
        readonly value: Value;
        constructor(value: Value);
        prefix(): string;
        valueOf(): Value;
        postfix(): string;
        toString(): string;
    }
}

declare namespace $ {
    type $mol_style_unit_length = '%' | 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'cap' | 'ch' | 'em' | 'rem' | 'ex' | 'ic' | 'lh' | 'rlh' | 'vh' | 'vw' | 'vi' | 'vb' | 'vmin' | 'vmax';
    type $mol_style_unit_angle = 'deg' | 'rad' | 'grad' | 'turn';
    type $mol_style_unit_time = 's' | 'ms';
    type $mol_style_unit_any = $mol_style_unit_length | $mol_style_unit_angle | $mol_style_unit_time;
    class $mol_style_unit<Literal extends $mol_style_unit_any> extends $mol_decor<number> {
        readonly literal: Literal;
        constructor(value: number, literal: Literal);
        postfix(): Literal;
        static per(value: number): `${number}%`;
        static px(value: number): `${number}px`;
        static mm(value: number): `${number}mm`;
        static cm(value: number): `${number}cm`;
        static Q(value: number): `${number}Q`;
        static in(value: number): `${number}in`;
        static pc(value: number): `${number}pc`;
        static pt(value: number): `${number}pt`;
        static cap(value: number): `${number}cap`;
        static ch(value: number): `${number}ch`;
        static em(value: number): `${number}em`;
        static rem(value: number): `${number}rem`;
        static ex(value: number): `${number}ex`;
        static ic(value: number): `${number}ic`;
        static lh(value: number): `${number}lh`;
        static rlh(value: number): `${number}rlh`;
        static vh(value: number): `${number}vh`;
        static vw(value: number): `${number}vw`;
        static vi(value: number): `${number}vi`;
        static vb(value: number): `${number}vb`;
        static vmin(value: number): `${number}vmin`;
        static vmax(value: number): `${number}vmax`;
        static deg(value: number): `${number}deg`;
        static rad(value: number): `${number}rad`;
        static grad(value: number): `${number}grad`;
        static turn(value: number): `${number}turn`;
        static s(value: number): `${number}s`;
        static ms(value: number): `${number}ms`;
    }
}

declare namespace $ {
    type $mol_style_func_name = 'calc' | 'hsla' | 'rgba' | 'var' | 'clamp' | 'url' | 'scale' | 'cubic-bezier' | 'linear' | 'steps' | $mol_style_func_filter;
    type $mol_style_func_filter = 'blur' | 'brightness' | 'contrast' | 'drop-shadow' | 'grayscale' | 'hue-rotate' | 'invert' | 'opacity' | 'sepia' | 'saturate';
    class $mol_style_func<Name extends $mol_style_func_name, Value = unknown> extends $mol_decor<Value> {
        readonly name: Name;
        constructor(name: Name, value: Value);
        prefix(): string;
        postfix(): string;
        static calc<Value>(value: Value): $mol_style_func<"calc", Value>;
        static vary<Name extends string, Value extends string>(name: Name, defaultValue?: Value): $mol_style_func<"var", Name | (Name | Value)[]>;
        static url<Href extends string>(href: Href): $mol_style_func<"url", string>;
        static hsla(hue: number, saturation: number, lightness: number, alpha: number): $mol_style_func<"hsla", (number | `${number}%`)[]>;
        static clamp(min: $mol_style_unit<any>, mid: $mol_style_unit<any>, max: $mol_style_unit<any>): $mol_style_func<"clamp", $mol_style_unit<any>[]>;
        static rgba(red: number, green: number, blue: number, alpha: number): $mol_style_func<"rgba", number[]>;
        static scale(zoom: number): $mol_style_func<"scale", number[]>;
        static linear(...breakpoints: Array<number | [number, number | $mol_style_unit<'%'>]>): $mol_style_func<"linear", string[]>;
        static cubic_bezier(x1: number, y1: number, x2: number, y2: number): $mol_style_func<"cubic-bezier", number[]>;
        static steps(value: number, step_position: 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both' | 'start' | 'end'): $mol_style_func<"steps", (number | "end" | "start" | "jump-start" | "jump-end" | "jump-none" | "jump-both")[]>;
        static blur(value?: $mol_style_unit<$mol_style_unit_length>): $mol_style_func<"blur", string | $mol_style_unit<$mol_style_unit_length>>;
        static brightness(value?: number | $mol_style_unit<'%'>): $mol_style_func<"brightness", string | number | $mol_style_unit<"%">>;
        static contrast(value?: number | $mol_style_unit<'%'>): $mol_style_func<"contrast", string | number | $mol_style_unit<"%">>;
        static drop_shadow(color: $mol_style_properties_color, x_offset: $mol_style_unit<$mol_style_unit_length>, y_offset: $mol_style_unit<$mol_style_unit_length>, blur_radius?: $mol_style_unit<$mol_style_unit_length>): $mol_style_func<"drop-shadow", ($mol_style_unit<$mol_style_unit_length> | $mol_style_properties_color)[]>;
        static grayscale(value?: number | $mol_style_unit<'%'>): $mol_style_func<"grayscale", string | number | $mol_style_unit<"%">>;
        static hue_rotate(value?: 0 | $mol_style_unit<$mol_style_unit_angle>): $mol_style_func<"hue-rotate", string | 0 | $mol_style_unit<$mol_style_unit_angle>>;
        static invert(value?: number | $mol_style_unit<'%'>): $mol_style_func<"invert", string | number | $mol_style_unit<"%">>;
        static opacity(value?: number | $mol_style_unit<'%'>): $mol_style_func<"opacity", string | number | $mol_style_unit<"%">>;
        static sepia(value?: number | $mol_style_unit<'%'>): $mol_style_func<"sepia", string | number | $mol_style_unit<"%">>;
        static saturate(value?: number | $mol_style_unit<'%'>): $mol_style_func<"saturate", string | number | $mol_style_unit<"%">>;
    }
}

declare namespace $ {
    type $mol_type_override<Base, Over> = Omit<Base, keyof Over> & Over;
}

declare namespace $ {
    export type $mol_style_properties = Partial<$mol_type_override<CSSStyleDeclaration, Overrides>>;
    type Common = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer' | $mol_style_func<'var'>;
    export type $mol_style_properties_color = 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen' | 'transparent' | 'currentcolor' | $mol_style_func<'hsla' | 'rgba' | 'var'> | `#${string}`;
    type Length = 0 | `${number}${$mol_style_unit_length}` | $mol_style_func<'calc' | 'var' | 'clamp'>;
    type Size = 'auto' | 'max-content' | 'min-content' | 'fit-content' | Length | Common;
    type Directions<Value> = Value | readonly [Value, Value] | {
        top?: Value;
        right?: Value;
        bottom?: Value;
        left?: Value;
    };
    type Single_animation_composition = 'replace' | 'add' | 'accumulate';
    type Single_animation_direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    type Single_animation_fill_mode = 'none' | 'forwards' | 'backwards' | 'both';
    type Single_animation_iteration_count = 'infinite' | number;
    type Single_animation_play_state = 'running' | 'paused';
    type Easing_function = Linear_easing_function | Cubic_bezier_easing_function | Step_easing_function;
    type Linear_easing_function = 'linear' | $mol_style_func<'linear'>;
    type Cubic_bezier_easing_function = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | $mol_style_func<'cubic-bezier'>;
    type Step_easing_function = 'step-start' | 'step-end' | $mol_style_func<'steps'>;
    type Compat_auto = 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio' | 'menulist' | 'listbox' | 'meter' | 'progress-bar' | 'button';
    type Compat_special = 'textfield' | 'menulist-button';
    type Mix_blend_mode = Blend_mode | 'plus-darker' | 'plus-lighter';
    type Blend_mode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
    type Box = 'border-box' | 'padding-box' | 'content-box';
    type Baseline_position = 'baseline' | `${'first' | 'last'} baseline`;
    type Content_distribution = 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
    type Self_position = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end';
    type Content_position = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
    type Span_align = 'none' | 'start' | 'end' | 'center' | $mol_style_func<'var'>;
    type Snap_axis = 'x' | 'y' | 'block' | 'inline' | 'both' | $mol_style_func<'var'>;
    type Overflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' | 'overlay' | Common;
    type Overflow_position = 'unsafe' | 'safe';
    type ContainRule = 'size' | 'layout' | 'style' | 'paint' | $mol_style_func<'var'>;
    type Repeat = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | $mol_style_func<'var'>;
    type BG_size = Length | 'auto' | 'contain' | 'cover';
    interface Overrides {
        accentColor?: $mol_style_properties_color | Common;
        align?: {
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        justify?: {
            content?: 'normal' | Baseline_position | Content_distribution | Content_position | `${Overflow_position} ${Content_position}` | Common;
            items?: 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
            self?: 'auto' | 'normal' | 'stretch' | Baseline_position | Self_position | `${Overflow_position} ${Self_position}` | Common;
        };
        all?: Common;
        animation?: {
            composition?: Single_animation_composition | Single_animation_composition[][] | Common;
            delay?: $mol_style_unit<$mol_style_unit_time> | $mol_style_unit<$mol_style_unit_time>[][] | Common;
            direction?: Single_animation_direction | Single_animation_direction[][] | Common;
            duration?: $mol_style_unit<$mol_style_unit_time> | $mol_style_unit<$mol_style_unit_time>[][] | Common;
            fillMode?: Single_animation_fill_mode | Single_animation_fill_mode[][] | Common;
            iterationCount?: Single_animation_iteration_count | Single_animation_iteration_count[][] | Common;
            name?: 'none' | string & {} | ('none' | string & {})[][] | Common;
            playState?: Single_animation_play_state | Single_animation_play_state[][] | Common;
            timingFunction?: Easing_function | Easing_function[][] | Common;
        };
        appearance?: 'none' | 'auto' | Compat_auto | Compat_special | Common;
        aspectRatio?: 'auto' | number | `${number} / ${number}`;
        backdropFilter: $mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'> | ($mol_style_func<$mol_style_func_filter> | $mol_style_func<'url'>)[][] | 'none' | Common;
        backfaceVisibility: 'visible' | 'hidden' | Common;
        justifyContent?: 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'normal' | 'stretch' | 'center' | Common;
        gap?: Length;
        background?: 'none' | {
            attachment?: 'scroll' | 'fixed' | 'local' | ('scroll' | 'fixed' | 'local')[][] | Common;
            blendMode?: Mix_blend_mode | Mix_blend_mode[][] | Common;
            clip?: Box | Box[][] | Common;
            color?: $mol_style_properties_color | Common;
            image?: readonly (readonly [$mol_style_func<'url'> | string & {}])[] | 'none' | Common;
            repeat?: Repeat | [Repeat, Repeat] | Common;
            position?: 'left' | 'right' | 'top' | 'bottom' | 'center' | Common;
            size?: (BG_size | [BG_size, BG_size])[];
        };
        box?: {
            shadow?: readonly {
                inset?: boolean;
                x: Length;
                y: Length;
                blur: Length;
                spread: Length;
                color: $mol_style_properties_color;
            }[] | 'none' | Common;
        };
        font?: {
            style?: 'normal' | 'italic' | Common;
            weight?: 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | Common;
            size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | Length | Common;
            family?: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | Common;
        };
        color?: $mol_style_properties_color | Common;
        display?: 'block' | 'inline' | 'run-in' | 'list-item' | 'none' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'contents' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-column-group' | 'table-row' | 'table-cell' | 'table-column' | 'table-caption' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' | 'ruby' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' | Common;
        overflow?: Overflow | {
            x?: Overflow | Common;
            y?: Overflow | Common;
            anchor?: 'auto' | 'none' | Common;
        };
        contain?: 'none' | 'strict' | 'content' | ContainRule | readonly ContainRule[] | Common;
        whiteSpace?: 'normal' | 'nowrap' | 'break-spaces' | 'pre' | 'pre-wrap' | 'pre-line' | Common;
        webkitOverflowScrolling?: 'auto' | 'touch' | Common;
        scrollbar?: {
            color?: readonly [$mol_style_properties_color, $mol_style_properties_color] | 'auto' | Common;
            width?: 'auto' | 'thin' | 'none' | Common;
        };
        scroll?: {
            snap?: {
                type: 'none' | Snap_axis | readonly [Snap_axis, 'mandatory' | 'proximity'] | Common;
                stop: 'normal' | 'always' | Common;
                align: Span_align | readonly [Span_align, Span_align] | Common;
            };
            padding?: Directions<Length | 'auto'>;
        };
        width?: Size;
        minWidth?: Size;
        maxWidth?: Size;
        height?: Size;
        minHeight?: Size;
        maxHeight?: Size;
        margin?: Directions<Length | 'auto'>;
        padding?: Directions<Length | 'auto'>;
        position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed' | Common;
        top?: Length | 'auto' | Common;
        right?: Length | 'auto' | Common;
        bottom?: Length | 'auto' | Common;
        left?: Length | 'auto' | Common;
        border?: Directions<{
            radius?: Length | [Length, Length];
            style?: 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | Common;
            color?: $mol_style_properties_color | Common;
            width?: Length | Common;
        }>;
        flex?: 'none' | 'auto' | {
            grow?: number | Common;
            shrink?: number | Common;
            basis?: Size | Common;
            direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | Common;
            wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | Common;
        };
        zIndex: number | Common;
        opacity: number | Common;
    }
    export {};
}

declare namespace $ {
    const $mol_theme: {
        back: $mol_style_func<"var", string[] | "--mol_theme_back">;
        hover: $mol_style_func<"var", string[] | "--mol_theme_hover">;
        card: $mol_style_func<"var", string[] | "--mol_theme_card">;
        current: $mol_style_func<"var", string[] | "--mol_theme_current">;
        special: $mol_style_func<"var", string[] | "--mol_theme_special">;
        text: $mol_style_func<"var", string[] | "--mol_theme_text">;
        control: $mol_style_func<"var", string[] | "--mol_theme_control">;
        shade: $mol_style_func<"var", string[] | "--mol_theme_shade">;
        line: $mol_style_func<"var", string[] | "--mol_theme_line">;
        focus: $mol_style_func<"var", string[] | "--mol_theme_focus">;
        field: $mol_style_func<"var", string[] | "--mol_theme_field">;
        image: $mol_style_func<"var", string[] | "--mol_theme_image">;
    };
}

declare namespace $ {
}

declare namespace $ {
    let $mol_gap: {
        readonly block: $mol_style_func<"var", string[] | "--mol_gap_block">;
        readonly text: $mol_style_func<"var", string[] | "--mol_gap_text">;
        readonly round: $mol_style_func<"var", string[] | "--mol_gap_round">;
        readonly space: $mol_style_func<"var", string[] | "--mol_gap_space">;
        readonly blur: $mol_style_func<"var", string[] | "--mol_gap_blur">;
    };
}

declare namespace $ {
}

declare namespace $ {
    type $mol_view_content = $mol_view | Node | string | number | boolean;
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root<This extends typeof $mol_view>(this: This, id: number): InstanceType<This>;
        autorun(): void;
        static autobind(): void;
        title(): string;
        focused(next?: boolean): boolean;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly (string | number | boolean | $mol_view | Node)[];
        sub_visible(): readonly (string | number | boolean | $mol_view | Node)[];
        minimal_width(): number;
        maximal_width(): number;
        minimal_height(): number;
        static watchers: Set<$mol_view>;
        view_rect(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | null;
        dom_id(): string;
        dom_node(next?: Element): Element;
        dom_final(): Element | undefined;
        dom_tree(next?: Element): Element;
        dom_node_actual(): Element;
        auto(): any;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        static _view_names?: Map<string, string[]>;
        static view_names(suffix: string): string[];
        view_names_owned(): string[];
        view_names(): Set<string>;
        attr_static(): {
            [key: string]: string | number | boolean | null;
        };
        attr(): {};
        style_size(): {
            [key: string]: string | number;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        plugins(): readonly $mol_view[];
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        force_render(path: Set<$mol_view>): void;
        ensure_visible(view: $mol_view, align?: ScrollLogicalPosition): void;
        bring(): void;
    }
    type $mol_view_all = $mol_type_pick<$, typeof $mol_view>;
}

declare namespace $ {
}

interface Window {
    cordova: any;
}
declare namespace $ {
}

declare namespace $ {
    class $mol_plugin extends $mol_view {
        dom_node(next?: Element): Element;
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        render(): void;
    }
}

declare namespace $ {
    class $mol_example extends $mol_view {
        tags(): readonly string[];
        aspects(): readonly string[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_example_large extends $mol_example {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_ionui_router extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_viewcontainer extends $mol_view {
        loaderElement: any;
        addLoaderElement(): void;
        removeLoaderElement(): void;
        getLoaderElement(): Node | null | undefined;
        loading(value?: boolean): boolean;
        dom_tree(next?: Element): Element;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_component extends $milkywaystd_viewcontainer {
        classes(next?: Array<string>): any;
        attr(): {};
        style_size(): {
            [key: string]: string | number;
        };
    }
}

declare namespace $ {
    class $milkywaystd_ionui_app extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $.$$ {
    class $milkywaystd_ionui_app extends $.$milkywaystd_ionui_app {
        constructor();
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_ionui_routeroutlet extends $mol_view {
        dom_name(): string;
        sub(): readonly any[];
        getSubs(): readonly any[];
    }
}

declare namespace $.$$ {
    class $milkywaystd_ionui_routeroutlet extends $.$milkywaystd_ionui_routeroutlet {
        auto(): void;
        delegate(): this;
        ionNavWillChange(ev: any): void;
        ionNavWillLoad(ev: any): void;
        ionNavDidChange(ev: any): void;
        subelement(next?: any): any;
        getSubs(): any[];
        attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): any;
        removeViewFromDom(container: any, component: any): Promise<void>;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_menu extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_title extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_toolbar extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_header extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_listheader extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_icon extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_label extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_item extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_menutoggle extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_content extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo_route extends $mol_view {
        sub(): readonly any[];
        getRoutes(): readonly any[];
        IonRouter(): $milkywaystd_ionui_router;
        IonMenuI(): $IonMenu;
        RouterOutlet(): $RouterOutlet;
        IonApp(): $$.$milkywaystd_ionui_app;
    }
    class $RouterOutlet extends $milkywaystd_ionui_routeroutlet {
        attr(): Record<string, any>;
    }
    class $IonMenu extends $milkywaystd_ionui_menu {
        attr(): Record<string, any>;
        sub(): readonly any[];
        MenuTitleText(): string;
        IonTitle(): $milkywaystd_ionui_title;
        IonToolbar(): $milkywaystd_ionui_toolbar;
        IonHeader(): $milkywaystd_ionui_header;
        ilh(): string;
        IonListHeader(): $milkywaystd_ionui_listheader;
        ic1(): $milkywaystd_ionui_icon;
        hl(): string;
        il1(): $milkywaystd_ionui_label;
        IonItem(): $milkywaystd_ionui_item;
        IonMenuToggle(): $milkywaystd_ionui_menutoggle;
        ic3(): $milkywaystd_ionui_icon;
        hl3(): string;
        il3(): $milkywaystd_ionui_label;
        IonItem3(): $milkywaystd_ionui_item;
        IonMenuToggle3(): $milkywaystd_ionui_menutoggle;
        MenuContent(): $milkywaystd_ionui_content;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_route extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $.$$ {
    class $milkywaystd_ionui_route extends $.$milkywaystd_ionui_route {
        component: $mol_view | typeof $mol_view | null;
        url: string | null;
        cmp: string | null;
        constructor(component?: $mol_view | null, url?: string | null, cmp?: string | null);
        attr(): {};
        auto(): void;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_menubutton extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_buttons extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo_pages_page2 extends $milkywaystd_ionui_component {
        sub(): readonly any[];
        IonMenuButton(): $milkywaystd_ionui_menubutton;
        IonButtons(): $milkywaystd_ionui_buttons;
        Text(): string;
        IonTitle(): $milkywaystd_ionui_title;
        IonTollbar(): $milkywaystd_ionui_toolbar;
        IonHeader(): $milkywaystd_ionui_header;
        IonContent(): $IC2;
    }
    class $IC2 extends $milkywaystd_ionui_content {
        classes(): readonly any[];
        sub(): readonly any[];
        text1(): string;
        titleel(): $milkywaystd_ionui_title;
    }
}

declare namespace $.$$ {
    class $milkywaystd_ionui_demo_route extends $.$milkywaystd_ionui_demo_route {
        getRoutes(): $milkywaystd_ionui_route[];
    }
}

declare namespace $ {
    class $milkywaystd_ionui_refreshercontent extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_refresher extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_spinner extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $.$$ {
    interface StreamListener<T> {
        (value: T): void;
    }
    interface StreamCallable<T> {
        (val: T | undefined): void;
        (): T;
    }
    export class $milkywaystd_classes_StreamClass<T> {
        private listeners;
        private dependents;
        private started;
        private value;
        private changed;
        private constructor();
        static create<T>(init?: T | undefined): Stream<T>;
        static combine<T1, V>(combiner: (s1: T1) => V, streams: [Stream<T1>]): Stream<V>;
        static combine<T1, T2, V>(combiner: (s1: T1, s2: T2) => V, streams: [Stream<T1>, Stream<T2>]): Stream<V>;
        static combine<T1, T2, T3, V>(combiner: (s1: T1, s2: T2, s3: T3) => V, streams: [Stream<T1>, Stream<T2>, Stream<T3>]): Stream<V>;
        static merge<A>(streams: [Stream<A>]): Stream<A>;
        static merge<A, B>(streams: [Stream<A>, Stream<B>]): Stream<A | B>;
        static merge<A, B, C>(streams: [Stream<A>, Stream<B>, Stream<C>]): Stream<A | B | C>;
        static merge<V>(streams: Stream<V>[]): Stream<V>;
        static interval(interval: number): Stream<null>;
        static fromEvent<K extends keyof HTMLElementEventMap>(elem: HTMLElement, type: K): Stream<HTMLElementEventMap[K]>;
        private update;
        private flush;
        private asStream;
        subscribe(listener: StreamListener<T>, emitOnSubscribe?: boolean): this;
        log(name: string): this;
        map<V>(mapper: (val: T) => V): Stream<V>;
        unique(): Stream<T>;
        filter<V extends T = T>(predict: (val: T) => boolean): Stream<V>;
        delay(delayInMs: number): Stream<T>;
        trottle(delay: number): Stream<T>;
        auditTime(delay: number): Stream<T>;
        debounce(delay: number): Stream<T>;
        until(condition$: Stream<boolean>): Stream<T>;
    }
    type Stream<T> = $milkywaystd_classes_StreamClass<T> & StreamCallable<T>;
    export type $milkywaystd_classes_stream<T> = $milkywaystd_classes_StreamClass<T> & StreamCallable<T>;
    const Stream: typeof $milkywaystd_classes_StreamClass.create & typeof $milkywaystd_classes_StreamClass;
    export const $milkywaystd_classes_stream: typeof $milkywaystd_classes_StreamClass.create & typeof $milkywaystd_classes_StreamClass;
    export {};
}

declare namespace $.$$ {
    class $milkywaystd_classes_DefaultIterableDifferFactory implements IterableDifferFactory {
        constructor();
        supports(obj: Object | null | undefined): boolean;
        create<V>(trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V>;
    }
    class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
        readonly length: number;
        readonly collection: V[] | Iterable<V> | null;
        private _linkedRecords;
        private _unlinkedRecords;
        private _previousItHead;
        private _itHead;
        private _itTail;
        private _additionsHead;
        private _additionsTail;
        private _movesHead;
        private _movesTail;
        private _removalsHead;
        private _removalsTail;
        private _identityChangesHead;
        private _identityChangesTail;
        private _trackByFn;
        constructor(trackByFn?: TrackByFunction<V>);
        forEachItem(fn: (record: IterableChangeRecord_<V>) => void): void;
        forEachOperation(fn: (item: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
        forEachPreviousItem(fn: (record: IterableChangeRecord_<V>) => void): void;
        forEachAddedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
        forEachMovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
        forEachRemovedItem(fn: (record: IterableChangeRecord_<V>) => void): void;
        forEachIdentityChange(fn: (record: IterableChangeRecord_<V>) => void): void;
        diff(collection: NgIterable<V> | null | undefined): DefaultIterableDiffer<V> | null;
        onDestroy(): void;
        check(collection: NgIterable<V>): boolean;
        get isDirty(): boolean;
        _reset(): void;
        _mismatch(record: IterableChangeRecord_<V> | null, item: V, itemTrackBy: any, index: number): IterableChangeRecord_<V>;
        _verifyReinsertion(record: IterableChangeRecord_<V>, item: V, itemTrackBy: any, index: number): IterableChangeRecord_<V>;
        _truncate(record: IterableChangeRecord_<V> | null): void;
        _reinsertAfter(record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V> | null, index: number): IterableChangeRecord_<V>;
        _moveAfter(record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V> | null, index: number): IterableChangeRecord_<V>;
        _addAfter(record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V> | null, index: number): IterableChangeRecord_<V>;
        _insertAfter(record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V> | null, index: number): IterableChangeRecord_<V>;
        _remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V>;
        _unlink(record: IterableChangeRecord_<V>): IterableChangeRecord_<V>;
        _addToMoves(record: IterableChangeRecord_<V>, toIndex: number): IterableChangeRecord_<V>;
        private _addToRemovals;
        _addIdentityChange(record: IterableChangeRecord_<V>, item: V): IterableChangeRecord_<V>;
    }
    class IterableChangeRecord_<V> implements IterableChangeRecord<V> {
        item: V;
        trackById: any;
        currentIndex: number | null;
        previousIndex: number | null;
        _nextPrevious: IterableChangeRecord_<V> | null;
        _prev: IterableChangeRecord_<V> | null;
        _next: IterableChangeRecord_<V> | null;
        _prevDup: IterableChangeRecord_<V> | null;
        _nextDup: IterableChangeRecord_<V> | null;
        _prevRemoved: IterableChangeRecord_<V> | null;
        _nextRemoved: IterableChangeRecord_<V> | null;
        _nextAdded: IterableChangeRecord_<V> | null;
        _nextMoved: IterableChangeRecord_<V> | null;
        _nextIdentityChange: IterableChangeRecord_<V> | null;
        constructor(item: V, trackById: any);
    }
    type NgIterable<T> = Array<T> | Iterable<T>;
    interface IterableDiffer<V> {
        diff(object: NgIterable<V> | undefined | null): IterableChanges<V> | null;
    }
    interface IterableChanges<V> {
        forEachItem(fn: (record: IterableChangeRecord<V>) => void): void;
        forEachOperation(fn: (record: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null) => void): void;
        forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void): void;
        forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void): void;
        forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
        forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void): void;
        forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void): void;
    }
    interface IterableChangeRecord<V> {
        readonly currentIndex: number | null;
        readonly previousIndex: number | null;
        readonly item: V;
        readonly trackById: any;
    }
    interface TrackByFunction<T> {
        <U extends T>(index: number, item: T & U): any;
    }
    interface IterableDifferFactory {
        supports(objects: any): boolean;
        create<V>(trackByFn?: TrackByFunction<V>): IterableDiffer<V>;
    }
    function defaultIterableDiffersFactory(): IterableDiffers;
    class IterableDiffers {
        factories: IterableDifferFactory[];
        constructor(factories: IterableDifferFactory[]);
        static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
        find(iterable: any): IterableDifferFactory;
    }
    function getTypeNameForDebugging(type: any): string;
    function isIterable(obj: any): obj is Iterable<any>;
    function isListLikeIterable(obj: any): boolean;
    function areIterablesEqual(a: any, b: any, comparator: (a: any, b: any) => boolean): boolean;
    function iterateListLike(obj: any, fn: (p: any) => any): void;
    function isJsObject(o: any): boolean;
    function getSymbolIterator(): string | symbol;
    function stringify(token: any): string;
    function concatStringsWithSpace(before: string | null, after: string | null): string;
}

declare namespace $ {
    class $milkywaystd_scroll_VirtualForOf extends $mol_view {
    }
}

declare namespace $ {
    class $milkywaystd_scroll_VirtualScrollSpacer extends $mol_view {
    }
}

declare namespace $ {
    class $milkywaystd_scroll_VirtualScrollViewport extends $mol_view {
        pre_sub(): readonly any[];
        post_sub(): readonly any[];
        sub(): readonly any[];
        getForOf(): any;
        totalContentWidth(): number;
        totalContentHeight(): number;
        spacer(): $milkywaystd_scroll_VirtualScrollSpacer;
    }
}

declare namespace $.$$ {
    interface $milkywaystd_scroll_interface_IVirtualScrollStrategy {
        scrolledIndexChange: $milkywaystd_classes_stream<number> | null;
        attach(viewport: any): void;
        detach(): void;
        onContentScrolled(): void;
        onDataLengthChanged(): void;
        onContentRendered(): void;
        onRenderedOffsetChanged(): void;
        scrollToIndex(index: number, behavior: ScrollBehavior): void;
    }
}

declare namespace $.$$ {
    class $milkywaystd_scroll_Differ {
        private _diff;
        private _map;
        create(init: Array<any>): void;
        diff(items: Array<any>): Array<$milkywaystd_scroll_Diff>;
    }
    type $milkywaystd_scroll_Diff = {
        currentIndex: number | null;
        previousIndex: number | null;
        item: any;
    };
}

declare namespace $.$$ {
    type _Without<T> = {
        [P in keyof T]?: never;
    };
    type _XOR<T, U> = (_Without<T> & U) | (_Without<U> & T);
    type _Top = {
        top?: number;
    };
    type _Bottom = {
        bottom?: number;
    };
    type _Left = {
        left?: number;
    };
    type _Right = {
        right?: number;
    };
    type _Start = {
        start?: number;
    };
    type _End = {
        end?: number;
    };
    type _XAxis = _XOR<_XOR<_Left, _Right>, _XOR<_Start, _End>>;
    type _YAxis = _XOR<_Top, _Bottom>;
    type ExtendedScrollToOptions = _XAxis & _YAxis & ScrollOptions;
    class $milkywaystd_scroll_Scrollable {
        protected readonly _destroyed: $milkywaystd_classes_stream<boolean>;
        protected _elementScrolled: $milkywaystd_classes_stream<Event> | null;
        _elementRef: Element;
        destructor(): void;
        scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher;
        constructor(elementRef: Element, scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher, dirr?: any);
        getElementRef(): Element;
        deinit(): void;
        Init(): void;
        elementScrolled(): $milkywaystd_classes_stream<Event> | null;
        get_elementRef(): Element;
        dir: any;
        scrollTo(options: ExtendedScrollToOptions): void;
        private _applyScrollToOptions;
        measureScrollOffset(from: "top" | "left" | "right" | "bottom" | "start" | "end"): number;
    }
    const enum RtlScrollAxisType {
        NORMAL = 0,
        NEGATED = 1,
        INVERTED = 2
    }
    function supportsScrollBehavior(): boolean;
    function getRtlScrollAxisType(): RtlScrollAxisType;
}

declare namespace $.$$ {
    interface _ViewRepeaterItemContext<T> {
        implicit?: T;
    }
    interface _ViewRepeaterItemInsertArgs<C> {
        templateRef: any;
        context?: C;
        index?: number;
    }
    type _ViewRepeaterItemContextFactory<T, R, C extends _ViewRepeaterItemContext<T>> = (record: any, adjustedPreviousIndex: number | null, currentIndex: number | null) => _ViewRepeaterItemInsertArgs<C>;
    type _ViewRepeaterItemValueResolver<T, R> = (record: any) => T;
    const enum _ViewRepeaterOperation {
        REPLACED = 0,
        INSERTED = 1,
        MOVED = 2,
        REMOVED = 3
    }
    interface _ViewRepeaterItemChange<R, C> {
        context?: C;
        operation: _ViewRepeaterOperation;
        record: IterableChangeRecord<R>;
    }
    type _ViewRepeaterItemChanged<R, C> = (change: any) => void;
    interface _ViewRepeater<T, R, C extends _ViewRepeaterItemContext<T>> {
        applyChanges(changes: IterableChanges<R>, viewContainerRef: $milkywaystd_scroll_VirtualForOf, itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>, itemValueResolver: _ViewRepeaterItemValueResolver<T, R>, itemViewChanged?: _ViewRepeaterItemChanged<R, C>): void;
        detach(): void;
    }
    class $milkywaystd_scroll_RecycleViewRepeaterStrategy<T, R, C extends _ViewRepeaterItemContext<T>> implements _ViewRepeater<T, R, C> {
        viewCacheSize: number;
        private _viewCache;
        applyChanges2(changes: Array<$milkywaystd_scroll_Diff>, viewContainerRef: $milkywaystd_scroll_VirtualForOf, itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>, itemValueResolver: _ViewRepeaterItemValueResolver<T, R>, itemViewChanged?: _ViewRepeaterItemChanged<R, C>): void;
        applyChanges(changes: IterableChanges<R>, viewContainerRef: $milkywaystd_scroll_VirtualForOf, itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>, itemValueResolver: _ViewRepeaterItemValueResolver<T, R>, itemViewChanged?: _ViewRepeaterItemChanged<R, C>): void;
        detach(): void;
        private _insertView;
        private _detachAndCacheView;
        private _moveView;
        private _maybeCacheView;
        private _insertViewFromCache;
    }
    class $milkywaystd_scroll_DisposeViewRepeaterStrategy<T, R, C extends _ViewRepeaterItemContext<T>> implements _ViewRepeater<T, R, C> {
        applyChanges(changes: any, viewContainerRef: any, itemContextFactory: any, itemValueResolver: any, itemViewChanged?: any): boolean;
        detach(): void;
    }
}

declare namespace $.$$ {
    export type CdkVirtualForOfContext<T> = {
        implicit: T;
        cdkVirtualForOf: DataSource;
        index: number;
        count: number;
        first: boolean;
        last: boolean;
        even: boolean;
        odd: boolean;
    };
    type DataSource = any;
    export class $milkywaystd_scroll_VirtualForOf extends $.$mol_view {
        readonly viewChange: any;
        private readonly _dataSourceChanges;
        get cdkVirtualForOf(): DataSource | $milkywaystd_classes_stream<[]> | null | undefined;
        set cdkVirtualForOf(value: DataSource | $milkywaystd_classes_stream<[]> | null | undefined);
        _cdkVirtualForOf: DataSource | $milkywaystd_classes_stream<[]> | null | undefined;
        sub(): any[];
        calculatedSubs(val?: undefined | Array<any>): Array<any>;
        idx: number;
        get cdkVirtualForTrackBy(): any;
        set cdkVirtualForTrackBy(fn: any);
        private _cdkVirtualForTrackBy;
        set cdkVirtualForTemplate(value: any);
        get cdkVirtualForTemplateCacheSize(): number;
        set cdkVirtualForTemplateCacheSize(size: number);
        readonly dataStream: $milkywaystd_classes_stream<[]>;
        private _differ;
        private _data;
        private _renderedItems;
        private _renderedRange;
        private _needsUpdate;
        private readonly _destroyed;
        _viewContainerRef(): this;
        _template: null;
        _viewRepeater: $milkywaystd_scroll_RecycleViewRepeaterStrategy<unknown, unknown, _ViewRepeaterItemContext<unknown>>;
        _viewport: $milkywaystd_scroll_VirtualScrollViewportController | null;
        init(): void;
        measureRangeSize(range: ListRange, orientation: "horizontal" | "vertical"): number;
        ngDoCheck(): void;
        destructor(): void;
        private _onRenderedDataChange;
        private _updateContext;
        private _applyChanges;
        private _updateComputedContextProperties;
        private _getEmbeddedViewArgs;
        mutationstarted: boolean;
        tempSubs: any;
        startMutation(): void;
        applyMutation(): void;
        indexOf(view: any): any;
        insert(view: any, index: number): void;
        move(view: any, index: number): void;
        remove(index: number): any;
        detach(index: number): any;
        get(index: number): any;
        createEmbeddedView(templateRef: any, context: any, index: number): void;
    }
    export {};
}

declare namespace $ {
}

declare namespace $.$$ {
    class $milkywaystd_scroll_VirtualScrollViewport extends $.$milkywaystd_scroll_VirtualScrollViewport {
        protected forOf: null | $milkywaystd_scroll_VirtualForOf;
        forOfCtl: null | $milkywaystd_scroll_VirtualScrollViewportController;
        getForOf(): $milkywaystd_scroll_VirtualForOf;
        auto(): void;
        itemHeight(): number;
        itemRendererFactory(): any;
        setData(data: any): void;
        totalContentWidth(): any;
        totalContentHeight(): any;
        minBufferPx(): number;
        maxBufferPx(): number;
        sub(): readonly any[];
    }
}

declare namespace $.$$ {
    const DEFAULT_RESIZE_TIME = 20;
    interface ViewportScrollPosition {
        top: number;
        left: number;
    }
    class $milkywaystd_scroll_ViewportRuler {
        private _viewportSize;
        private readonly _change;
        private _changeListener;
        protected _document: Document;
        constructor(document: any);
        ngOnDestroy(): void;
        getViewportSize(): Readonly<{
            width: number;
            height: number;
        }>;
        getViewportRect(): {
            top: number;
            left: number;
            bottom: number;
            right: number;
            height: number;
            width: number;
        };
        getViewportScrollPosition(): ViewportScrollPosition;
        change(throttleTime?: number): $milkywaystd_classes_stream<Event>;
        private _getWindow;
        private _updateViewportSize;
    }
}

declare namespace $.$$ {
    class $milkywaystd_scroll_ScrollDispatcher {
        protected _document: Document;
        constructor(document: any);
        private readonly _scrolled;
        _globalSubscription: $milkywaystd_classes_stream<any> | null;
        private _scrolledCount;
        scrollContainers: Map<$milkywaystd_scroll_Scrollable, $milkywaystd_classes_stream<any>>;
        register(scrollable: $milkywaystd_scroll_Scrollable): void;
        deregister(scrollable: $milkywaystd_scroll_Scrollable): void;
        scrolled(auditTimeInMs?: number): $milkywaystd_classes_stream<$milkywaystd_scroll_Scrollable | void>;
        ngOnDestroy(): void;
        ancestorScrolled(elementOrElementRef: any, auditTimeInMs?: number): $milkywaystd_classes_stream<$milkywaystd_scroll_Scrollable | void>;
        getAncestorScrollContainers(elementOrElementRef: any): $milkywaystd_scroll_Scrollable[];
        private _getWindow;
        private _scrollableContainsElement;
        private _addGlobalListener;
        private _removeGlobalListener;
    }
}

declare namespace $.$$ {
    abstract class $milkywaystd_scroll_VirtualScrollable extends $milkywaystd_scroll_Scrollable {
        constructor(elementRef: Element, scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher, dir?: any);
        measureViewportSize(orientation: 'horizontal' | 'vertical'): number;
        abstract measureBoundingClientRectWithScrollOffset(from: 'left' | 'top' | 'right' | 'bottom'): number;
    }
}

declare namespace $.$$ {
    type ListRange = {
        start: number;
        end: number;
    };
    class $milkywaystd_scroll_VirtualScrollViewportController extends $milkywaystd_scroll_VirtualScrollable {
        private readonly _detachedSubject;
        private readonly _renderedRangeSubject;
        orientation(orientation?: 'horizontal' | 'vertical'): "horizontal" | "vertical";
        get appendOnly(): boolean;
        set appendOnly(value: boolean);
        private _appendOnly;
        readonly scrolledIndexChange: $milkywaystd_classes_stream<number>;
        _contentWrapper: any;
        readonly renderedRangeStream: $milkywaystd_classes_stream<ListRange>;
        private _totalContentSize;
        _totalContentWidth(): void;
        _totalContentHeight(): string;
        private _renderedContentTransform;
        private _renderedRange;
        private _dataLength;
        private _viewportSize;
        private _forOf;
        private _renderedContentOffset;
        private _renderedContentOffsetNeedsRewrite;
        private _isChangeDetectionPending;
        private _runAfterChangeDetection;
        private _viewportChanges;
        _scrollStrategy: $milkywaystd_scroll_interface_IVirtualScrollStrategy;
        scrollable: $milkywaystd_scroll_VirtualScrollable;
        subscripion: $milkywaystd_classes_stream<Event> | any;
        constructor(elementRef: Element, scrollStrategy: $milkywaystd_scroll_interface_IVirtualScrollStrategy, dir: any, scrollDispatcher: $milkywaystd_scroll_ScrollDispatcher, viewportRuler: $milkywaystd_scroll_ViewportRuler, scrollable?: $milkywaystd_scroll_VirtualScrollable);
        Init(): void;
        deinit(): void;
        attach(forOf: $milkywaystd_scroll_VirtualForOf): void;
        detach(): void;
        getDataLength(): number;
        getViewportSize(): number;
        getRenderedRange(): ListRange;
        measureBoundingClientRectWithScrollOffset(from: 'left' | 'top' | 'right' | 'bottom'): number;
        setTotalContentSize(size: number): void;
        setRenderedRange(range: ListRange): void;
        getOffsetToRenderedContentStart(): number | null;
        setRenderedContentOffset(offset: number, to?: 'to-start' | 'to-end'): void;
        scrollToOffset(offset: number, behavior?: ScrollBehavior): void;
        scrollToIndex(index: number, behavior?: ScrollBehavior): void;
        measureScrollOffset(from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number;
        measureViewportOffset(from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number;
        measureRenderedContentSize(): number;
        measureRangeSize(range: ListRange): number;
        checkViewportSize(): void;
        private _measureViewportSize;
        private _markChangeDetectionNeeded;
        private _doChangeDetection;
    }
}

declare namespace $.$$ {
    class $milkywaystd_scroll_strategy_FixedSizeVirtualScrollStrategy implements $milkywaystd_scroll_interface_IVirtualScrollStrategy {
        private readonly _scrolledIndexChange;
        scrolledIndexChange: $milkywaystd_classes_stream<number>;
        private _viewport;
        private _itemSize;
        private _minBufferPx;
        private _maxBufferPx;
        constructor(itemSize: number, minBufferPx: number, maxBufferPx: number);
        attach(viewport: $milkywaystd_scroll_VirtualScrollViewportController): void;
        detach(): void;
        updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number): void;
        onContentScrolled(): void;
        onDataLengthChanged(): void;
        onContentRendered(): void;
        onRenderedOffsetChanged(): void;
        scrollToIndex(index: number, behavior: ScrollBehavior): void;
        private _updateTotalContentSize;
        private _updateRenderedRange;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo_pages_page4 extends $milkywaystd_ionui_component {
        sub(): readonly any[];
        IonMenuButton(): $milkywaystd_ionui_menubutton;
        IonButtons(): $milkywaystd_ionui_buttons;
        Text(): string;
        IonTitle(): $milkywaystd_ionui_title;
        IonTollbar(): $milkywaystd_ionui_toolbar;
        IonHeader(): $milkywaystd_ionui_header;
        ionRefresh(val?: any): any;
        getRefersherDisabled(): boolean;
        RefresherContent(): $milkywaystd_ionui_refreshercontent;
        Refresher(): $milkywaystd_ionui_refresher;
        itemRendererFactory(): any;
        getSpinnerDisplay(): string;
        infspin(): $milkywaystd_ionui_spinner;
        viewPort(): $$.$milkywaystd_scroll_VirtualScrollViewport;
        IonContent(): $IC4;
    }
    class $IC4 extends $milkywaystd_ionui_content {
        attr(): Record<string, any>;
        classes(): readonly any[];
    }
}

declare namespace $ {
    class $milkywaystd_ionui_img extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_cardsubtitle extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_cardheader extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_button extends $milkywaystd_ionui_component {
        dom_name(): string;
        sub(): readonly any[];
    }
}

declare namespace $ {
    class $milkywaystd_ionui_cardcontent extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_card extends $milkywaystd_ionui_component {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo_catrotator extends $milkywaystd_viewcontainer {
        sub(): readonly any[];
        imgSrc(): any;
        IonImg(): $milkywaystd_ionui_img;
        txt(): string;
        IonCardSubitle(): $milkywaystd_ionui_cardsubtitle;
        IonCardHeader(): $milkywaystd_ionui_cardheader;
        idx(): number;
        txt2(): string;
        rotate(val?: any): any;
        btn(): $milkywaystd_ionui_button;
        IonCardcontent(): $milkywaystd_ionui_cardcontent;
        IonCard(): $milkywaystd_ionui_card;
    }
}

declare namespace $ {
    let $mol_action: typeof $mol_wire_method;
}

declare namespace $ {
    function $mol_wire_sync<Host extends object>(obj: Host): (Host extends (...args: infer Args) => infer Res ? Res extends Promise<infer Res2> ? (...args: Args) => Res2 : Host : {}) & { [key in keyof Host]: Host[key] extends (...args: infer Args_1) => Promise<infer Res_1> ? (...args: Args_1) => Res_1 : Host[key]; };
}

declare namespace $ {
    function $mol_dom_parse(text: string, type?: DOMParserSupportedType): Document;
}

declare var $node: any;

declare namespace $ {
    class $mol_fetch_response extends $mol_object2 {
        readonly native: Response;
        constructor(native: Response);
        status(): "success" | "unknown" | "inform" | "redirect" | "wrong" | "failed";
        code(): number;
        message(): string;
        headers(): Headers;
        mime(): string | null;
        stream(): ReadableStream<Uint8Array> | null;
        text(): string;
        json(): unknown;
        buffer(): ArrayBuffer;
        xml(): Document;
        xhtml(): Document;
        html(): Document;
    }
    class $mol_fetch extends $mol_object2 {
        static request(input: RequestInfo, init?: RequestInit): Promise<Response> & {
            destructor: () => void;
        };
        static response(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static success(input: RequestInfo, init?: RequestInit): $mol_fetch_response;
        static stream(input: RequestInfo, init?: RequestInit): ReadableStream<Uint8Array> | null;
        static text(input: RequestInfo, init?: RequestInit): string;
        static json(input: RequestInfo, init?: RequestInit): unknown;
        static buffer(input: RequestInfo, init?: RequestInit): ArrayBuffer;
        static xml(input: RequestInfo, init?: RequestInit): Document;
        static xhtml(input: RequestInfo, init?: RequestInit): Document;
        static html(input: RequestInfo, init?: RequestInit): Document;
    }
}

declare namespace $.$$ {
    class $milkywaystd_ionui_demo_catrotator extends $.$milkywaystd_ionui_demo_catrotator {
        static cache: Map<any, any>;
        src(): string | null;
        idx(): any;
        context(next?: any): CdkVirtualForOfContext<any>;
        implicit(next?: any): any;
        imgSrc(): null | string;
        subsciber: any;
        rotate(): void;
        dom_id(): string;
        onData(obj: CdkVirtualForOfContext<any>): void;
    }
}

declare namespace $ {
}

declare namespace $.$$ {
    class $milkywaystd_ionui_demo_pages_page4 extends $.$milkywaystd_ionui_demo_pages_page4 {
        ar: any;
        static alert(): void;
        pending(next?: any): any;
        loadnext(): void;
        loadnew(): void;
        getRefersherDisabled(next?: boolean): boolean;
        ionRefresh(): void;
        auto(): null;
        itemRendererFactory(): $milkywaystd_ionui_demo_catrotator;
        getSpinnerDisplay(): "flex" | "none";
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo extends $mol_example_large {
        title(): string;
        sub(): readonly any[];
        View(): $$.$milkywaystd_ionui_demo_route;
    }
}

declare namespace $ {
}

export = $;