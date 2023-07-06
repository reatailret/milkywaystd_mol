namespace $.$$ {
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */








export class $milkywaystd_classes_DefaultIterableDifferFactory implements IterableDifferFactory {
  constructor() {}
  supports(obj: Object|null|undefined): boolean {
    return isListLikeIterable(obj);
  }

  create<V>(trackByFn?: TrackByFunction<V>): DefaultIterableDiffer<V> {
    return new DefaultIterableDiffer<V>(trackByFn);
  }
}

const trackByIdentity = (index: number, item: any) => item;


export class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V> {
  public readonly length: number = 0;
  // TODO(issue/24571): remove '!'.
  public readonly collection!: V[]|Iterable<V>|null;
  // Keeps track of the used records at any point in time (during & across `_check()` calls)
  private _linkedRecords: _DuplicateMap<V>|null = null;
  // Keeps track of the removed records at any point in time during `_check()` calls.
  private _unlinkedRecords: _DuplicateMap<V>|null = null;
  private _previousItHead: IterableChangeRecord_<V>|null = null;
  private _itHead: IterableChangeRecord_<V>|null = null;
  private _itTail: IterableChangeRecord_<V>|null = null;
  private _additionsHead: IterableChangeRecord_<V>|null = null;
  private _additionsTail: IterableChangeRecord_<V>|null = null;
  private _movesHead: IterableChangeRecord_<V>|null = null;
  private _movesTail: IterableChangeRecord_<V>|null = null;
  private _removalsHead: IterableChangeRecord_<V>|null = null;
  private _removalsTail: IterableChangeRecord_<V>|null = null;
  // Keeps track of records where custom track by is the same, but item identity has changed
  private _identityChangesHead: IterableChangeRecord_<V>|null = null;
  private _identityChangesTail: IterableChangeRecord_<V>|null = null;
  private _trackByFn: TrackByFunction<V>;

  constructor(trackByFn?: TrackByFunction<V>) {
    this._trackByFn = trackByFn || trackByIdentity;
  }

  forEachItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._itHead; record !== null; record = record._next) {
      fn(record);
    }
  }

  forEachOperation(
      fn: (item: IterableChangeRecord<V>, previousIndex: number|null, currentIndex: number|null) =>
          void) {
    let nextIt = this._itHead;
    let nextRemove = this._removalsHead;
    let addRemoveOffset = 0;
    let moveOffsets: number[]|null = null;
    while (nextIt || nextRemove) {
      // Figure out which is the next record to process
      // Order: remove, add, move
      const record: IterableChangeRecord<V> = !nextRemove ||
              nextIt &&
                  nextIt.currentIndex! <
                      getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
          nextIt! :
          nextRemove;
      const adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
      const currentIndex = record.currentIndex;

      // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
      if (record === nextRemove) {
        addRemoveOffset--;
        nextRemove = nextRemove._nextRemoved;
      } else {
        nextIt = nextIt!._next;
        if (record.previousIndex == null) {
          addRemoveOffset++;
        } else {
          // INVARIANT:  currentIndex < previousIndex
          if (!moveOffsets) moveOffsets = [];
          const localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
          const localCurrentIndex = currentIndex! - addRemoveOffset;
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

  forEachPreviousItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
      fn(record);
    }
  }

  forEachAddedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._additionsHead; record !== null; record = record._nextAdded) {
      fn(record);
    }
  }

  forEachMovedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._movesHead; record !== null; record = record._nextMoved) {
      fn(record);
    }
  }

  forEachRemovedItem(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
      fn(record);
    }
  }

  forEachIdentityChange(fn: (record: IterableChangeRecord_<V>) => void) {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
      fn(record);
    }
  }

  diff(collection: NgIterable<V>|null|undefined): DefaultIterableDiffer<V>|null {
    if (collection == null) collection = [];
    if (!isListLikeIterable(collection)) {
      throw new Error(
              `Error trying to diff '${
                  stringify(collection)}'. Only arrays and iterables are allowed`);
    }

    if (this.check(collection)) {
      return this;
    } else {
      return null;
    }
  }

  onDestroy() {}

  check(collection: NgIterable<V>): boolean {
    this._reset();

    let record: IterableChangeRecord_<V>|null = this._itHead;
    let mayBeDirty: boolean = false;
    let index: number;
    let item: V;
    let itemTrackBy: any;
    if (Array.isArray(collection)) {
      (this as {length: number}).length = collection.length;

      for (let index = 0; index < this.length; index++) {
        item = collection[index];
        itemTrackBy = this._trackByFn(index, item);
        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
          record = this._mismatch(record, item, itemTrackBy, index);
          mayBeDirty = true;
        } else {
          if (mayBeDirty) {
            // TODO(misko): can we limit this to duplicates only?
            record = this._verifyReinsertion(record, item, itemTrackBy, index);
          }
          if (!Object.is(record.item, item)) this._addIdentityChange(record, item);
        }

        record = record._next;
      }
    } else {
      index = 0;
      iterateListLike(collection, (item: V) => {
        itemTrackBy = this._trackByFn(index, item);
        if (record === null || !Object.is(record.trackById, itemTrackBy)) {
          record = this._mismatch(record, item, itemTrackBy, index);
          mayBeDirty = true;
        } else {
          if (mayBeDirty) {
            // TODO(misko): can we limit this to duplicates only?
            record = this._verifyReinsertion(record, item, itemTrackBy, index);
          }
          if (!Object.is(record.item, item)) this._addIdentityChange(record, item);
        }
        record = record._next;
        index++;
      });
      (this as {length: number}).length = index;
    }

    this._truncate(record);
    (this as {collection: V[] | Iterable<V>}).collection = collection;
    return this.isDirty;
  }

  /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
   * changes.
   */
  get isDirty(): boolean {
    return this._additionsHead !== null || this._movesHead !== null ||
        this._removalsHead !== null || this._identityChangesHead !== null;
  }

  /**
   * Reset the state of the change objects to show no changes. This means set previousKey to
   * currentKey, and clear all of the queues (additions, moves, removals).
   * Set the previousIndexes of moved and added items to their currentIndexes
   * Reset the list of additions, moves and removals
   *
   * @internal
   */
  _reset() {
    if (this.isDirty) {
      let record: IterableChangeRecord_<V>|null;

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

      // TODO(vicb): when assert gets supported
      // assert(!this.isDirty);
    }
  }

  /**
   * This is the core function which handles differences between collections.
   *
   * - `record` is the record which we saw at this position last time. If null then it is a new
   *   item.
   * - `item` is the current item in the collection
   * - `index` is the position of the item in the collection
   *
   * @internal
   */
  _mismatch(record: IterableChangeRecord_<V>|null, item: V, itemTrackBy: any, index: number):
      IterableChangeRecord_<V> {
    // The previous record after which we will append the current one.
    let previousRecord: IterableChangeRecord_<V>|null;

    if (record === null) {
      previousRecord = this._itTail;
    } else {
      previousRecord = record._prev;
      // Remove the record from the collection since we know it does not match the item.
      this._remove(record);
    }

    // See if we have evicted the item, which used to be at some anterior position of _itHead list.
    record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
    if (record !== null) {
      // It is an item which we have evicted earlier: reinsert it back into the list.
      // But first we need to check if identity changed, so we can update in view if necessary.
      if (!Object.is(record.item, item)) this._addIdentityChange(record, item);

      this._reinsertAfter(record, previousRecord, index);
    } else {
      // Attempt to see if the item is at some posterior position of _itHead list.
      record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
      if (record !== null) {
        // We have the item in _itHead at/after `index` position. We need to move it forward in the
        // collection.
        // But first we need to check if identity changed, so we can update in view if necessary.
        if (!Object.is(record.item, item)) this._addIdentityChange(record, item);

        this._moveAfter(record, previousRecord, index);
      } else {
        // It is a new item: add it.
        record =
            this._addAfter(new IterableChangeRecord_<V>(item, itemTrackBy), previousRecord, index);
      }
    }
    return record;
  }

  /**
   * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
   *
   * Use case: `[a, a]` => `[b, a, a]`
   *
   * If we did not have this check then the insertion of `b` would:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) leave `a` at index `1` as is. <-- this is wrong!
   *   3) reinsert `a` at index 2. <-- this is wrong!
   *
   * The correct behavior is:
   *   1) evict first `a`
   *   2) insert `b` at `0` index.
   *   3) reinsert `a` at index 1.
   *   3) move `a` at from `1` to `2`.
   *
   *
   * Double check that we have not evicted a duplicate item. We need to check if the item type may
   * have already been removed:
   * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
   * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
   * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
   * at the end.
   *
   * @internal
   */
  _verifyReinsertion(record: IterableChangeRecord_<V>, item: V, itemTrackBy: any, index: number):
      IterableChangeRecord_<V> {
    let reinsertRecord: IterableChangeRecord_<V>|null =
        this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy, null);
    if (reinsertRecord !== null) {
      record = this._reinsertAfter(reinsertRecord, record._prev!, index);
    } else if (record.currentIndex != index) {
      record.currentIndex = index;
      this._addToMoves(record, index);
    }
    return record;
  }

  /**
   * Get rid of any excess {@link IterableChangeRecord_}s from the previous collection
   *
   * - `record` The first excess {@link IterableChangeRecord_}.
   *
   * @internal
   */
  _truncate(record: IterableChangeRecord_<V>|null) {
    // Anything after that needs to be removed;
    while (record !== null) {
      const nextRecord: IterableChangeRecord_<V>|null = record._next;
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

  /** @internal */
  _reinsertAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    if (this._unlinkedRecords !== null) {
      this._unlinkedRecords.remove(record);
    }
    const prev = record._prevRemoved;
    const next = record._nextRemoved;

    if (prev === null) {
      this._removalsHead = next;
    } else {
      prev._nextRemoved = next;
    }
    if (next === null) {
      this._removalsTail = prev;
    } else {
      next._prevRemoved = prev;
    }

    this._insertAfter(record, prevRecord, index);
    this._addToMoves(record, index);
    return record;
  }

  /** @internal */
  _moveAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    this._unlink(record);
    this._insertAfter(record, prevRecord, index);
    this._addToMoves(record, index);
    return record;
  }

  /** @internal */
  _addAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    this._insertAfter(record, prevRecord, index);

    if (this._additionsTail === null) {
      // TODO(vicb):
      // assert(this._additionsHead === null);
      this._additionsTail = this._additionsHead = record;
    } else {
      // TODO(vicb):
      // assert(_additionsTail._nextAdded === null);
      // assert(record._nextAdded === null);
      this._additionsTail = this._additionsTail._nextAdded = record;
    }
    return record;
  }

  /** @internal */
  _insertAfter(
      record: IterableChangeRecord_<V>, prevRecord: IterableChangeRecord_<V>|null,
      index: number): IterableChangeRecord_<V> {
    // TODO(vicb):
    // assert(record != prevRecord);
    // assert(record._next === null);
    // assert(record._prev === null);

    const next: IterableChangeRecord_<V>|null =
        prevRecord === null ? this._itHead : prevRecord._next;
    // TODO(vicb):
    // assert(next != record);
    // assert(prevRecord != record);
    record._next = next;
    record._prev = prevRecord;
    if (next === null) {
      this._itTail = record;
    } else {
      next._prev = record;
    }
    if (prevRecord === null) {
      this._itHead = record;
    } else {
      prevRecord._next = record;
    }

    if (this._linkedRecords === null) {
      this._linkedRecords = new _DuplicateMap<V>();
    }
    this._linkedRecords.put(record);

    record.currentIndex = index;
    return record;
  }

  /** @internal */
  _remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    return this._addToRemovals(this._unlink(record));
  }

  /** @internal */
  _unlink(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    if (this._linkedRecords !== null) {
      this._linkedRecords.remove(record);
    }

    const prev = record._prev;
    const next = record._next;

    // TODO(vicb):
    // assert((record._prev = null) === null);
    // assert((record._next = null) === null);

    if (prev === null) {
      this._itHead = next;
    } else {
      prev._next = next;
    }
    if (next === null) {
      this._itTail = prev;
    } else {
      next._prev = prev;
    }

    return record;
  }

  /** @internal */
  _addToMoves(record: IterableChangeRecord_<V>, toIndex: number): IterableChangeRecord_<V> {
    // TODO(vicb):
    // assert(record._nextMoved === null);

    if (record.previousIndex === toIndex) {
      return record;
    }

    if (this._movesTail === null) {
      // TODO(vicb):
      // assert(_movesHead === null);
      this._movesTail = this._movesHead = record;
    } else {
      // TODO(vicb):
      // assert(_movesTail._nextMoved === null);
      this._movesTail = this._movesTail._nextMoved = record;
    }

    return record;
  }

  private _addToRemovals(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    if (this._unlinkedRecords === null) {
      this._unlinkedRecords = new _DuplicateMap<V>();
    }
    this._unlinkedRecords.put(record);
    record.currentIndex = null;
    record._nextRemoved = null;

    if (this._removalsTail === null) {
      // TODO(vicb):
      // assert(_removalsHead === null);
      this._removalsTail = this._removalsHead = record;
      record._prevRemoved = null;
    } else {
      // TODO(vicb):
      // assert(_removalsTail._nextRemoved === null);
      // assert(record._nextRemoved === null);
      record._prevRemoved = this._removalsTail;
      this._removalsTail = this._removalsTail._nextRemoved = record;
    }
    return record;
  }

  /** @internal */
  _addIdentityChange(record: IterableChangeRecord_<V>, item: V) {
    record.item = item;
    if (this._identityChangesTail === null) {
      this._identityChangesTail = this._identityChangesHead = record;
    } else {
      this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
    }
    return record;
  }
}

