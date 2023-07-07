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
    let $mol_action: typeof $mol_wire_method;
}

declare namespace $ {
    function $mol_wire_sync<Host extends object>(obj: Host): (Host extends (...args: infer Args) => infer Res ? Res extends Promise<infer Res2> ? (...args: Args) => Res2 : Host : {}) & { [key in keyof Host]: Host[key] extends (...args: infer Args_1) => Promise<infer Res_1> ? (...args: Args_1) => Res_1 : Host[key]; };
}

declare namespace $ {
    var $mol_dom_context: typeof globalThis;
}

declare namespace $ {
}

declare namespace $ {
    function $mol_dom_parse(text: string, type?: DOMParserSupportedType): Document;
}

declare var $node: any;

declare namespace $ {
    class $mol_fetch_response extends $mol_object2 {
        readonly native: Response;
        constructor(native: Response);
        status(): "unknown" | "inform" | "success" | "redirect" | "wrong" | "failed";
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

declare namespace $ {
    class ErrorResponse extends Error {
        constructor(message?: string | undefined, options?: ErrorOptions | undefined);
        response: $mol_fetch_response | null;
    }
    class $milkywaystd_fetch extends $mol_fetch {
        static success(input: RequestInfo, init?: RequestInit): $milkywaystd_fetch_response;
        static response(input: RequestInfo, init?: RequestInit): $milkywaystd_fetch_response;
    }
    class $milkywaystd_fetch_response extends $mol_fetch_response {
        json(): unknown;
    }
}

declare namespace $ {
    function $mol_wire_async<Host extends object>(obj: Host): (Host extends (...args: infer Args) => infer Res ? Res extends Promise<any> ? Host : (...args: Args) => Promise<Res> : {}) & { [key in keyof Host]: Host[key] extends (...args: infer Args_1) => infer Res_1 ? Res_1 extends Promise<any> ? Host[key] : (...args: Args_1) => Promise<Res_1> : Host[key]; };
}

declare namespace $ {
    function $mol_promise<Result = void>(): Promise<Result> & {
        done: (res: Result | PromiseLike<Result>) => void;
        fail: (error?: any) => void;
    };
}

declare namespace $ {
    type $milkywaystd_crud_id_type = string | number;
    export enum $milkywaystd_crud_events {
        FETCH_LIST_START = 0,
        FETCH_LIST_END = 1,
        FETCH_LIST_ERROR = 2,
        ONE_FETCH_START = 3,
        ONE_FETCH_END = 4,
        ONE_FETCH_ERROR = 5,
        ONE_REPLACE_START = 6,
        ONE_REPLACE_END = 7,
        ONE_REPLACE_ERROR = 8,
        ONE_UPDATE_START = 9,
        ONE_UPDATE_END = 10,
        ONE_UPDATE_ERROR = 11,
        ONE_DELETE_START = 12,
        ONE_DELETE_END = 13,
        ONE_DELETE_ERROR = 14,
        CREATE_START = 15,
        CREATE_END = 16,
        CREATE_ERROR = 17
    }
    export class $milkywaystd_crud<T> extends $.$mol_object2 {
        _headers: Record<string, string>;
        headers(value?: Record<string, string>): Record<string, string>;
        private _apiUrl;
        get apiUrl(): string;
        set apiUrl(value: string);
        private _apiResource;
        get apiResource(): string;
        set apiResource(value: string);
        private _idKey;
        get idKey(): string;
        set idKey(value: string);
        params(obj?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        customUrlFunc: null | (() => string);
        listDataFunc: (data: any) => Array<T>;
        listMetaFunc: (data: any) => Object;
        oneItemFunc: (data: any) => T;
        processErrorFunc: (error: Error) => any;
        packPostData: (data: unknown) => unknown;
        packUpdateData: (data: unknown) => unknown;
        packReplaceData: (data: unknown) => unknown;
        url(): string;
        urlList(): string;
        urlOne(id?: $milkywaystd_crud_id_type): string;
        metaInfo(value?: unknown): Record<string, any>;
        _creatingId: string;
        creatingId(val?: string): string;
        _keyCache: Map<string, any>;
        dataKeys(): {
            [key: string]: T;
        } | {};
        _cachedObject: Map<any, any>;
        getCachedObject(id: $milkywaystd_crud_id_type): any;
        setCachedObject(id: any, val: T): Map<any, any>;
        prependToList(data: T): void;
        appendToList(data: T): void;
        removeFromList(id: string): boolean;
        replaceListItem(replaceId: string, data: T): boolean;
        list(data?: Array<T>): Array<T>;
        byId(id: string, val?: T): T;
        byServerId(id: string): T;
        byIdR(id: string, val?: T): T;
        creatingChannel(id: string, val?: T): T;
        fetchList(): T[];
        fetchOne(id: $milkywaystd_crud_id_type): T;
        create(item: Partial<T>, id?: $milkywaystd_crud_id_type): T;
        updateOne(id: $milkywaystd_crud_id_type, item: Partial<T>): T;
        replaceOne(id: $milkywaystd_crud_id_type, item: Partial<T>): T;
        deleteOne(id: $milkywaystd_crud_id_type): boolean;
        private editFn;
        updateListItem(item: T): void;
        removeListItem(id: $milkywaystd_crud_id_type): void;
        isPending(status?: boolean): boolean;
        pendingChanel(val?: any): any;
        isListPending(status?: boolean): boolean;
        listPendingChanel(val?: any): any;
        isOnePending(status?: boolean): boolean;
        onePendingChanel(val?: any): any;
        trackEvent(id: $milkywaystd_crud_id_type, status?: $milkywaystd_crud_events | "", error?: ErrorResponse): void;
        trackEventChannel(id: string, status?: $milkywaystd_crud_events | ""): "" | $milkywaystd_crud_events;
        trackEventErrorChanel(id: string, param?: any): {
            error: ErrorResponse;
        } | null;
        listReload(): any;
        reset(val?: any): any;
    }
    export {};
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
    class $mol_scroll extends $mol_view {
        scroll_top(next?: any): number;
        scroll_left(next?: any): number;
        field(): Record<string, any>;
        event(): Record<string, any>;
        tabindex(): number;
        event_scroll(event?: any): any;
    }
}

declare namespace $ {
    class $mol_dom_listener extends $mol_object {
        _node: any;
        _event: string;
        _handler: (event: any) => any;
        _config: boolean | {
            passive: boolean;
        };
        constructor(_node: any, _event: string, _handler: (event: any) => any, _config?: boolean | {
            passive: boolean;
        });
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_print extends $mol_object {
        static before(): $mol_dom_listener;
        static after(): $mol_dom_listener;
        static active(next?: boolean): boolean;
    }
}

declare namespace $ {
    type $mol_style_pseudo_class = ':active' | ':any' | ':any-link' | ':checked' | ':default' | ':defined' | ':dir(rtl)' | ':dir(ltr)' | ':disabled' | ':empty' | ':enabled' | ':first' | ':first-child' | ':first-of-type' | ':fullscreen' | ':focus' | ':focus-visible' | ':focus-within' | ':hover' | ':indeterminate' | ':in-range' | ':invalid' | ':last-child' | ':last-of-type' | ':left' | ':link' | ':not()' | ':nth-child(even)' | ':nth-child(odd)' | ':nth-last-child(even)' | ':nth-last-child(odd)' | ':nth-of-type(even)' | ':nth-of-type(odd)' | ':nth-last-of-type(even)' | ':nth-last-of-type(odd)' | ':only-child' | ':only-of-type' | ':optional' | ':out-of-range' | ':placeholder-shown' | ':read-only' | ':read-write' | ':required' | ':right' | ':root' | ':scope' | ':target' | ':valid' | ':visited';
}

declare namespace $ {
    type $mol_style_pseudo_element = '::after' | '::before' | '::cue' | '::first-letter' | '::first-line' | '::selection' | '::slotted' | '::backdrop' | '::placeholder' | '::marker' | '::spelling-error' | '::grammar-error' | '::-webkit-calendar-picker-indicator' | '::-webkit-color-swatch' | '::-webkit-color-swatch-wrapper' | '::-webkit-details-marker' | '::-webkit-file-upload-button' | '::-webkit-image-inner-element' | '::-webkit-inner-spin-button' | '::-webkit-input-placeholder' | '::-webkit-input-speech-button' | '::-webkit-keygen-select' | '::-webkit-media-controls-panel' | '::-webkit-media-controls-timeline-container' | '::-webkit-media-slider-container' | '::-webkit-meter-bar' | '::-webkit-meter-even-less-good-value' | '::-webkit-meter-optimum-value' | '::-webkit-meter-suboptimal-value' | '::-webkit-progress-bar' | '::-webkit-progress-value' | '::-webkit-resizer' | '::-webkit-resizer:window-inactive' | '::-webkit-scrollbar' | '::-webkit-scrollbar-button' | '::-webkit-scrollbar-button:disabled' | '::-webkit-scrollbar-button:double-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment' | '::-webkit-scrollbar-button:double-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:double-button:horizontal:start:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:decrement' | '::-webkit-scrollbar-button:double-button:vertical:end:increment' | '::-webkit-scrollbar-button:double-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:double-button:vertical:start:decrement' | '::-webkit-scrollbar-button:double-button:vertical:start:increment' | '::-webkit-scrollbar-button:end' | '::-webkit-scrollbar-button:end:decrement' | '::-webkit-scrollbar-button:end:increment' | '::-webkit-scrollbar-button:horizontal' | '::-webkit-scrollbar-button:horizontal:decrement' | '::-webkit-scrollbar-button:horizontal:decrement:active' | '::-webkit-scrollbar-button:horizontal:decrement:hover' | '::-webkit-scrollbar-button:horizontal:decrement:window-inactive' | '::-webkit-scrollbar-button:horizontal:end' | '::-webkit-scrollbar-button:horizontal:end:decrement' | '::-webkit-scrollbar-button:horizontal:end:increment' | '::-webkit-scrollbar-button:horizontal:end:increment:corner-present' | '::-webkit-scrollbar-button:horizontal:increment' | '::-webkit-scrollbar-button:horizontal:increment:active' | '::-webkit-scrollbar-button:horizontal:increment:hover' | '::-webkit-scrollbar-button:horizontal:increment:window-inactive' | '::-webkit-scrollbar-button:horizontal:start' | '::-webkit-scrollbar-button:horizontal:start:decrement' | '::-webkit-scrollbar-button:horizontal:start:increment' | '::-webkit-scrollbar-button:start' | '::-webkit-scrollbar-button:start:decrement' | '::-webkit-scrollbar-button:start:increment' | '::-webkit-scrollbar-button:vertical' | '::-webkit-scrollbar-button:vertical:decrement' | '::-webkit-scrollbar-button:vertical:decrement:active' | '::-webkit-scrollbar-button:vertical:decrement:hover' | '::-webkit-scrollbar-button:vertical:decrement:window-inactive' | '::-webkit-scrollbar-button:vertical:end' | '::-webkit-scrollbar-button:vertical:end:decrement' | '::-webkit-scrollbar-button:vertical:end:increment' | '::-webkit-scrollbar-button:vertical:end:increment:corner-present' | '::-webkit-scrollbar-button:vertical:increment' | '::-webkit-scrollbar-button:vertical:increment:active' | '::-webkit-scrollbar-button:vertical:increment:hover' | '::-webkit-scrollbar-button:vertical:increment:window-inactive' | '::-webkit-scrollbar-button:vertical:start' | '::-webkit-scrollbar-button:vertical:start:decrement' | '::-webkit-scrollbar-button:vertical:start:increment' | '::-webkit-scrollbar-corner' | '::-webkit-scrollbar-corner:window-inactive' | '::-webkit-scrollbar-thumb' | '::-webkit-scrollbar-thumb:horizontal' | '::-webkit-scrollbar-thumb:horizontal:active' | '::-webkit-scrollbar-thumb:horizontal:hover' | '::-webkit-scrollbar-thumb:horizontal:window-inactive' | '::-webkit-scrollbar-thumb:vertical' | '::-webkit-scrollbar-thumb:vertical:active' | '::-webkit-scrollbar-thumb:vertical:hover' | '::-webkit-scrollbar-thumb:vertical:window-inactive' | '::-webkit-scrollbar-track' | '::-webkit-scrollbar-track-piece' | '::-webkit-scrollbar-track-piece:disabled' | '::-webkit-scrollbar-track-piece:end' | '::-webkit-scrollbar-track-piece:horizontal:decrement' | '::-webkit-scrollbar-track-piece:horizontal:decrement:active' | '::-webkit-scrollbar-track-piece:horizontal:decrement:hover' | '::-webkit-scrollbar-track-piece:horizontal:end' | '::-webkit-scrollbar-track-piece:horizontal:end:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:double-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button' | '::-webkit-scrollbar-track-piece:horizontal:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:horizontal:end:single-button' | '::-webkit-scrollbar-track-piece:horizontal:increment' | '::-webkit-scrollbar-track-piece:horizontal:increment:active' | '::-webkit-scrollbar-track-piece:horizontal:increment:hover' | '::-webkit-scrollbar-track-piece:horizontal:start' | '::-webkit-scrollbar-track-piece:horizontal:start:double-button' | '::-webkit-scrollbar-track-piece:horizontal:start:no-button' | '::-webkit-scrollbar-track-piece:horizontal:start:single-button' | '::-webkit-scrollbar-track-piece:start' | '::-webkit-scrollbar-track-piece:vertical:decrement' | '::-webkit-scrollbar-track-piece:vertical:decrement:active' | '::-webkit-scrollbar-track-piece:vertical:decrement:hover' | '::-webkit-scrollbar-track-piece:vertical:end' | '::-webkit-scrollbar-track-piece:vertical:end:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:double-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button' | '::-webkit-scrollbar-track-piece:vertical:end:no-button:corner-present' | '::-webkit-scrollbar-track-piece:vertical:end:single-button' | '::-webkit-scrollbar-track-piece:vertical:increment' | '::-webkit-scrollbar-track-piece:vertical:increment:active' | '::-webkit-scrollbar-track-piece:vertical:increment:hover' | '::-webkit-scrollbar-track-piece:vertical:start' | '::-webkit-scrollbar-track-piece:vertical:start:double-button' | '::-webkit-scrollbar-track-piece:vertical:start:no-button' | '::-webkit-scrollbar-track-piece:vertical:start:single-button' | '::-webkit-scrollbar-track:disabled' | '::-webkit-scrollbar-track:horizontal' | '::-webkit-scrollbar-track:horizontal:disabled' | '::-webkit-scrollbar-track:horizontal:disabled:corner-present' | '::-webkit-scrollbar-track:vertical:disabled' | '::-webkit-scrollbar-track:vertical:disabled:corner-present' | '::-webkit-scrollbar:horizontal' | '::-webkit-scrollbar:horizontal:corner-present' | '::-webkit-scrollbar:horizontal:window-inactive' | '::-webkit-scrollbar:vertical' | '::-webkit-scrollbar:vertical:corner-present' | '::-webkit-scrollbar:vertical:window-inactive' | '::-webkit-search-cancel-button' | '::-webkit-search-decoration' | '::-webkit-search-results-button' | '::-webkit-search-results-decoration' | '::-webkit-slider-container' | '::-webkit-slider-runnable-track' | '::-webkit-slider-thumb' | '::-webkit-slider-thumb:disabled' | '::-webkit-slider-thumb:hover' | '::-webkit-textfield-decoration-container' | '::-webkit-validation-bubble' | '::-webkit-validation-bubble-arrow' | '::-webkit-validation-bubble-arrow-clipper' | '::-webkit-validation-bubble-heading' | '::-webkit-validation-bubble-message' | '::-webkit-validation-bubble-text-block';
}

declare namespace $ {
    type $mol_type_error<Message, Info = {}> = Message & {
        $mol_type_error: Info;
    };
}

declare namespace $ {
    type Attrs<View extends $mol_view, Config, Attrs = ReturnType<View['attr']>> = {
        [name in keyof Attrs]?: {
            [val in keyof Config[Extract<name, keyof Config>]]: $mol_style_guard<View, Config[Extract<name, keyof Config>][val]>;
        };
    };
    type Medias<View extends $mol_view, Config> = {
        [query in keyof Config]: $mol_style_guard<View, Config[query]>;
    };
    type Keys<View extends $mol_view> = '>' | '@' | keyof $mol_style_properties | $mol_style_pseudo_element | $mol_style_pseudo_class | $mol_type_keys_extract<View, () => $mol_view> | `$${string}`;
    export type $mol_style_guard<View extends $mol_view, Config> = {
        [key in Keys<View>]?: unknown;
    } & {
        [key in keyof Config]: key extends keyof $mol_style_properties ? $mol_style_properties[key] : key extends '>' | $mol_style_pseudo_class | $mol_style_pseudo_element ? $mol_style_guard<View, Config[key]> : key extends '@' ? Attrs<View, Config[key]> : key extends '@media' ? Medias<View, Config[key]> : key extends `--${string}` ? any : key extends keyof $ ? $mol_style_guard<InstanceType<Extract<$[key], typeof $mol_view>>, Config[key]> : key extends keyof View ? View[key] extends (id?: any) => infer Sub ? Sub extends $mol_view ? $mol_style_guard<Sub, Config[key]> : $mol_type_error<'Property returns non $mol_view', {
            Returns: Sub;
        }> : $mol_type_error<'Field is not a Property'> : key extends `$${string}` ? $mol_type_error<'Unknown View Class'> : $mol_type_error<'Unknown CSS Property'>;
    };
    export {};
}

declare namespace $ {
    function $mol_style_sheet<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config0: Config): string;
}

declare namespace $ {
    function $mol_style_define<Component extends $mol_view, Config extends $mol_style_guard<Component, Config>>(Component: new () => Component, config: Config): HTMLStyleElement | null;
}

declare namespace $.$$ {
    class $mol_scroll extends $.$mol_scroll {
        scroll_top(next?: number, cache?: 'cache'): number;
        scroll_left(next?: number, cache?: 'cache'): number;
        event_scroll(next?: Event): void;
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    class $mol_book2 extends $mol_scroll {
        menu_title(): string;
        sub(): readonly $mol_view[];
        minimal_width(): number;
        Placeholder(): $mol_view;
        Gap(id: any): $mol_view;
        pages(): readonly $mol_view[];
    }
}

declare namespace $ {
    let $mol_mem_cached: typeof $mol_wire_probe;
}

declare namespace $.$$ {
    class $mol_book2 extends $.$mol_book2 {
        title(): string;
        menu_title(): string;
        sub(): readonly $mol_view[];
        bring(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_link extends $mol_view {
        uri(): string;
        dom_name(): string;
        attr(): Record<string, any>;
        sub(): readonly $mol_view_content[];
        arg(): Record<string, any>;
        event(): Record<string, any>;
        uri_toggle(): string;
        hint(): string;
        hint_safe(): string;
        target(): string;
        file_name(): string;
        current(): boolean;
        event_click(event?: any): any;
        click(event?: any): any;
    }
}

declare namespace $ {
    class $mol_state_arg extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static href_normal(): string;
        static href_absolute(): string;
        static dict(next?: {
            [key: string]: string | null;
        }): Readonly<{
            [key: string]: string;
        }>;
        static dict_cut(except: string[]): {
            [key: string]: string;
        };
        static value(key: string, next?: string | null): string | null;
        static link(next: Record<string, string | null>): string;
        static prolog: string;
        static separator: string;
        static make_link(next: {
            [key: string]: string | null;
        }): string;
        static go(next: {
            [key: string]: string | null;
        }): void;
        static encode(str: string): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string | null;
        sub(postfix: string): $mol_state_arg;
        link(next: Record<string, string | null>): string;
    }
}

declare namespace $.$$ {
    class $mol_link extends $.$mol_link {
        uri_toggle(): string;
        uri(): string;
        uri_off(): string;
        uri_native(): URL;
        current(): boolean;
        file_name(): string;
        minimal_height(): number;
        external(): boolean;
        target(): '_self' | '_blank' | '_top' | '_parent' | string;
        hint_safe(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_pop extends $mol_view {
        showed(next?: any): boolean;
        align_vert(): string;
        align_hor(): string;
        prefer(): string;
        sub(): readonly any[];
        sub_visible(): readonly any[];
        Anchor(): any;
        align(): string;
        bubble_content(): readonly $mol_view_content[];
        height_max(): number;
        Bubble(): $mol_pop_bubble;
    }
    class $mol_pop_bubble extends $mol_view {
        sub(): readonly $mol_view_content[];
        style(): Record<string, any>;
        attr(): Record<string, any>;
        content(): readonly $mol_view_content[];
        height_max(): number;
        align(): string;
    }
}

declare namespace $ {
    let $mol_layer: {
        readonly hover: $mol_style_func<"var", string[] | "--mol_layer_hover">;
        readonly focus: $mol_style_func<"var", string[] | "--mol_layer_focus">;
        readonly speck: $mol_style_func<"var", string[] | "--mol_layer_speck">;
        readonly float: $mol_style_func<"var", string[] | "--mol_layer_float">;
        readonly popup: $mol_style_func<"var", string[] | "--mol_layer_popup">;
    };
}

declare namespace $ {
}

declare namespace $.$$ {
    class $mol_pop extends $.$mol_pop {
        showed(next?: boolean): boolean;
        sub_visible(): any[];
        height_max(): number;
        align(): string;
        align_vert(): "suspense" | "top" | "bottom";
        align_hor(): "suspense" | "left" | "right";
        View_port(): $mol_view;
        view_port(): {
            width: number;
            height: number;
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | {
            left: number;
            top: number;
            width: number;
            height: number;
        };
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_speck extends $mol_view {
        attr(): Record<string, any>;
        style(): Record<string, any>;
        sub(): readonly any[];
        theme(): string;
        value(): any;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        click(event?: any): any;
        event_click(event?: any): any;
        event(): Record<string, any>;
        attr(): Record<string, any>;
        sub(): readonly $mol_view_content[];
        Speck(): $mol_speck;
        event_activate(event?: any): any;
        clicks(event?: any): any;
        event_key_press(event?: any): any;
        disabled(): boolean;
        tab_index(): number;
        hint(): string;
        hint_safe(): string;
        error(): string;
    }
}

declare namespace $ {
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        slashBackLeft = 226,
        bracketClose = 221,
        quoteSingle = 222
    }
}

declare namespace $.$$ {
    class $mol_button extends $.$mol_button {
        status(next?: any[]): any[];
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): void;
        tab_index(): number;
        error(): string;
        hint_safe(): string;
        sub_visible(): ($mol_view_content | $mol_speck)[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_button_typed extends $mol_button {
        minimal_height(): number;
        minimal_width(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_button_minor extends $mol_button_typed {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_hotkey extends $mol_plugin {
        event(): Record<string, any>;
        key(): Record<string, any>;
        mod_ctrl(): boolean;
        mod_alt(): boolean;
        mod_shift(): boolean;
        keydown(event?: any): any;
    }
}

declare namespace $.$$ {
    class $mol_hotkey extends $.$mol_hotkey {
        key(): {
            [x: number]: ((event: KeyboardEvent) => void) | undefined;
            readonly backspace?: ((event: KeyboardEvent) => void) | undefined;
            readonly tab?: ((event: KeyboardEvent) => void) | undefined;
            readonly enter?: ((event: KeyboardEvent) => void) | undefined;
            readonly shift?: ((event: KeyboardEvent) => void) | undefined;
            readonly ctrl?: ((event: KeyboardEvent) => void) | undefined;
            readonly alt?: ((event: KeyboardEvent) => void) | undefined;
            readonly pause?: ((event: KeyboardEvent) => void) | undefined;
            readonly capsLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly escape?: ((event: KeyboardEvent) => void) | undefined;
            readonly space?: ((event: KeyboardEvent) => void) | undefined;
            readonly pageUp?: ((event: KeyboardEvent) => void) | undefined;
            readonly pageDown?: ((event: KeyboardEvent) => void) | undefined;
            readonly end?: ((event: KeyboardEvent) => void) | undefined;
            readonly home?: ((event: KeyboardEvent) => void) | undefined;
            readonly left?: ((event: KeyboardEvent) => void) | undefined;
            readonly up?: ((event: KeyboardEvent) => void) | undefined;
            readonly right?: ((event: KeyboardEvent) => void) | undefined;
            readonly down?: ((event: KeyboardEvent) => void) | undefined;
            readonly insert?: ((event: KeyboardEvent) => void) | undefined;
            readonly delete?: ((event: KeyboardEvent) => void) | undefined;
            readonly key0?: ((event: KeyboardEvent) => void) | undefined;
            readonly key1?: ((event: KeyboardEvent) => void) | undefined;
            readonly key2?: ((event: KeyboardEvent) => void) | undefined;
            readonly key3?: ((event: KeyboardEvent) => void) | undefined;
            readonly key4?: ((event: KeyboardEvent) => void) | undefined;
            readonly key5?: ((event: KeyboardEvent) => void) | undefined;
            readonly key6?: ((event: KeyboardEvent) => void) | undefined;
            readonly key7?: ((event: KeyboardEvent) => void) | undefined;
            readonly key8?: ((event: KeyboardEvent) => void) | undefined;
            readonly key9?: ((event: KeyboardEvent) => void) | undefined;
            readonly A?: ((event: KeyboardEvent) => void) | undefined;
            readonly B?: ((event: KeyboardEvent) => void) | undefined;
            readonly C?: ((event: KeyboardEvent) => void) | undefined;
            readonly D?: ((event: KeyboardEvent) => void) | undefined;
            readonly E?: ((event: KeyboardEvent) => void) | undefined;
            readonly F?: ((event: KeyboardEvent) => void) | undefined;
            readonly G?: ((event: KeyboardEvent) => void) | undefined;
            readonly H?: ((event: KeyboardEvent) => void) | undefined;
            readonly I?: ((event: KeyboardEvent) => void) | undefined;
            readonly J?: ((event: KeyboardEvent) => void) | undefined;
            readonly K?: ((event: KeyboardEvent) => void) | undefined;
            readonly L?: ((event: KeyboardEvent) => void) | undefined;
            readonly M?: ((event: KeyboardEvent) => void) | undefined;
            readonly N?: ((event: KeyboardEvent) => void) | undefined;
            readonly O?: ((event: KeyboardEvent) => void) | undefined;
            readonly P?: ((event: KeyboardEvent) => void) | undefined;
            readonly Q?: ((event: KeyboardEvent) => void) | undefined;
            readonly R?: ((event: KeyboardEvent) => void) | undefined;
            readonly S?: ((event: KeyboardEvent) => void) | undefined;
            readonly T?: ((event: KeyboardEvent) => void) | undefined;
            readonly U?: ((event: KeyboardEvent) => void) | undefined;
            readonly V?: ((event: KeyboardEvent) => void) | undefined;
            readonly W?: ((event: KeyboardEvent) => void) | undefined;
            readonly X?: ((event: KeyboardEvent) => void) | undefined;
            readonly Y?: ((event: KeyboardEvent) => void) | undefined;
            readonly Z?: ((event: KeyboardEvent) => void) | undefined;
            readonly metaLeft?: ((event: KeyboardEvent) => void) | undefined;
            readonly metaRight?: ((event: KeyboardEvent) => void) | undefined;
            readonly select?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad0?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad1?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad2?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad3?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad4?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad5?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad6?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad7?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad8?: ((event: KeyboardEvent) => void) | undefined;
            readonly numpad9?: ((event: KeyboardEvent) => void) | undefined;
            readonly multiply?: ((event: KeyboardEvent) => void) | undefined;
            readonly add?: ((event: KeyboardEvent) => void) | undefined;
            readonly subtract?: ((event: KeyboardEvent) => void) | undefined;
            readonly decimal?: ((event: KeyboardEvent) => void) | undefined;
            readonly divide?: ((event: KeyboardEvent) => void) | undefined;
            readonly F1?: ((event: KeyboardEvent) => void) | undefined;
            readonly F2?: ((event: KeyboardEvent) => void) | undefined;
            readonly F3?: ((event: KeyboardEvent) => void) | undefined;
            readonly F4?: ((event: KeyboardEvent) => void) | undefined;
            readonly F5?: ((event: KeyboardEvent) => void) | undefined;
            readonly F6?: ((event: KeyboardEvent) => void) | undefined;
            readonly F7?: ((event: KeyboardEvent) => void) | undefined;
            readonly F8?: ((event: KeyboardEvent) => void) | undefined;
            readonly F9?: ((event: KeyboardEvent) => void) | undefined;
            readonly F10?: ((event: KeyboardEvent) => void) | undefined;
            readonly F11?: ((event: KeyboardEvent) => void) | undefined;
            readonly F12?: ((event: KeyboardEvent) => void) | undefined;
            readonly numLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly scrollLock?: ((event: KeyboardEvent) => void) | undefined;
            readonly semicolon?: ((event: KeyboardEvent) => void) | undefined;
            readonly equals?: ((event: KeyboardEvent) => void) | undefined;
            readonly comma?: ((event: KeyboardEvent) => void) | undefined;
            readonly dash?: ((event: KeyboardEvent) => void) | undefined;
            readonly period?: ((event: KeyboardEvent) => void) | undefined;
            readonly forwardSlash?: ((event: KeyboardEvent) => void) | undefined;
            readonly graveAccent?: ((event: KeyboardEvent) => void) | undefined;
            readonly bracketOpen?: ((event: KeyboardEvent) => void) | undefined;
            readonly slashBack?: ((event: KeyboardEvent) => void) | undefined;
            readonly slashBackLeft?: ((event: KeyboardEvent) => void) | undefined;
            readonly bracketClose?: ((event: KeyboardEvent) => void) | undefined;
            readonly quoteSingle?: ((event: KeyboardEvent) => void) | undefined;
        };
        keydown(event?: KeyboardEvent): void;
    }
}

declare namespace $ {
    class $mol_nav extends $mol_plugin {
        cycle(next?: any): boolean;
        mod_ctrl(): boolean;
        mod_shift(): boolean;
        mod_alt(): boolean;
        keys_x(next?: any): readonly any[];
        keys_y(next?: any): readonly any[];
        current_x(next?: any): any;
        current_y(next?: any): any;
        event_up(event?: any): any;
        event_down(event?: any): any;
        event_left(event?: any): any;
        event_right(event?: any): any;
        event(): Record<string, any>;
        event_key(event?: any): any;
    }
}

declare namespace $.$$ {
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): undefined;
        event_up(event?: KeyboardEvent): undefined;
        event_down(event?: KeyboardEvent): undefined;
        event_left(event?: KeyboardEvent): undefined;
        event_right(event?: KeyboardEvent): undefined;
        index_y(): number | null;
        index_x(): number | null;
    }
}

declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static changes(next?: StorageEvent): StorageEvent | undefined;
        static value<Value>(key: string, next?: Value | null): Value | null;
        prefix(): string;
        value(key: string, next?: Value): Value | null;
    }
}

declare namespace $ {
}

declare namespace $ {
    type $mol_charset_encoding = 'utf8' | 'utf-16le' | 'utf-16be' | 'ibm866' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-6' | 'iso-8859-7' | 'iso-8859-8' | 'iso-8859-8i' | 'iso-8859-10' | 'iso-8859-13' | 'iso-8859-14' | 'iso-8859-15' | 'iso-8859-16' | 'koi8-r' | 'koi8-u' | 'koi8-r' | 'macintosh' | 'windows-874' | 'windows-1250' | 'windows-1251' | 'windows-1252' | 'windows-1253' | 'windows-1254' | 'windows-1255' | 'windows-1256' | 'windows-1257' | 'windows-1258' | 'x-mac-cyrillic' | 'gbk' | 'gb18030' | 'hz-gb-2312' | 'big5' | 'euc-jp' | 'iso-2022-jp' | 'shift-jis' | 'euc-kr' | 'iso-2022-kr';
}

declare namespace $ {
    function $mol_charset_decode(buffer: BufferSource, encoding?: $mol_charset_encoding): string;
}

declare namespace $ {
    function $mol_charset_encode(value: string): Uint8Array;
}

declare namespace $ {
    type $mol_file_type = 'file' | 'dir' | 'link';
    interface $mol_file_stat {
        type: $mol_file_type;
        size: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
    }
    class $mol_file_not_found extends Error {
    }
    abstract class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        static base: string;
        path(): string;
        parent(): $mol_file;
        abstract stat(next?: $mol_file_stat | null, virt?: 'virt'): $mol_file_stat | null;
        reset(): void;
        version(): string;
        abstract ensure(): void;
        watcher(): {
            destructor(): void;
        };
        exists(next?: boolean): boolean;
        type(): "" | $mol_file_type;
        name(): string;
        ext(): string;
        abstract buffer(next?: Uint8Array): Uint8Array;
        text(next?: string, virt?: 'virt'): string;
        abstract sub(): $mol_file[];
        abstract resolve(path: string): $mol_file;
        abstract relate(base?: $mol_file): string;
        abstract append(next: Uint8Array | string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
        size(): number;
    }
}

declare namespace $ {
    class $mol_file_web extends $mol_file {
        static absolute(path: string): $mol_file_web;
        static relative(path: string): $mol_file_web;
        static base: string;
        buffer(next?: Uint8Array): Uint8Array;
        stat(next?: $mol_file_stat, virt?: 'virt'): $mol_file_stat;
        resolve(path: string): $mol_file_web;
        ensure(): void;
        sub(): $mol_file[];
        relate(base?: $mol_file): string;
        append(next: Uint8Array | string): void;
    }
}

declare namespace $ {
    function $mol_huggingface_run(this: $, space: string, method: string | number, ...data: readonly any[]): readonly any[];
    function $mol_huggingface_rest(space: string, method: string, ...data: readonly any[]): readonly any[];
    function $mol_huggingface_ws(space: string, fn_index: number, ...data: readonly any[]): Promise<readonly any[]> & {
        destructor: () => void;
    };
}

declare namespace $ {
    function $hyoo_lingua_translate(this: $, lang: string, text: string): string;
}

declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
        static warn(key: string): null;
    }
}

declare namespace $ {
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        minimal_height(): number;
        autocomplete(): boolean;
        selection(next?: any): readonly number[];
        auto(): readonly any[];
        field(): Record<string, any>;
        attr(): Record<string, any>;
        event(): Record<string, any>;
        plugins(): readonly any[];
        selection_watcher(): any;
        disabled(): boolean;
        value(next?: any): string;
        value_changed(next?: any): string;
        hint(): string;
        hint_visible(): string;
        spellcheck(): boolean;
        autocomplete_native(): string;
        selection_end(): number;
        selection_start(): number;
        keyboard(): string;
        enter(): string;
        length_max(): number;
        type(next?: any): string;
        event_change(event?: any): any;
        submit_with_ctrl(): boolean;
        submit(event?: any): any;
        Submit(): $$.$mol_hotkey;
    }
}

declare namespace $.$$ {
    class $mol_string extends $.$mol_string {
        event_change(next?: Event): void;
        hint_visible(): string;
        disabled(): boolean;
        autocomplete_native(): "on" | "off";
        selection_watcher(): $mol_dom_listener;
        selection_change(event: Event): void;
        selection_start(): number;
        selection_end(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_svg extends $mol_view {
        dom_name(): string;
        dom_name_space(): string;
        font_size(): number;
        font_family(): string;
        style_size(): Record<string, any>;
    }
}

declare namespace $ {
    class $mol_after_timeout extends $mol_object2 {
        delay: number;
        task: () => void;
        id: any;
        constructor(delay: number, task: () => void);
        destructor(): void;
    }
}

declare namespace $ {
    class $mol_state_time extends $mol_object {
        static task(precision: number, reset?: null): $mol_after_timeout | $mol_after_frame;
        static now(precision: number): number;
    }
}

declare namespace $.$$ {
    class $mol_svg extends $.$mol_svg {
        computed_style(): Record<string, any>;
        font_size(): number;
        font_family(): any;
    }
}

declare namespace $ {
    class $mol_svg_root extends $mol_svg {
        dom_name(): string;
        attr(): Record<string, any>;
        view_box(): string;
        aspect(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        attr(): Record<string, any>;
        geometry(): string;
    }
}

declare namespace $ {
    class $mol_icon extends $mol_svg_root {
        view_box(): string;
        minimal_width(): number;
        minimal_height(): number;
        sub(): readonly any[];
        path(): string;
        Path(): $mol_svg_path;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_cross extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_list extends $mol_view {
        render_visible_only(): boolean;
        render_over(): number;
        sub(): readonly $mol_view[];
        Empty(): $mol_view;
        Gap_before(): $mol_view;
        Gap_after(): $mol_view;
        view_window(): readonly any[];
        rows(): readonly $mol_view[];
        gap_before(): number;
        gap_after(): number;
    }
}

declare namespace $ {
    function $mol_support_css_overflow_anchor(this: $): boolean;
}

declare namespace $.$$ {
    class $mol_list extends $.$mol_list {
        sub(): readonly $mol_view[];
        render_visible_only(): boolean;
        view_window(next?: [number, number]): [number, number];
        gap_before(): number;
        gap_after(): number;
        sub_visible(): $mol_view[];
        minimal_height(): number;
        force_render(path: Set<$mol_view>): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_paragraph extends $mol_view {
        line_height(): number;
        letter_width(): number;
        width_limit(): number;
        row_width(): number;
        sub(): readonly any[];
    }
}

declare namespace $.$$ {
    class $mol_paragraph extends $.$mol_paragraph {
        maximal_width(): number;
        width_limit(): number;
        minimal_width(): number;
        row_width(): number;
        minimal_height(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_dimmer extends $mol_paragraph {
        haystack(): string;
        needle(): string;
        sub(): readonly $mol_view_content[];
        Low(id: any): $$.$mol_paragraph;
        High(id: any): $$.$mol_paragraph;
        parts(): readonly $mol_view_content[];
        string(id: any): string;
    }
}

declare namespace $ {
    type $mol_type_equals<A, B> = (<X>() => X extends A ? 1 : 2) extends (<X>() => X extends B ? 1 : 2) ? unknown : never;
}

declare namespace $ {
    type $mol_type_merge<Intersection> = Intersection extends (...a: any[]) => any ? Intersection : Intersection extends new (...a: any[]) => any ? Intersection : Intersection extends object ? $mol_type_merge_object<Intersection> extends Intersection ? unknown extends $mol_type_equals<$mol_type_merge_object<Intersection>, Intersection> ? Intersection : {
        [Key in keyof Intersection]: $mol_type_merge<Intersection[Key]>;
    } : Intersection : Intersection;
    type $mol_type_merge_object<Intersection> = {
        [Key in keyof Intersection]: Intersection[Key];
    };
}

declare namespace $ {
    type $mol_type_intersect<Union> = (Union extends any ? (_: Union) => void : never) extends ((_: infer Intersection) => void) ? Intersection : never;
}

declare namespace $ {
    type $mol_unicode_category = [$mol_unicode_category_binary] | ['General_Category', $mol_char_category_general] | ['Script', $mol_unicode_category_script] | ['Script_Extensions', $mol_unicode_category_script];
    type $mol_unicode_category_binary = 'ASCII' | 'ASCII_Hex_Digit' | 'Alphabetic' | 'Any' | 'Assigned' | 'Bidi_Control' | 'Bidi_Mirrored' | 'Case_Ignorable' | 'Cased' | 'Changes_When_Casefolded' | 'Changes_When_Casemapped' | 'Changes_When_Lowercased' | 'Changes_When_NFKC_Casefolded' | 'Changes_When_Titlecased' | 'Changes_When_Uppercased' | 'Dash' | 'Default_Ignorable_Code_Point' | 'Deprecated' | 'Diacritic' | 'Emoji' | 'Emoji_Component' | 'Emoji_Modifier' | 'Emoji_Modifier_Base' | 'Emoji_Presentation' | 'Extended_Pictographic' | 'Extender' | 'Grapheme_Base' | 'Grapheme_Extend' | 'Hex_Digit' | 'IDS_Binary_Operator' | 'IDS_Trinary_Operator' | 'ID_Continue' | 'ID_Start' | 'Ideographic' | 'Join_Control' | 'Logical_Order_Exception' | 'Lowercase' | 'Math' | 'Noncharacter_Code_Point' | 'Pattern_Syntax' | 'Pattern_White_Space' | 'Quotation_Mark' | 'Radical' | 'Regional_Indicator' | 'Sentence_Terminal' | 'Soft_Dotted' | 'Terminal_Punctuation' | 'Unified_Ideograph' | 'Uppercase' | 'Variation_Selector' | 'White_Space' | 'XID_Continue' | 'XID_Start';
    type $mol_char_category_general = 'Cased_Letter' | 'Close_Punctuation' | 'Connector_Punctuation' | 'Control' | 'Currency_Symbol' | 'Dash_Punctuation' | 'Decimal_Number' | 'Enclosing_Mark' | 'Final_Punctuation' | 'Format' | 'Initial_Punctuation' | 'Letter' | 'Letter_Number' | 'Line_Separator' | 'Lowercase_Letter' | 'Mark' | 'Math_Symbol' | 'Modifier_Letter' | 'Modifier_Symbol' | 'Nonspacing_Mark' | 'Number' | 'Open_Punctuation' | 'Other' | 'Other_Letter' | 'Other_Number' | 'Other_Punctuation' | 'Other_Symbol' | 'Paragraph_Separator' | 'Private_Use' | 'Punctuation' | 'Separator' | 'Space_Separator' | 'Spacing_Mark' | 'Surrogate' | 'Symbol' | 'Titlecase_Letter' | 'Unassigned' | 'Uppercase_Letter';
    type $mol_unicode_category_script = 'Adlam' | 'Ahom' | 'Anatolian_Hieroglyphs' | 'Arabic' | 'Armenian' | 'Avestan' | 'Balinese' | 'Bamum' | 'Bassa_Vah' | 'Batak' | 'Bengali' | 'Bhaiksuki' | 'Bopomofo' | 'Brahmi' | 'Braille' | 'Buginese' | 'Buhid' | 'Canadian_Aboriginal' | 'Carian' | 'Caucasian_Albanian' | 'Chakma' | 'Cham' | 'Chorasmian' | 'Cherokee' | 'Common' | 'Coptic' | 'Cuneiform' | 'Cypriot' | 'Cyrillic' | 'Deseret' | 'Devanagari' | 'Dives_Akuru' | 'Dogra' | 'Duployan' | 'Egyptian_Hieroglyphs' | 'Elbasan' | 'Elymaic' | 'Ethiopic' | 'Georgian' | 'Glagolitic' | 'Gothic' | 'Grantha' | 'Greek' | 'Gujarati' | 'Gunjala_Gondi' | 'Gurmukhi' | 'Han' | 'Hangul' | 'Hanifi_Rohingya' | 'Hanunoo' | 'Hatran' | 'Hebrew' | 'Hiragana' | 'Imperial_Aramaic' | 'Inherited' | 'Inscriptional_Pahlavi' | 'Inscriptional_Parthian' | 'Javanese' | 'Kaithi' | 'Kannada' | 'Katakana' | 'Kayah_Li' | 'Kharoshthi' | 'Khitan_Small_Script' | 'Khmer' | 'Khojki' | 'Khudawadi' | 'Lao' | 'Latin' | 'Lepcha' | 'Limbu' | 'Linear_A' | 'Linear_B' | 'Lisu' | 'Lycian' | 'Lydian' | 'Mahajani' | 'Makasar' | 'Malayalam' | 'Mandaic' | 'Manichaean' | 'Marchen' | 'Medefaidrin' | 'Masaram_Gondi' | 'Meetei_Mayek' | 'Mende_Kikakui' | 'Meroitic_Cursive' | 'Meroitic_Hieroglyphs' | 'Miao' | 'Modi' | 'Mongolian' | 'Mro' | 'Multani' | 'Myanmar' | 'Nabataean' | 'Nandinagari' | 'New_Tai_Lue' | 'Newa' | 'Nko' | 'Nushu' | 'Nyiakeng_Puachue_Hmong' | 'Ogham' | 'Ol_Chiki' | 'Old_Hungarian' | 'Old_Italic' | 'Old_North_Arabian' | 'Old_Permic' | 'Old_Persian' | 'Old_Sogdian' | 'Old_South_Arabian' | 'Old_Turkic' | 'Oriya' | 'Osage' | 'Osmanya' | 'Pahawh_Hmong' | 'Palmyrene' | 'Pau_Cin_Hau' | 'Phags_Pa' | 'Phoenician' | 'Psalter_Pahlavi' | 'Rejang' | 'Runic' | 'Samaritan' | 'Saurashtra' | 'Sharada' | 'Shavian' | 'Siddham' | 'SignWriting' | 'Sinhala' | 'Sogdian' | 'Sora_Sompeng' | 'Soyombo' | 'Sundanese' | 'Syloti_Nagri' | 'Syriac' | 'Tagalog' | 'Tagbanwa' | 'Tai_Le' | 'Tai_Tham' | 'Tai_Viet' | 'Takri' | 'Tamil' | 'Tangut' | 'Telugu' | 'Thaana' | 'Thai' | 'Tibetan' | 'Tifinagh' | 'Tirhuta' | 'Ugaritic' | 'Vai' | 'Wancho' | 'Warang_Citi' | 'Yezidi' | 'Yi' | 'Zanabazar_Square';
}

interface String {
    match<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.match]>;
    matchAll<RE extends RegExp>(regexp: RE): ReturnType<RE[typeof Symbol.matchAll]>;
}
declare namespace $ {
    type Groups_to_params<T> = {
        [P in keyof T]?: T[P] | boolean | undefined;
    };
    export type $mol_regexp_source = number | string | RegExp | {
        [key in string]: $mol_regexp_source;
    } | readonly [$mol_regexp_source, ...$mol_regexp_source[]];
    export type $mol_regexp_groups<Source extends $mol_regexp_source> = Source extends number ? {} : Source extends string ? {} : Source extends $mol_regexp_source[] ? $mol_type_merge<$mol_type_intersect<{
        [key in Extract<keyof Source, number>]: $mol_regexp_groups<Source[key]>;
    }[Extract<keyof Source, number>]>> : Source extends RegExp ? Record<string, string> extends NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> ? {} : NonNullable<NonNullable<ReturnType<Source['exec']>>['groups']> : Source extends {
        readonly [key in string]: $mol_regexp_source;
    } ? $mol_type_merge<$mol_type_intersect<{
        [key in keyof Source]: $mol_type_merge<$mol_type_override<{
            readonly [k in Extract<keyof Source, string>]: string;
        }, {
            readonly [k in key]: Source[key] extends string ? Source[key] : string;
        }> & $mol_regexp_groups<Source[key]>>;
    }[keyof Source]>> : never;
    export class $mol_regexp<Groups extends Record<string, string>> extends RegExp {
        readonly groups: (Extract<keyof Groups, string>)[];
        constructor(source: string, flags?: string, groups?: (Extract<keyof Groups, string>)[]);
        [Symbol.matchAll](str: string): IterableIterator<RegExpMatchArray & $mol_type_override<RegExpMatchArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }>>;
        [Symbol.match](str: string): null | RegExpMatchArray;
        [Symbol.split](str: string): string[];
        test(str: string): boolean;
        exec(str: string): RegExpExecArray & $mol_type_override<RegExpExecArray, {
            groups?: {
                [key in keyof Groups]: string;
            };
        }> | null;
        generate(params: Groups_to_params<Groups>): string | null;
        get native(): RegExp;
        static repeat<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static repeat_greedy<Source extends $mol_regexp_source>(source: Source, min?: number, max?: number): $mol_regexp<$mol_regexp_groups<Source>>;
        static vary<Sources extends readonly $mol_regexp_source[]>(sources: Sources): $mol_regexp<$mol_regexp_groups<Sources[number]>>;
        static optional<Source extends $mol_regexp_source>(source: Source): $mol_regexp<$mol_regexp_groups<Source>>;
        static force_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static forbid_after(source: $mol_regexp_source): $mol_regexp<Record<string, string>>;
        static from<Source extends $mol_regexp_source>(source: Source, { ignoreCase, multiline }?: Partial<Pick<RegExp, 'ignoreCase' | 'multiline'>>): $mol_regexp<$mol_regexp_groups<Source>>;
        static unicode_only(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static unicode_except(...category: $mol_unicode_category): $mol_regexp<Record<string, string>>;
        static char_range(from: number, to: number): $mol_regexp<{}>;
        static char_only(...allowed: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static char_except(...forbidden: readonly [$mol_regexp_source, ...$mol_regexp_source[]]): $mol_regexp<{}>;
        static decimal_only: $mol_regexp<{}>;
        static decimal_except: $mol_regexp<{}>;
        static latin_only: $mol_regexp<{}>;
        static latin_except: $mol_regexp<{}>;
        static space_only: $mol_regexp<{}>;
        static space_except: $mol_regexp<{}>;
        static word_break_only: $mol_regexp<{}>;
        static word_break_except: $mol_regexp<{}>;
        static tab: $mol_regexp<{}>;
        static slash_back: $mol_regexp<{}>;
        static nul: $mol_regexp<{}>;
        static char_any: $mol_regexp<{}>;
        static begin: $mol_regexp<{}>;
        static end: $mol_regexp<{}>;
        static or: $mol_regexp<{}>;
        static line_end: $mol_regexp<{
            readonly win_end: string;
            readonly mac_end: string;
        }>;
    }
    export {};
}

declare namespace $.$$ {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_search extends $mol_pop {
        query(next?: any): string;
        suggests(): readonly string[];
        plugins(): readonly $mol_plugin[];
        showed(next?: any): boolean;
        align_hor(): string;
        Anchor(): $mol_view;
        bubble_content(): readonly $mol_view_content[];
        Suggest(id: any): $mol_button_minor;
        clear(next?: any): any;
        Hotkey(): $$.$mol_hotkey;
        nav_components(): readonly $mol_view[];
        nav_focused(component?: any): any;
        Nav(): $$.$mol_nav;
        suggests_showed(next?: any): boolean;
        hint(): string;
        submit(event?: any): any;
        enabled(): boolean;
        keyboard(): string;
        enter(): string;
        bring(): void;
        Query(): $$.$mol_string;
        Clear_icon(): $mol_icon_cross;
        Clear(): $mol_button_minor;
        anchor_content(): readonly any[];
        menu_items(): readonly $mol_view[];
        Menu(): $$.$mol_list;
        suggest_select(id: any, event?: any): any;
        suggest_label(id: any): string;
        Suggest_label(id: any): $$.$mol_dimmer;
        suggest_content(id: any): readonly $mol_view_content[];
    }
}

declare namespace $.$$ {
    class $mol_search extends $.$mol_search {
        anchor_content(): ($mol_string | $mol_button_minor)[];
        suggests_showed(next?: boolean): boolean;
        suggest_selected(next?: string): void;
        nav_components(): ($mol_string | $mol_button_minor)[];
        nav_focused(component?: $mol_view): $mol_view | $mol_string | $mol_button_minor | null;
        suggest_label(key: string): string;
        menu_items(): $mol_button_minor[];
        suggest_select(id: string, event?: MouseEvent): void;
        clear(event?: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_page extends $mol_view {
        dom_name(): string;
        field(): Record<string, any>;
        sub(): readonly any[];
        tabindex(): number;
        Logo(): any;
        title_content(): readonly any[];
        Title(): $mol_view;
        tools(): readonly $mol_view_content[];
        Tools(): $mol_view;
        head(): readonly any[];
        Head(): $mol_view;
        body(): readonly $mol_view_content[];
        body_scroll_top(next?: any): number;
        Body(): $$.$mol_scroll;
        foot(): readonly $mol_view[];
        Foot(): $mol_view;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    class $mol_book2_catalog extends $mol_book2 {
        param(): string;
        spread(next?: any): string;
        spreads(): Record<string, any>;
        Spread(): $mol_view;
        pages(): readonly any[];
        Spread_close(): $$.$mol_link;
        Menu_logo(): any;
        menu_title(): string;
        menu_tools(): readonly any[];
        menu_head(): readonly any[];
        menu_filter(next?: any): string;
        Menu_filter(): $$.$mol_search;
        arg(id: any): Record<string, any>;
        spread_title(id: any): string;
        Menu_link_title(id: any): $$.$mol_dimmer;
        menu_link_content(id: any): readonly any[];
        Menu_link(id: any): $$.$mol_link;
        menu_links(): readonly any[];
        Menu_links(): $$.$mol_list;
        menu_body(): readonly any[];
        menu_foot(): readonly any[];
        Menu_title(): $mol_view;
        Menu_tools(): $mol_view;
        Menu(): $mol_page;
        spread_close_arg(): Record<string, any>;
        Spread_close_icon(): $mol_icon_cross;
    }
}

declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => string[]): (variant: Variant) => boolean;
}

declare namespace $.$$ {
    class $mol_book2_catalog extends $.$mol_book2_catalog {
        pages(): any[];
        menu_body(): ($mol_list | $mol_search)[];
        menu_links(): $mol_link[];
        Spread(): any;
        spread(next?: string): string;
        arg(spread: string): {
            [x: string]: string | null;
        };
        spread_close_arg(): {
            [x: string]: null;
        };
        spread_title(spread: string): any;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_crud_demo extends $mol_example_large {
        title(): string;
        sub(): readonly any[];
        tags(): readonly any[];
        products(): $$.$milkywaystd_crud_demo_products;
        products2(): $$.$milkywaystd_crud_demo_products2;
        View(): $$.$mol_book2_catalog;
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

declare namespace $ {
    class $milkywaystd_scroll_demo extends $mol_example_large {
        title(): string;
        sub(): readonly any[];
        tags(): readonly any[];
        itemRendererFactory(): any;
        viewPort(): $$.$milkywaystd_scroll_VirtualScrollViewport;
    }
}

declare namespace $ {
    class $mol_row extends $mol_view {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_scroll_demo_testitemrenderer extends $mol_row {
        sub(): readonly any[];
        minimal_height(): number;
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

declare namespace $.$$ {
    class $milkywaystd_scroll_demo_testitemrenderer extends $.$milkywaystd_scroll_demo_testitemrenderer {
        onData(obj: CdkVirtualForOfContext<any>): void;
        title(): any;
        context(next?: any): CdkVirtualForOfContext<any>;
        implicit(next?: any): any;
        dom_id(): string;
    }
}

declare namespace $.$$ {
    class $milkywaystd_scroll_demo extends $.$milkywaystd_scroll_demo {
        ar: any;
        itemRendererFactory(): $milkywaystd_scroll_demo_testitemrenderer;
        auto(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_check extends $mol_button_minor {
        attr(): Record<string, any>;
        sub(): readonly $mol_view_content[];
        checked(next?: any): boolean;
        aria_checked(): string;
        aria_role(): string;
        Icon(): any;
        title(): string;
        Title(): $mol_view;
        label(): readonly any[];
    }
}

declare namespace $ {
}

declare namespace $.$$ {
    class $mol_check extends $.$mol_check {
        click(next?: Event): void;
        sub(): readonly $mol_view_content[];
        label(): readonly any[];
        aria_checked(): string;
    }
}

declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_expand extends $mol_check {
        Icon(): $mol_icon_chevron;
        level(): number;
        style(): Record<string, any>;
        checked(next?: any): boolean;
        enabled(): boolean;
        level_style(): string;
        expanded(next?: any): boolean;
        expandable(): boolean;
    }
}

declare namespace $.$$ {
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_ui_treemenu extends $mol_list {
        Trigger(id: any): $$.$mol_check_expand;
        Tools(id: any): any;
        items(): readonly any[];
        Label(id: any): $mol_view;
        Content(id: any): $mol_view;
        subitem(id: any): $$.$mol_list;
        subitem_link(id: any): $$.$mol_link;
        expanded(id: any, val?: any): boolean;
        itemexpandable(id: any): boolean;
        itemtitle(id: any): string;
        filter_title(val?: any): string;
        Trigger_title(id: any): $$.$mol_dimmer;
        label(id: any): readonly any[];
        TriggerOrLink(id: any): readonly any[];
        subcontent(id: any): readonly any[];
        container(id: any): $mol_view;
        rows_list(id: any): readonly $mol_view[];
        linkarg(id: any): Record<string, any>;
        linktitle(id: any): string;
        filter(val?: any): string;
        Option_title(id: any): $$.$mol_dimmer;
    }
}

declare namespace $ {
}

declare namespace $.$$ {
    type $milkywaystd_ui_treemenu_data_item = {
        expanded?: boolean;
        id?: string;
        label: string;
        link: string | Record<string, string>;
        items?: Array<$milkywaystd_ui_treemenu_data_item>;
        parent?: $milkywaystd_ui_treemenu_data_item | undefined | null;
    };
    class $milkywaystd_ui_treemenu extends $.$milkywaystd_ui_treemenu {
        items(val?: $milkywaystd_ui_treemenu_data_item[]): readonly $milkywaystd_ui_treemenu_data_item[];
        sub(): readonly $mol_view[];
        rows_list(id: string): $mol_view[];
        itemtitle(id: string): string;
        linktitle(id: string): string;
        itemexpandable(id: string): boolean;
        linkarg(id: string): any;
        Tools(id: string): $mol_link | null;
        TriggerOrLink(id: string): ($mol_link | $mol_check_expand | null)[];
        reset(): void;
        _idsCache: Set<string>;
        cache(id: string, value?: $milkywaystd_ui_treemenu_data_item): $milkywaystd_ui_treemenu_data_item;
        fill(subs: $.$mol_view[], input: readonly $milkywaystd_ui_treemenu_data_item[]): $mol_view[];
        subcontent(id: string, val?: $mol_view[]): $mol_view[];
        expanded(id: string, val?: boolean): boolean;
    }
}

declare namespace $ {
    class $milkywaystd_ui_treemenu_demo extends $mol_example_large {
        title(): string;
        tree_menu_items(): readonly any[];
        sub(): readonly any[];
        tags(): readonly any[];
        p1(): Record<string, any>;
        p22(): Record<string, any>;
        p2(): Record<string, any>;
        menu(): $$.$milkywaystd_ui_treemenu;
    }
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

declare namespace $ {
    class $milkywaystd_ui_iframe extends $mol_view {
        dom_name(): string;
    }
}

declare namespace $ {
    class $milkywaystd_ionui_demo_iframe extends $mol_example_large {
        title(): string;
        sub(): readonly any[];
        tags(): readonly any[];
        iframe(): $milkywaystd_ui_iframe;
    }
}

declare namespace $ {
    class $mol_example_small extends $mol_example {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_tag_sieve extends $mol_object2 {
        ids_tags(): Record<string, string[]>;
        separator(): string;
        tags(): string[];
        ids(): string[];
        ids_tags_initial(): {
            ids_tags: Record<string, string[]>;
            tags: string[];
            ids: string[];
        };
        ids_tags_filtered(prefix: string): {
            ids_tags: Record<string, string[]>;
            tags: string[];
            ids: string[];
        };
        prefix(): string[];
        prefix_sub(id: string): string[];
        select(id: string): $mol_tag_sieve;
    }
}

declare namespace $ {
    class $mol_expander extends $mol_list {
        rows(): readonly any[];
        expanded(next?: any): boolean;
        expandable(): boolean;
        label(): readonly any[];
        Trigger(): $$.$mol_check_expand;
        Tools(): any;
        Label(): $mol_view;
        content(): readonly any[];
        Content(): $$.$mol_list;
    }
}

declare namespace $.$$ {
    class $mol_expander extends $.$mol_expander {
        rows(): $mol_view[];
        expandable(): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_tag_tree extends $mol_list {
        sieve(): $mol_tag_sieve;
        levels_expanded(): number;
        sort_items(): any;
        sort_tags(): any;
        sub(): readonly $mol_view[];
        tag_name(id: any): string;
        tag_names(): Record<string, any>;
        tag_list(): readonly $mol_view[];
        item_list(): readonly $mol_view[];
        Item(id: any): $mol_view;
        Tag(id: any): $$.$mol_expander;
        ids_tags(): Record<string, any>;
        separator(): string;
        item_title(id: any): string;
        tag_expanded(id: any, next?: any): boolean;
        sieve_sub(id: any): $mol_tag_sieve;
        Tag_tree(id: any): $$.$mol_tag_tree;
    }
}

declare namespace $ {
    function $mol_compare_text<Item>(item?: (item: Item) => string): (a: Item, b: Item) => number;
}

declare namespace $.$$ {
    class $mol_tag_tree extends $.$mol_tag_tree {
        sieve_sub(path: readonly string[]): $mol_tag_sieve;
        item_list(): $mol_view[];
        tag_list(): $mol_expander[];
        tag_expanded(id: readonly string[], next?: boolean): boolean;
        tag_expanded_default(id: readonly string[]): boolean;
        sort_tags(): (a: unknown, b: unknown) => number;
        sort_items(): (a: unknown, b: unknown) => number;
        tag_names(): Record<string, string>;
        tag_name(path: readonly string[]): string;
        item_title(id: readonly string[]): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_app_demo_menu extends $mol_page {
        names(): readonly string[];
        widget_tags(id: any): readonly string[];
        widget_aspects(id: any): readonly string[];
        widget_title(id: any): string;
        search_start(next?: any): any;
        Body(): $$.$mol_scroll;
        Option(id: any): $$.$mol_link;
        filter(next?: any): string;
        Filter(): $$.$mol_search;
        ids_tags(): Record<string, any>;
        levels_expanded_default(): number;
        levels_expanded(): number;
        Tree(): $$.$mol_tag_tree;
        List(): $$.$mol_list;
        option_arg(id: any): Record<string, any>;
        option_title(id: any): string;
        Option_title(id: any): $$.$mol_dimmer;
    }
}

declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}

declare namespace $.$$ {
    class $mol_app_demo_menu extends $.$mol_app_demo_menu {
        filter(next?: string): string;
        option_arg(id: readonly string[]): {
            demo: string | undefined;
        };
        option_title(path_id: readonly string[]): string;
        search_start(event?: Event): void;
        filter_last_word_completed(): boolean;
        filter_words(): string[];
        ids_tags(): Record<string, string[]>;
        tags_filtered(): string[];
        filter_suggests(): string[];
        levels_expanded(): number;
        names_filtered(): readonly string[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_information extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_information_outline extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_check_icon extends $mol_check {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_forum extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_forum_outline extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_open_in_new extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_embed_native extends $mol_scroll {
        uri(next?: any): string;
        dom_name(): string;
        window(): any;
        attr(): Record<string, any>;
        sub(): readonly any[];
        message(): Record<string, any>;
        mime(): string;
        title(): string;
        Fallback(): $$.$mol_link;
        uri_change(next?: any): any;
    }
}

declare namespace $ {
    function $mol_wait_timeout_async(this: $, timeout: number): Promise<void> & {
        done: (res: void | PromiseLike<void>) => void;
        fail: (error?: any) => void;
    } & {
        destructor: () => void;
    };
    function $mol_wait_timeout(this: $, timeout: number): void;
}

declare namespace $.$$ {
    class $mol_embed_native extends $.$mol_embed_native {
        window(): Window;
        load(frame: HTMLIFrameElement): Promise<Window>;
        uri_resource(): string;
        message_listener(): $mol_dom_listener;
        message_receive(event?: MessageEvent<[string, string]>): void;
        uri_change(event: MessageEvent<[string, string]>): void;
        auto(): (Window | $mol_dom_listener)[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_frame extends $mol_embed_native {
        dom_name(): string;
        attr(): Record<string, any>;
        fullscreen(): boolean;
        accelerometer(): boolean;
        autoplay(): boolean;
        encription(): boolean;
        gyroscope(): boolean;
        pip(): boolean;
        clipboard_read(): boolean;
        clipboard_write(): boolean;
        uri(next?: any): string;
        html(): any;
        allow(): string;
    }
}

declare namespace $.$$ {
    class $mol_frame extends $.$mol_frame {
        window(): any;
        allow(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_chat extends $mol_link {
        seed(): string;
        opened(): boolean;
        arg(): Record<string, any>;
        hint(): string;
        sub(): readonly any[];
        pages(): readonly any[];
        Icon(): $mol_icon_forum_outline;
        title(): string;
        standalone(): string;
        Standalone_icon(): $mol_icon_open_in_new;
        Esternal(): $$.$mol_link;
        Close_icon(): $mol_icon_cross;
        Close(): $$.$mol_link;
        embed(): string;
        Embed(): $$.$mol_frame;
        Page(): $mol_page;
    }
}

declare namespace $ {
    function $mol_lights(this: $, next?: boolean): boolean;
}

declare namespace $.$$ {
    class $mol_chat extends $.$mol_chat {
        opened(): boolean;
        pages(): $mol_page[];
        standalone(): string;
        embed(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_settings extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_app_demo_detail extends $mol_page {
        description(): string;
        tools(): readonly any[];
        body(): readonly any[];
        readme(next?: any): boolean;
        readme_icon(): $mol_icon_information_outline;
        Readme(): $mol_check_icon;
        chat_seed(): string;
        chat_pages(): $mol_page[];
        Chat(): $$.$mol_chat;
        edit_hint(): string;
        Edit_speck(): $mol_speck;
        Edit_icon(): $mol_icon_settings;
        edit_uri(): string;
        Edit(): $$.$mol_link;
        close_hint(): string;
        Close_icon(): $mol_icon_cross;
        close_arg(): Record<string, any>;
        Close(): $$.$mol_link;
        Demo(): $mol_view;
    }
}

declare namespace $ {
    class $mol_stack extends $mol_view {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_text_code_token extends $mol_dimmer {
        attr(): Record<string, any>;
        type(): string;
    }
    class $mol_text_code_token_link extends $mol_text_code_token {
        dom_name(): string;
        type(): string;
        attr(): Record<string, any>;
        uri(): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    class $mol_text_code_row extends $mol_paragraph {
        text(): string;
        minimal_height(): number;
        numb_showed(): boolean;
        syntax(): any;
        uri_resolve(id: any): string;
        Numb(): $mol_view;
        Token(id: any): $mol_text_code_token;
        Token_link(id: any): $mol_text_code_token_link;
        find_pos(id: any): any;
        numb(): number;
        token_type(id: any): string;
        token_text(id: any): string;
        highlight(): string;
        token_uri(id: any): string;
    }
}

declare namespace $ {
    class $mol_syntax2<Lexems extends {
        [name: string]: RegExp;
    }> {
        lexems: Lexems;
        constructor(lexems: Lexems);
        rules: {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        regexp: RegExp;
        tokenize(text: string, handle: (name: string, found: string, chunks: string[], offset: number) => void): void;
        parse(text: string, handlers: {
            [key in keyof Lexems | '']: (found: string, chunks: string[], offset: number) => void;
        }): void;
    }
}

declare namespace $ {
    var $mol_syntax2_md_flow: $mol_syntax2<{
        quote: RegExp;
        header: RegExp;
        list: RegExp;
        code: RegExp;
        'code-indent': RegExp;
        table: RegExp;
        grid: RegExp;
        cut: RegExp;
        block: RegExp;
    }>;
    var $mol_syntax2_md_line: $mol_syntax2<{
        strong: RegExp;
        emphasis: RegExp;
        code: RegExp;
        insert: RegExp;
        delete: RegExp;
        embed: RegExp;
        link: RegExp;
        'image-link': RegExp;
        'text-link': RegExp;
        'text-link-http': RegExp;
    }>;
    const $mol_syntax2_md_code: $mol_syntax2<{
        'code-indent': RegExp;
        'code-docs': RegExp;
        'code-comment-block': RegExp;
        'code-link': RegExp;
        'code-comment-inline': RegExp;
        'code-string': RegExp;
        'code-number': RegExp;
        'code-call': RegExp;
        'code-sexpr': RegExp;
        'code-field': RegExp;
        'code-keyword': RegExp;
        'code-global': RegExp;
        'code-word': RegExp;
        'code-decorator': RegExp;
        'code-tag': RegExp;
        'code-punctuation': RegExp;
    }>;
}

declare namespace $.$$ {
    class $mol_text_code_row extends $.$mol_text_code_row {
        maximal_width(): number;
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        tokens(path: number[]): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        sub(): $mol_view[];
        row_content(path: number[]): $mol_text_code_token[];
        Token(path: number[]): $mol_text_code_token;
        token_type(path: number[]): string;
        token_content(path: number[]): (string | $mol_text_code_token)[];
        token_text(path: number[]): string;
        token_uri(path: number[]): string;
        view_find(check: (path: $mol_view, text?: string) => boolean, path?: $mol_view[]): Generator<$mol_view[]>;
        find_pos(offset: number): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
        find_token_pos([offset, ...path]: number[]): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    type $mol_blob = Blob;
    let $mol_blob: {
        new (blobParts?: readonly BlobPart[], options?: BlobPropertyBag): Blob;
        prototype: Blob;
    };
}

declare namespace $ {
    class $mol_icon_clipboard extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_clipboard_outline extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_button_copy extends $mol_button_minor {
        blobs(): readonly Blob[];
        data(): Record<string, any>;
        sub(): readonly any[];
        text(): string;
        text_blob(next?: any): Blob;
        html(): string;
        html_blob(next?: any): Blob;
        Icon(): $mol_icon_clipboard_outline;
        title(): string;
    }
}

declare namespace $ {
    function $mol_html_encode(text: string): string;
}

declare namespace $.$$ {
    class $mol_button_copy extends $.$mol_button_copy {
        data(): {
            [k: string]: Blob;
        };
        html(): string;
        attachments(): ClipboardItem[];
        click(event?: Event): void;
    }
}

declare namespace $ {
    class $mol_text_code extends $mol_stack {
        attr(): Record<string, any>;
        text(): string;
        text_lines(): readonly string[];
        find_pos(id: any): any;
        uri_base(): string;
        sub(): readonly any[];
        sidebar_showed(): boolean;
        render_visible_only(): boolean;
        row_numb(id: any): number;
        row_text(id: any): string;
        syntax(): any;
        uri_resolve(id: any): string;
        highlight(): string;
        Row(id: any): $$.$mol_text_code_row;
        rows(): readonly any[];
        Rows(): $$.$mol_list;
        text_export(): string;
        Copy(): $$.$mol_button_copy;
    }
}

declare namespace $.$$ {
    class $mol_text_code extends $.$mol_text_code {
        render_visible_only(): boolean;
        text_lines(): readonly string[];
        rows(): $mol_text_code_row[];
        row_text(index: number): string;
        row_numb(index: number): number;
        find_pos(offset: number): {
            token: $mol_text_code_token;
            offset: number;
        } | null;
        sub(): ($mol_list | $mol_button_copy)[];
        syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        uri_base(): string;
        uri_resolve(uri: string): string;
        text_export(): string;
    }
}

declare namespace $.$$ {
}

declare namespace $ {
    class $mol_float extends $mol_view {
        style(): Record<string, any>;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_grid extends $mol_view {
        row_height(): number;
        row_ids(): readonly string[][];
        row_id(id: any): any;
        col_ids(): readonly any[];
        records(): Record<string, any>;
        record(id: any): any;
        hierarchy(): any;
        hierarchy_col(): string;
        minimal_width(): number;
        sub(): readonly any[];
        Head(): $mol_grid_row;
        Row(id: any): $mol_grid_row;
        Cell(id: any): $mol_view;
        cell(id: any): any;
        Cell_text(id: any): $mol_grid_cell;
        Cell_number(id: any): $mol_grid_number;
        Col_head(id: any): $mol_float;
        Cell_branch(id: any): $$.$mol_check_expand;
        Cell_content(id: any): readonly any[];
        rows(): readonly $mol_view[];
        Table(): $mol_grid_table;
        head_cells(): readonly $mol_view[];
        cells(id: any): readonly $mol_view[];
        cell_content(id: any): readonly $mol_view_content[];
        cell_content_text(id: any): readonly $mol_view_content[];
        cell_content_number(id: any): readonly $mol_view_content[];
        col_head_content(id: any): readonly $mol_view_content[];
        cell_level(id: any): number;
        cell_expanded(id: any, next?: any): boolean;
        needle(): string;
        cell_value(id: any): string;
        Cell_dimmer(id: any): $$.$mol_dimmer;
    }
    class $mol_grid_table extends $mol_list {
    }
    class $mol_grid_row extends $mol_view {
        sub(): readonly $mol_view[];
        cells(): readonly $mol_view[];
    }
    class $mol_grid_cell extends $mol_view {
        minimal_height(): number;
    }
    class $mol_grid_number extends $mol_grid_cell {
    }
}

declare namespace $.$$ {
    interface $mol_grid_node {
        id: string;
        parent: $mol_grid_node;
        sub: $mol_grid_node[];
    }
    class $mol_grid extends $.$mol_grid {
        head_cells(): readonly $mol_view[];
        col_head_content(colId: string): readonly string[];
        rows(): readonly $mol_view[];
        cells(row_id: string[]): readonly $mol_view[];
        col_type(col_id: string): "text" | "number" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any[];
        cell_content_text(id: {
            row: string[];
            col: string;
        }): any[];
        records(): any;
        record(id: string): any;
        record_ids(): string[];
        row_id(index: number): string;
        col_ids(): readonly string[];
        hierarchy(): {
            [id: string]: $mol_grid_node;
        };
        row_sub_ids(row: string[]): string[][];
        row_root_id(): string[];
        cell_level(id: {
            row: string[];
        }): number;
        row_ids(): readonly string[][];
        row_expanded(row_id: string[], next?: boolean): boolean | null;
        row_expanded_default(row_id: string[]): boolean;
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_image extends $mol_view {
        dom_name(): string;
        field(): Record<string, any>;
        attr(): Record<string, any>;
        event(): Record<string, any>;
        minimal_width(): number;
        minimal_height(): number;
        uri(): string;
        loading(): string;
        decoding(): string;
        cors(): any;
        natural_width(next?: any): number;
        natural_height(next?: any): number;
        load(next?: any): any;
    }
}

declare namespace $.$$ {
    class $mol_image extends $.$mol_image {
        natural_width(next?: null): number;
        natural_height(next?: null): number;
        load(): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_link_iconed extends $mol_link {
        sub(): readonly any[];
        content(): readonly any[];
        host(): string;
        icon(): string;
        Icon(): $$.$mol_image;
        title(): string;
    }
}

declare namespace $.$$ {
    class $mol_link_iconed extends $.$mol_link_iconed {
        icon(): string;
        host(): string;
        title(): string;
        sub(): readonly any[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_youtube extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_embed_youtube extends $mol_check {
        uri(): string;
        video_preview(): string;
        video_id(): string;
        checked(next?: any): boolean;
        sub(): readonly any[];
        active(next?: any): boolean;
        title(): string;
        Image(): $$.$mol_image;
        Hint(): $mol_icon_youtube;
        video_embed(): string;
        Frame(): $$.$mol_frame;
    }
}

declare namespace $.$$ {
    class $mol_embed_youtube extends $.$mol_embed_youtube {
        video_embed(): string;
        video_id(): string;
        video_preview(): string;
        sub(): $mol_frame[] | ($mol_image | $mol_icon_youtube)[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_embed_any extends $mol_view {
        Image(): $$.$mol_image;
        Object(): $$.$mol_embed_native;
        Youtube(): $$.$mol_embed_youtube;
        title(): string;
        uri(): string;
    }
}

declare namespace $.$$ {
    class $mol_embed_any extends $.$mol_embed_any {
        type(): "object" | "image" | "youtube";
        sub(): $mol_image[] | $mol_embed_youtube[] | $mol_embed_native[];
    }
}

declare namespace $ {
    class $mol_text extends $mol_list {
        uri_base(): string;
        text(): string;
        param(): string;
        flow_tokens(): readonly any[];
        auto(): readonly any[];
        Paragraph(id: any): $$.$mol_paragraph;
        Quote(id: any): $$.$mol_text;
        List(id: any): $mol_text_list;
        item_index(id: any): number;
        Header(id: any): $$.$mol_text_header;
        Pre(id: any): $$.$mol_text_code;
        Cut(id: any): $mol_view;
        Table(id: any): $$.$mol_grid;
        Table_row(id: any): $mol_grid_row;
        Table_cell(id: any): $$.$mol_text;
        Grid(id: any): $$.$mol_grid;
        Grid_row(id: any): $mol_grid_row;
        Grid_cell(id: any): $$.$mol_text;
        String(id: any): $$.$mol_dimmer;
        Span(id: any): $mol_text_span;
        Code_line(id: any): $$.$mol_text_code_row;
        Link(id: any): $$.$mol_link_iconed;
        Link_http(id: any): $$.$mol_link_iconed;
        Embed(id: any): $$.$mol_embed_any;
        auto_scroll(): any;
        block_content(id: any): readonly any[];
        uri_resolve(id: any): string;
        quote_text(id: any): string;
        highlight(): string;
        list_type(id: any): string;
        list_text(id: any): string;
        header_level(id: any): number;
        header_arg(id: any): Record<string, any>;
        pre_text(id: any): string;
        code_sidebar_showed(): boolean;
        pre_sidebar_showed(): boolean;
        table_head_cells(id: any): readonly any[];
        table_rows(id: any): readonly any[];
        table_cells(id: any): readonly any[];
        table_cell_text(id: any): string;
        grid_rows(id: any): readonly any[];
        grid_cells(id: any): readonly any[];
        grid_cell_text(id: any): string;
        line_text(id: any): string;
        line_type(id: any): string;
        line_content(id: any): readonly any[];
        code_syntax(): any;
        link_uri(id: any): string;
        link_host(id: any): string;
    }
    class $mol_text_header extends $mol_paragraph {
        level(): number;
        sub(): readonly any[];
        arg(): Record<string, any>;
        content(): readonly any[];
        Link(): $$.$mol_link;
    }
    class $mol_text_span extends $mol_paragraph {
        dom_name(): string;
        attr(): Record<string, any>;
        type(): string;
    }
}

declare namespace $.$$ {
    class $mol_text extends $.$mol_text {
        flow_tokens(): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        block_type(index: number): string;
        rows(): ($mol_view | $mol_paragraph | $mol_text_code | $mol_grid | $mol_text_header)[];
        param(): string;
        header_level(index: number): number;
        header_arg(index: number): {
            [x: string]: string;
        };
        list_type(index: number): string;
        item_index(index: number): number;
        pre_text(index: number): string;
        quote_text(index: number): string;
        list_text(index: number): string;
        cell_content(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $mol_text[];
        table_cells(id: {
            block: number;
            row: number;
        }): $mol_text[];
        table_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        grid_content(indexBlock: number): string[][];
        grid_rows(blockId: number): $mol_grid_row[];
        grid_cells(id: {
            block: number;
            row: number;
        }): $mol_text[];
        grid_cell_text(id: {
            block: number;
            row: number;
            cell: number;
        }): string;
        uri_base(): string;
        uri_resolve(uri: string): string;
        code_syntax(): $mol_syntax2<{
            'code-indent': RegExp;
            'code-docs': RegExp;
            'code-comment-block': RegExp;
            'code-link': RegExp;
            'code-comment-inline': RegExp;
            'code-string': RegExp;
            'code-number': RegExp;
            'code-call': RegExp;
            'code-sexpr': RegExp;
            'code-field': RegExp;
            'code-keyword': RegExp;
            'code-global': RegExp;
            'code-word': RegExp;
            'code-decorator': RegExp;
            'code-tag': RegExp;
            'code-punctuation': RegExp;
        }>;
        block_text(index: number): string;
        block_content(index: number): ($mol_dimmer | $mol_text_code_row | $mol_link_iconed | $mol_embed_any | $mol_text_span)[];
        line_tokens(path: readonly number[]): readonly {
            name: string;
            found: string;
            chunks: string[];
        }[];
        line_token(path: readonly number[]): {
            name: string;
            found: string;
            chunks: string[];
        };
        line_type(path: readonly number[]): string;
        line_text(path: readonly number[]): string;
        line_content(path: readonly number[]): ($mol_dimmer | $mol_text_code_row | $mol_link_iconed | $mol_embed_any | $mol_text_span)[];
        link_uri(path: readonly number[]): string;
        link_host(path: readonly number[]): string;
        auto_scroll(): void;
    }
    class $mol_text_header extends $.$mol_text_header {
        dom_name(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_github_circle extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_link_source extends $mol_link {
        hint(): string;
        sub(): readonly any[];
        Icon(): $mol_icon_github_circle;
    }
}

declare namespace $ {
    class $mol_text_list extends $mol_text {
        auto_scroll(): any;
        attr(): Record<string, any>;
        Paragraph(id: any): $mol_text_list_item;
        type(): string;
    }
    class $mol_text_list_item extends $mol_paragraph {
        attr(): Record<string, any>;
        index(): number;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_app_demo_readme extends $mol_page {
        readme_link_template(): string;
        source_link_template(): string;
        repo(): string;
        module(): readonly string[];
        title(): string;
        opened(next?: any): boolean;
        tools(): readonly any[];
        Readme(): $$.$mol_text;
        Not_found(): $mol_view;
        source_link(): string;
        source_hint(): string;
        Source_link(): $mol_link_source;
        Close_icon(): $mol_icon_cross;
        close(next?: any): any;
        Close(): $mol_button_minor;
        readme(): string;
        uri_base(next?: any): string;
        Not_found_caption(): string;
    }
}

declare namespace $.$$ {
    class $mol_app_demo_readme_not_found_error extends Error {
        module: readonly string[];
        constructor(module: readonly string[]);
    }
    class $mol_app_demo_readme extends $.$mol_app_demo_readme {
        close(): void;
        link(template: string, repo: string, module: readonly string[]): string;
        uri_base(next?: string): string;
        source_link(): string;
        readme(): string;
        body(): $mol_view[];
    }
}

declare namespace $ {
    class $mol_status extends $mol_view {
        status(): string;
        minimal_height(): number;
        minimal_width(): number;
        sub(): readonly any[];
        message(): string;
    }
}

declare namespace $.$$ {
    class $mol_status extends $.$mol_status {
        message(): any;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_theme_auto extends $mol_plugin {
        attr(): Record<string, any>;
        theme(): string;
    }
}

declare namespace $.$$ {
    class $mol_theme_auto extends $.$mol_theme_auto {
        theme(): "$mol_theme_light" | "$mol_theme_dark";
    }
}

declare namespace $ {
    class $mol_icon_brightness_6 extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_lights_toggle extends $mol_check_icon {
        Icon(): $mol_icon_brightness_6;
        hint(): string;
        checked(next?: any): boolean;
        Lights_icon(): $mol_icon_brightness_6;
        lights(next?: any): boolean;
    }
}

declare namespace $.$$ {
    class $mol_lights_toggle extends $.$mol_lights_toggle {
        lights(next?: boolean): boolean;
    }
}

declare namespace $ {
    class $mol_app_demo extends $mol_book2 {
        editor_title(): string;
        meta_bundle_base(): string;
        repo_dict(): Record<string, any>;
        plugins(): readonly any[];
        demo_block_list(): readonly any[];
        search_start(next?: any): void;
        Menu(): $$.$mol_app_demo_menu;
        chat_pages(id: any): $mol_page[];
        Detail(id: any): $mol_app_demo_detail;
        Readme_page(): $$.$mol_app_demo_readme;
        Detail_empty_message(): $$.$mol_status;
        detail_title(): string;
        Theme(): $$.$mol_theme_auto;
        Search_start(): $$.$mol_hotkey;
        menu_title(): string;
        names(): readonly string[];
        widget_tags(id: any): readonly string[];
        widget_aspects(id: any): readonly string[];
        widget_title(id: any): string;
        sources_uri(): string;
        Sources(): $mol_link_source;
        Lights(): $$.$mol_lights_toggle;
        tools(): readonly any[];
        chat_seed(id: any): string;
        detail_description(): string;
        edit_uri(): string;
        readme_page(next?: any): boolean;
        Demo(): $mol_view;
        repo(): string;
        module(): readonly string[];
        detail_empty_prefix(): string;
        selected(): string;
        detail_empty_postfix(): string;
    }
}

declare namespace $ {
    function $mol_func_is_class(func: Function): boolean;
}

declare namespace $ {
    class $mol_span extends $mol_object2 {
        readonly uri: string;
        readonly source: string;
        readonly row: number;
        readonly col: number;
        readonly length: number;
        constructor(uri: string, source: string, row: number, col: number, length: number);
        static unknown: $mol_span;
        static begin(uri: string, source?: string): $mol_span;
        static end(uri: string, source: string): $mol_span;
        static entire(uri: string, source: string): $mol_span;
        toString(): string;
        toJSON(): {
            uri: string;
            row: number;
            col: number;
            length: number;
        };
        error(message: string, Class?: ErrorConstructor): Error;
        span(row: number, col: number, length: number): $mol_span;
        after(length?: number): $mol_span;
        slice(begin: number, end?: number): $mol_span;
    }
}

declare namespace $ {
    class $mol_error_syntax extends SyntaxError {
        reason: string;
        line: string;
        span: $mol_span;
        constructor(reason: string, line: string, span: $mol_span);
    }
}

declare namespace $ {
    function $mol_tree2_from_string(this: $, str: string, uri?: string): $mol_tree2;
}

declare namespace $ {
    class $mol_app_demo_main extends $mol_page {
        minimal_width(): number;
        title(): string;
        tools(): readonly any[];
        body(): readonly any[];
        Lights(): $$.$mol_lights_toggle;
        project_uri(): string;
        Project(): $mol_link_source;
        description(): string;
        Description(): $$.$mol_text;
    }
}

declare namespace $.$$ {
    class $mol_app_demo_main extends $.$mol_app_demo_main {
        description(): string;
    }
}

declare namespace $ {
    function $mol_tree2_to_string(this: $, tree: $mol_tree2): string;
}

declare namespace $ {
    type $mol_tree2_path = Array<string | number | null>;
    type $mol_tree2_hack<Context> = (input: $mol_tree2, belt: $mol_tree2_belt<Context>, context: Context) => readonly $mol_tree2[];
    type $mol_tree2_belt<Context> = Record<string, $mol_tree2_hack<Context>>;
    class $mol_tree2 extends Object {
        readonly type: string;
        readonly value: string;
        readonly kids: readonly $mol_tree2[];
        readonly span: $mol_span;
        constructor(type: string, value: string, kids: readonly $mol_tree2[], span: $mol_span);
        static list(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        list(kids: readonly $mol_tree2[]): $mol_tree2;
        static data(value: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        data(value: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        static struct(type: string, kids?: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        struct(type: string, kids?: readonly $mol_tree2[]): $mol_tree2;
        clone(kids: readonly $mol_tree2[], span?: $mol_span): $mol_tree2;
        text(): string;
        static fromString(str: string, uri?: string): $mol_tree2;
        toString(): string;
        insert(value: $mol_tree2 | null, ...path: $mol_tree2_path): $mol_tree2;
        select(...path: $mol_tree2_path): $mol_tree2;
        filter(path: string[], value?: string): $mol_tree2;
        hack<Context extends {
            span?: $mol_span;
            [key: string]: unknown;
        } = {}>(belt: $mol_tree2_belt<Context>, context?: Context): $mol_tree2[];
        error(message: string, Class?: ErrorConstructor): Error;
    }
    class $mol_tree2_empty extends $mol_tree2 {
        constructor();
    }
}

declare namespace $.$$ {
    class $mol_app_demo extends $.$mol_app_demo {
        component_name(name: string): string;
        detail_title(): string;
        detail_description(): string;
        names(): string[];
        widget_tags(name: string): string[];
        widget_title(name: string): string;
        widget_aspects(name: string): readonly string[];
        selected(): string;
        readme_page(next?: boolean): boolean;
        selected_class_name(): string;
        Widget(name: string): $mol_example;
        names_demo(): string[];
        pages(): $mol_view[];
        Demo(): $mol_example;
        logo_uri(): string;
        meta_bundle_base(): string;
        repo_dict(): Record<string, string>;
        name_parse(name: string): {
            repo: string;
            module: string[];
        };
        repo(): string;
        module(): string[];
        chat_link(): string;
        edit_uri(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_app_demo extends $mol_app_demo {
        Menu(): any;
        menu_items(): readonly any[];
        milkywaystd_app_demo_menu_factory(): any;
        p1(): Record<string, any>;
        p2(): Record<string, any>;
        p3(): Record<string, any>;
    }
    class $milkywaystd_app_demo_menu_tree extends $mol_app_demo_menu {
        title(): string;
        Body(): $$.$mol_scroll;
        filter(val?: any): string;
        Filter(): $$.$mol_search;
        List(): $$.$mol_list;
        tree_menu_items(): readonly any[];
        menu(): $$.$milkywaystd_ui_treemenu;
    }
}

declare namespace $ {
    class $milkywaystd_crud_demo_products extends $mol_book2 {
        tablepage(): $$.$milkywaystd_crud_demo_products_tablepage;
        editpage(): any;
        pages(): readonly any[];
        param(): string;
        menu_title(): string;
        editCallback(val?: any): any;
        form_factory(): any;
        pages_visible(): readonly any[];
    }
}

declare namespace $ {
    class $mol_labeler extends $mol_list {
        rows(): readonly any[];
        label(): readonly $mol_view_content[];
        Label(): $mol_view;
        content(): readonly any[];
        Content(): $mol_view;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_form_field extends $mol_labeler {
        bids(): readonly string[];
        label(): readonly any[];
        content(): readonly any[];
        name(): string;
        bid(): string;
        Bid(): $mol_view;
        control(): any;
    }
}

declare namespace $.$$ {
    class $mol_form_field extends $.$mol_form_field {
        bid(): string;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_minus extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_plus extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_number extends $mol_view {
        precision_view(): number;
        precision_change(): number;
        value_min(): number;
        value_max(): number;
        value(next?: any): number;
        enabled(): boolean;
        sub(): readonly any[];
        precision(): number;
        type(): string;
        value_string(next?: any): string;
        hint(): string;
        string_enabled(): boolean;
        submit(next?: any): any;
        String(): $$.$mol_string;
        event_dec(next?: any): any;
        dec_enabled(): boolean;
        dec_icon(): $mol_icon_minus;
        Dec(): $mol_button_minor;
        event_inc(next?: any): any;
        inc_enabled(): boolean;
        inc_icon(): $mol_icon_plus;
        Inc(): $mol_button_minor;
    }
}

declare namespace $ {
}

declare namespace $.$$ {
    class $mol_number extends $.$mol_number {
        value_limited(next?: any): number;
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): string;
        dec_enabled(): boolean;
        inc_enabled(): boolean;
    }
}

declare namespace $ {
    class $mol_button_major extends $mol_button_typed {
        attr(): Record<string, any>;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_form extends $mol_list {
        submit_allowed(): boolean;
        submit_blocked(): boolean;
        event(): Record<string, any>;
        submit(event?: any): any;
        rows(): readonly any[];
        keydown(event?: any): any;
        form_fields(): readonly $mol_form_field[];
        body(): readonly $mol_form_field[];
        Body(): $$.$mol_list;
        buttons(): readonly $mol_view[];
        foot(): readonly $mol_view[];
        Foot(): $mol_row;
    }
}

declare namespace $.$$ {
    class $mol_form extends $.$mol_form {
        form_fields(): readonly $mol_form_field[];
        submit_allowed(): boolean;
        submit_blocked(): boolean;
        keydown(next: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_crud_demo_products_editform extends $mol_page {
        title(): string;
        tools(): readonly any[];
        body(): readonly any[];
        foot(): readonly any[];
        message(): Record<string, any>;
        formtitle(): string;
        closepage(val?: any): any;
        Button_tools(): $mol_button_minor;
        uiblocker(): any;
        name_label(): string;
        name_bid(): string;
        draft(id: any, val?: any): string;
        Name_control(): $$.$mol_string;
        Name_field(): $$.$mol_form_field;
        price_label(): string;
        price_bid(): string;
        draftNum(id: any, val?: any): number;
        Price_control(): $$.$mol_number;
        Price_field(): $$.$mol_form_field;
        login_submit_label(): string;
        event_submit(next?: any): any;
        Save_submit(): $mol_button_major;
        submit_allowed(): boolean;
        EditForm(): $$.$mol_form;
        status(val?: any): any;
        Result(): $$.$mol_status;
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products_editform extends $.$milkywaystd_crud_demo_products_editform {
        srv(): $milkywaystd_crud_demo_products_service;
        uiblocker(): any;
        changed(random?: any): any;
        model(): Product;
        editKey(val?: string): string;
        modelid(): string | null;
        isEdit(): boolean;
        draftObj(id: any, val?: any): any;
        server_error(id?: any, val?: any): any;
        validation_error(field: string): any;
        closepage(val?: any): void;
        price_bid(): string;
        name_bid(): string;
        draft(key: any, val?: any): any;
        draftNum(key: any, val?: any): any;
        formData(): {
            title: any;
            price: any;
        };
        event_submit(val?: any): void;
        clearStatusTimeout(id: any, val?: $mol_after_timeout): $mol_after_timeout | undefined;
        status(val?: any): any;
        formtitle(): "Редактирование товара" | "Создание товара";
    }
}

declare namespace $ {
    class $mol_icon_edit extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_trash_can extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $milkywaystd_crud_demo_products_productrow extends $mol_row {
        minimal_height(): number;
        minimal_width(): number;
        data(): any;
        editCallback(val?: any): any;
        deleteCallback(val?: any): any;
        ondelete(val?: any): any;
        sub(): readonly any[];
        row_id(): string;
        View(): $$.$mol_text;
        Id_labeler(): $mol_labeler;
        row_name(): string;
        View2(): $$.$mol_text;
        Title_labeler(): $mol_labeler;
        row_price(): string;
        View3(): $$.$mol_text;
        Price_labeler(): $mol_labeler;
        editArg(): any;
        edIcon(): $mol_icon_edit;
        edLabel(): string;
        EditlButton(): $$.$mol_link;
        delIcon(): $mol_icon_trash_can;
        delLabel(): string;
        uiblocker(): any;
        DelButton(): $mol_button_minor;
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products_productrow extends $.$milkywaystd_crud_demo_products_productrow {
        row_price(): string;
        row_name(): string;
        row_id(): string;
        uiblocker(): string;
        editArg(): {
            examples_products_edititem: any;
            examples_products_viewpage: string;
        };
        ondelete(val?: any): void;
        editId: any;
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products extends $.$milkywaystd_crud_demo_products {
        constructor();
        pages_visible(): readonly any[];
        editCallback(id: string): void;
        form_factory(): any;
    }
}

declare namespace $ {
}

declare namespace $.$$ {
    class Product {
        id: string | number | null;
        title: string | null;
        price: number | null;
    }
    class $milkywaystd_crud_demo_products_service extends $milkywaystd_crud<Product> {
        private static _intances;
        static getInstance<T1 extends typeof $milkywaystd_crud<Product>>(this: T1, id?: string): InstanceType<T1>;
    }
}

declare namespace $ {
    class $milkywaystd_crud_demo_products2 extends $milkywaystd_crud_demo_products {
    }
}

declare namespace $ {
    class $milkywaystd_crud_demo_products2_editform extends $mol_page {
        tools(): readonly any[];
        body(): readonly any[];
        foot(): readonly any[];
        message(): Record<string, any>;
        closepage(val?: any): any;
        Button_tools(): $mol_button_minor;
        uiblocker(): any;
        name_label(): string;
        name_bid(): string;
        draft(id: any, val?: any): string;
        Name_control(): $$.$mol_string;
        Name_field(): $$.$mol_form_field;
        price_label(): string;
        price_bid(): string;
        draftNum(id: any, val?: any): number;
        Price_control(): $$.$mol_number;
        Price_field(): $$.$mol_form_field;
        login_submit_label(): string;
        event_submit(next?: any): any;
        Save_submit(): $mol_button_major;
        submit_allowed(): boolean;
        EditForm(): $$.$mol_form;
        status(val?: any): any;
        Result(): $$.$mol_status;
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products2_editform extends $.$milkywaystd_crud_demo_products2_editform {
        srv(): $milkywaystd_crud_demo_products_service;
        uiblocker(): string;
        model(): Product;
        editKey(val?: string): string;
        draftObj(id: any, val?: any): any;
        server_error(id?: any, val?: any): any;
        validation_error(field: string): any;
        closepage(val?: any): void;
        price_bid(): string;
        name_bid(): string;
        draft(key: any, val?: any): any;
        draftNum(key: any, val?: any): any;
        formData(): {
            title: any;
            price: any;
        };
        event_submit(val?: any): void;
        clearStatusTimeout(id: any, val?: $mol_after_timeout): $mol_after_timeout | undefined;
        status(val?: any): any;
        isEdit(): boolean;
        formtitle(): "Редактирование товара" | "Создание товара";
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products2 extends $.$milkywaystd_crud_demo_products2 {
        form_factory(): any;
    }
}

declare namespace $ {
    class $mol_bar extends $mol_view {
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_chevron_left extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_icon_chevron_right extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_paginator extends $mol_bar {
        sub(): readonly any[];
        backward_hint(): string;
        backward(event?: any): any;
        Backward_icon(): $mol_icon_chevron_left;
        Backward(): $mol_button_minor;
        value(next?: any): number;
        Value(): $mol_view;
        forward_hint(): string;
        forward(event?: any): any;
        Forward_icon(): $mol_icon_chevron_right;
        Forward(): $mol_button_minor;
    }
}

declare namespace $.$$ {
    class $mol_paginator extends $.$mol_paginator {
        backward(event: Event): void;
        forward(event: Event): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_pick extends $mol_pop {
        event(): Record<string, any>;
        Anchor(): $$.$mol_check;
        keydown(event?: any): any;
        trigger_enabled(): boolean;
        trigger_content(): readonly $mol_view_content[];
        hint(): string;
        Trigger(): $$.$mol_check;
    }
}

declare namespace $.$$ {
    class $mol_pick extends $.$mol_pick {
        keydown(event: KeyboardEvent): void;
    }
}

declare namespace $ {
}

declare namespace $ {
    class $mol_icon_dots_vertical extends $mol_icon {
        path(): string;
    }
}

declare namespace $ {
    class $mol_select extends $mol_pick {
        dictionary(next?: any): Record<string, any>;
        options(): readonly string[];
        value(next?: any): string;
        option_label_default(): string;
        Option_row(id: any): $mol_button_minor;
        No_options(): $mol_view;
        plugins(): readonly any[];
        hint(): string;
        bubble_content(): readonly any[];
        Filter(): $$.$mol_string;
        Trigger_icon(): $mol_icon_dots_vertical;
        event_select(id: any, event?: any): any;
        option_label(id: any): string;
        filter_pattern(next?: any): string;
        Option_label(id: any): $$.$mol_dimmer;
        option_content(id: any): readonly any[];
        no_options_message(): string;
        nav_components(): readonly $mol_view[];
        option_focused(component?: any): any;
        nav_cycle(next?: any): boolean;
        Nav(): $$.$mol_nav;
        menu_content(): readonly $mol_view[];
        Menu(): $$.$mol_list;
        Bubble_pane(): $$.$mol_scroll;
        submit(event?: any): any;
        enabled(): boolean;
    }
}

declare namespace $.$$ {
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        open(): void;
        options(): readonly string[];
        options_filtered(): readonly string[];
        option_label(id: string): any;
        option_rows(): $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $mol_string | $mol_button_minor | null;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($mol_string | $mol_button_minor)[];
        trigger_content(): readonly $mol_view_content[];
        menu_content(): ($mol_view | $mol_button_minor)[];
    }
}

declare namespace $ {
}

declare namespace $ {
    class $milkywaystd_crud_demo_products_tablepage extends $mol_page {
        title(): string;
        body(): readonly any[];
        foot(): readonly any[];
        item(id: any): any;
        editCallback(val?: any): any;
        deleteCallback(val?: any): any;
        Row(id: any): $$.$milkywaystd_crud_demo_products_productrow;
        rows(): readonly any[];
        Rows(): $$.$mol_list;
        page(val?: any): number;
        paginator(): $$.$mol_paginator;
        page_labeler(): $mol_labeler;
        per_page(val?: any): string;
        perPageSelector(): $$.$mol_select;
        PRP_labeler(): $mol_labeler;
        totalItems(): string;
        View2(): $$.$mol_text;
        Total_labeler(): $mol_labeler;
        refresh(next?: any): any;
        View3(): $mol_button_minor;
        refresh_labeler(): $mol_labeler;
        goToCreateNew(next?: any): any;
        View4(): $mol_button_major;
        create_labeler(): $mol_labeler;
        uiblocker(): string;
        frow(): $mol_row;
    }
}

declare namespace $.$$ {
    class $milkywaystd_crud_demo_products_tablepage extends $.$milkywaystd_crud_demo_products_tablepage {
        service(): $milkywaystd_crud_demo_products_service;
        rows(): $milkywaystd_crud_demo_products_productrow[];
        item(id: any): Product;
        per_page(value?: number): any;
        page(value?: number): number;
        attr(): {};
        totalItems(): string;
        refresh(): void;
        goToCreateNew(): void;
        deleteCallback(id: string): void;
        uiblocker(): string;
    }
}

declare namespace $.$$ {
    class $milkywaystd_app_demo extends $.$milkywaystd_app_demo {
        milkywaystd_app_demo_menu_factory(): any;
        tree_menu_items(): Partial<$milkywaystd_ui_treemenu_data_item>[];
    }
}

export = $;