export class IterableChangeRecord_<V> implements IterableChangeRecord<V> {
  currentIndex: number|null = null;
  previousIndex: number|null = null;

  /** @internal */
  _nextPrevious: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prev: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _next: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prevDup: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextDup: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _prevRemoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextRemoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextAdded: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextMoved: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _nextIdentityChange: IterableChangeRecord_<V>|null = null;


  constructor(public item: V, public trackById: any) {}
}

// A linked list of IterableChangeRecords with the same IterableChangeRecord_.item
class _DuplicateItemRecordList<V> {
  /** @internal */
  _head: IterableChangeRecord_<V>|null = null;
  /** @internal */
  _tail: IterableChangeRecord_<V>|null = null;

  /**
   * Append the record to the list of duplicates.
   *
   * Note: by design all records in the list of duplicates hold the same value in record.item.
   */
  add(record: IterableChangeRecord_<V>): void {
    if (this._head === null) {
      this._head = this._tail = record;
      record._nextDup = null;
      record._prevDup = null;
    } else {
      // TODO(vicb):
      // assert(record.item ==  _head.item ||
      //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
      this._tail!._nextDup = record;
      record._prevDup = this._tail;
      record._nextDup = null;
      this._tail = record;
    }
  }

  // Returns a IterableChangeRecord_ having IterableChangeRecord_.trackById == trackById and
  // IterableChangeRecord_.currentIndex >= atOrAfterIndex
  get(trackById: any, atOrAfterIndex: number|null): IterableChangeRecord_<V>|null {
    let record: IterableChangeRecord_<V>|null;
    for (record = this._head; record !== null; record = record._nextDup) {
      if ((atOrAfterIndex === null || atOrAfterIndex <= record.currentIndex!) &&
          Object.is(record.trackById, trackById)) {
        return record;
      }
    }
    return null;
  }

  /**
   * Remove one {@link IterableChangeRecord_} from the list of duplicates.
   *
   * Returns whether the list of duplicates is empty.
   */
  remove(record: IterableChangeRecord_<V>): boolean {
    // TODO(vicb):
    // assert(() {
    //  // verify that the record being removed is in the list.
    //  for (IterableChangeRecord_ cursor = _head; cursor != null; cursor = cursor._nextDup) {
    //    if (identical(cursor, record)) return true;
    //  }
    //  return false;
    //});

    const prev: IterableChangeRecord_<V>|null = record._prevDup;
    const next: IterableChangeRecord_<V>|null = record._nextDup;
    if (prev === null) {
      this._head = next;
    } else {
      prev._nextDup = next;
    }
    if (next === null) {
      this._tail = prev;
    } else {
      next._prevDup = prev;
    }
    return this._head === null;
  }
}

class _DuplicateMap<V> {
  map = new Map<any, _DuplicateItemRecordList<V>>();

  put(record: IterableChangeRecord_<V>) {
    const key = record.trackById;

    let duplicates = this.map.get(key);
    if (!duplicates) {
      duplicates = new _DuplicateItemRecordList<V>();
      this.map.set(key, duplicates);
    }
    duplicates.add(record);
  }

  /**
   * Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
   * have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.
   *
   * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
   * have any more `a`s needs to return the second `a`.
   */
  get(trackById: any, atOrAfterIndex: number|null): IterableChangeRecord_<V>|null {
    const key = trackById;
    const recordList = this.map.get(key);
    return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
  }

  /**
   * Removes a {@link IterableChangeRecord_} from the list of duplicates.
   *
   * The list of duplicates also is removed from the map if it gets empty.
   */
  remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V> {
    const key = record.trackById;
    const recordList: _DuplicateItemRecordList<V> = this.map.get(key)!;
    // Remove the list of duplicates when it gets empty
    if (recordList.remove(record)) {
      this.map.delete(key);
    }
    return record;
  }

  get isEmpty(): boolean {
    return this.map.size === 0;
  }

  clear() {
    this.map.clear();
  }
}

function getPreviousIndex(item: any, addRemoveOffset: number, moveOffsets: number[]|null): number {
  const previousIndex = item.previousIndex;
  if (previousIndex === null) return previousIndex;
  let moveOffset = 0;
  if (moveOffsets && previousIndex < moveOffsets.length) {
    moveOffset = moveOffsets[previousIndex];
  }
  return previousIndex + addRemoveOffset + moveOffset;
}
/**
 * A type describing supported iterable types.
 *
 * @publicApi
 */
export type NgIterable<T> = Array<T>|Iterable<T>;

/**
 * A strategy for tracking changes over time to an iterable. Used by {@link NgForOf} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 *
 * @publicApi
 */
export interface IterableDiffer<V> {
  /**
   * Compute a difference between the previous state and the new `object` state.
   *
   * @param object containing the new value.
   * @returns an object describing the difference. The return value is only valid until the next
   * `diff()` invocation.
   */
  diff(object: NgIterable<V>|undefined|null): IterableChanges<V>|null;
}

/**
 * An object describing the changes in the `Iterable` collection since last time
 * `IterableDiffer#diff()` was invoked.
 *
 * @publicApi
 */
export interface IterableChanges<V> {
  /**
   * Iterate over all changes. `IterableChangeRecord` will contain information about changes
   * to each item.
   */
  forEachItem(fn: (record: IterableChangeRecord<V>) => void): void;

  /**
   * Iterate over a set of operations which when applied to the original `Iterable` will produce the
   * new `Iterable`.
   *
   * NOTE: These are not necessarily the actual operations which were applied to the original
   * `Iterable`, rather these are a set of computed operations which may not be the same as the
   * ones applied.
   *
   * @param record A change which needs to be applied
   * @param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
   *        original `Iterable` location, where as `previousIndex` refers to the transient location
   *        of the item, after applying the operations up to this point.
   * @param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
   *        original `Iterable` location, where as `currentIndex` refers to the transient location
   *        of the item, after applying the operations up to this point.
   */
  forEachOperation(
      fn:
          (record: IterableChangeRecord<V>, previousIndex: number|null,
           currentIndex: number|null) => void): void;

  /**
   * Iterate over changes in the order of original `Iterable` showing where the original items
   * have moved.
   */
  forEachPreviousItem(fn: (record: IterableChangeRecord<V>) => void): void;

  /** Iterate over all added items. */
  forEachAddedItem(fn: (record: IterableChangeRecord<V>) => void): void;

  /** Iterate over all moved items. */
  forEachMovedItem(fn: (record: IterableChangeRecord<V>) => void): void;

  /** Iterate over all removed items. */
  forEachRemovedItem(fn: (record: IterableChangeRecord<V>) => void): void;

  /**
   * Iterate over all items which had their identity (as computed by the `TrackByFunction`)
   * changed.
   */
  forEachIdentityChange(fn: (record: IterableChangeRecord<V>) => void): void;
}

/**
 * Record representing the item change information.
 *
 * @publicApi
 */
export interface IterableChangeRecord<V> {
  /** Current index of the item in `Iterable` or null if removed. */
  readonly currentIndex: number|null;

  /** Previous index of the item in `Iterable` or null if added. */
  readonly previousIndex: number|null;

  /** The item. */
  readonly item: V;

  /** Track by identity as computed by the `TrackByFunction`. */
  readonly trackById: any;
}

/**
 * A function optionally passed into the `NgForOf` directive to customize how `NgForOf` uniquely
 * identifies items in an iterable.
 *
 * `NgForOf` needs to uniquely identify items in the iterable to correctly perform DOM updates
 * when items in the iterable are reordered, new items are added, or existing items are removed.
 *
 *
 * In all of these scenarios it is usually desirable to only update the DOM elements associated
 * with the items affected by the change. This behavior is important to:
 *
 * - preserve any DOM-specific UI state (like cursor position, focus, text selection) when the
 *   iterable is modified
 * - enable animation of item addition, removal, and iterable reordering
 * - preserve the value of the `<select>` element when nested `<option>` elements are dynamically
 *   populated using `NgForOf` and the bound iterable is updated
 *
 * A common use for custom `trackBy` functions is when the model that `NgForOf` iterates over
 * contains a property with a unique identifier. For example, given a model:
 *
 * ```ts
 * class User {
 *   id: number;
 *   name: string;
 *   ...
 * }
 * ```
 * a custom `trackBy` function could look like the following:
 * ```ts
 * function userTrackBy(index, user) {
 *   return user.id;
 * }
 * ```
 *
 * A custom `trackBy` function must have several properties:
 *
 * - be [idempotent](https://en.wikipedia.org/wiki/Idempotence) (be without side effects, and always
 * return the same value for a given input)
 * - return unique value for all unique inputs
 * - be fast
 *
 * @see [`NgForOf#ngForTrackBy`](api/common/NgForOf#ngForTrackBy)
 * @publicApi
 */
export interface TrackByFunction<T> {
  // Note: the type parameter `U` enables more accurate template type checking in case a trackBy
  // function is declared using a base type of the iterated type. The `U` type gives TypeScript
  // additional freedom to infer a narrower type for the `item` parameter type, instead of imposing
  // the trackBy's declared item type as the inferred type for `T`.
  // See https://github.com/angular/angular/issues/40125

  /**
   * @param index The index of the item within the iterable.
   * @param item The item in the iterable.
   */
  <U extends T>(index: number, item: T&U): any;
}

/**
 * Provides a factory for {@link IterableDiffer}.
 *
 * @publicApi
 */
export interface IterableDifferFactory {
  supports(objects: any): boolean;
  create<V>(trackByFn?: TrackByFunction<V>): IterableDiffer<V>;
}

export function defaultIterableDiffersFactory() {
  return new IterableDiffers([new $milkywaystd_classes_DefaultIterableDifferFactory()]);
}

/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
export class IterableDiffers {
  

  /**
   * @deprecated v4.0.0 - Should be private
   */
  factories: IterableDifferFactory[];
  constructor(factories: IterableDifferFactory[]) {
    this.factories = factories;
  }

  static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers {
    if (parent != null) {
      const copied = parent.factories.slice();
      factories = factories.concat(copied);
    }

    return new IterableDiffers(factories);
  }

  /**
   * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
   * inherited {@link IterableDiffers} instance with the provided factories and return a new
   * {@link IterableDiffers} instance.
   *
   * @usageNotes
   * ### Example
   *
   * The following example shows how to extend an existing list of factories,
   * which will only be applied to the injector for this component and its children.
   * This step is all that's required to make a new {@link IterableDiffer} available.
   *
   * ```
   * @Component({
   *   viewProviders: [
   *     IterableDiffers.extend([new ImmutableListDiffer()])
   *   ]
   * })
   * ```
   */
  
  find(iterable: any): IterableDifferFactory {
    const factory = this.factories.find(f => f.supports(iterable));
    if (factory != null) {
      return factory;
    } else {
      throw new Error(`Cannot find a differ supporting object '${iterable}' of type '${
                  getTypeNameForDebugging(iterable)}'`);
    }
  }
}

export function getTypeNameForDebugging(type: any): string {
  return type['name'] || typeof type;
}
export function isIterable(obj: any): obj is Iterable<any> {
	return obj !== null && typeof obj === 'object' && (obj as any)[getSymbolIterator()] !== undefined;
  }
  
  export function isListLikeIterable(obj: any): boolean {
	if (!isJsObject(obj)) return false;
	return Array.isArray(obj) ||
		(!(obj instanceof Map) &&      // JS Map are iterables but return entries as [k, v]
		 getSymbolIterator() in obj);  // JS Iterable have a Symbol.iterator prop
  }
  
  export function areIterablesEqual(
	  a: any, b: any, comparator: (a: any, b: any) => boolean): boolean {
	const iterator1 = a[getSymbolIterator()]();
	const iterator2 = b[getSymbolIterator()]();
  
	while (true) {
	  const item1 = iterator1.next();
	  const item2 = iterator2.next();
	  if (item1.done && item2.done) return true;
	  if (item1.done || item2.done) return false;
	  if (!comparator(item1.value, item2.value)) return false;
	}
  }
  
  export function iterateListLike(obj: any, fn: (p: any) => any) {
	if (Array.isArray(obj)) {
	  for (let i = 0; i < obj.length; i++) {
		fn(obj[i]);
	  }
	} else {
	  const iterator = obj[getSymbolIterator()]();
	  let item: any;
	  while (!((item = iterator.next()).done)) {
		fn(item.value);
	  }
	}
  }
  
  export function isJsObject(o: any): boolean {
	return o !== null && (typeof o === 'function' || typeof o === 'object');
  }
  declare const Symbol: any;
let _symbolIterator: any = null;
export function getSymbolIterator(): string|symbol {
  if (!_symbolIterator) {
    const Symbol = _global['Symbol'];
    if (Symbol && Symbol.iterator) {
      _symbolIterator = Symbol.iterator;
    } else {
      // es6-shim specific logic
      const keys = Object.getOwnPropertyNames(Map.prototype);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'entries' && key !== 'size' &&
            (Map as any).prototype[key] === Map.prototype['entries']) {
          _symbolIterator = key;
        }
      }
    }
  }
  return _symbolIterator;
}
// TODO(jteplitz602): Load WorkerGlobalScope from lib.webworker.d.ts file #3492
declare var WorkerGlobalScope: any;
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
declare var global: any;

// Always use __globalThis if available, which is the spec-defined global variable across all
// environments, then fallback to __global first, because in Node tests both __global and
// __window may be defined and _global should be __global in that case. Note: Typeof/Instanceof
// checks are considered side-effects in Terser. We explicitly mark this as side-effect free:
// https://github.com/terser/terser/issues/250.
const _global: any = (/* @__PURE__ */ (
    () => (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof global !== 'undefined' && global) || (typeof window !== 'undefined' && window) ||
        (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
         self instanceof WorkerGlobalScope && self))());

/**
 * Attention: whenever providing a new value, be sure to add an
 * entry into the corresponding `....externs.js` file,
 * so that closure won't use that global for its purposes.
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export function stringify(token: any): string {
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
  
  /**
   * Concatenates two strings with separator, allocating new strings only when necessary.
   *
   * @param before before string.
   * @param separator separator string.
   * @param after after string.
   * @returns concatenated string.
   */
  export function concatStringsWithSpace(before: string|null, after: string|null): string {
	return (before == null || before === '') ?
		(after === null ? '' : after) :
		((after == null || after === '') ? before : before + ' ' + after);
  }
}
