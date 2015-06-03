'use strict';

import EventEmitter from 'events';
import angular from 'angular';

function factory ($interval, $q) {
  return class CountdownTimer extends EventEmitter {
    constructor (length, options) {
      this.length = length;
      this.options = angular.extend({
        tickInterval: 15,
        finishable: true
      }, options);
      this.$$deferred = $q.defer();
    }
    start (from) {
      const tickInterval = this.options.tickInterval;
      from = from ? from : 0;

      var first = true;
      const fromLength = this.length - from;

      if(this.$$interval) clearInterval(this.$$interval);
      this.emit('reset');

      this.$$interval = $interval(() => {
        this.emit('tick', tickInterval / this.length, (first && from) ? from : undefined);
        first = false;
      }, tickInterval, fromLength / tickInterval);

      this.$$interval.then(() => {
        if(this.options.finishable) {
          console.log(this.options.finishable)
          this.emit('done');
        }
        this.$$deferred.resolve();
      });

      return this;
    }
    cancel () {
      if (this.$$interval) {
        $interval.cancel(this.$$interval);
        if(this.options.finishable) {
          this.emit('done');
        }
        this.$$deferred.reject(new Error('Timer cancelled'));
      }
      return this;
    }
    then (handler) {
      return this.$$deferred.promise.then(handler);
    }
    catch (handler) {
      return this.$$deferred.promise.catch(handler);
    }
    finally (handler) {
      return this.$$deferred.promise.finally(handler);
    }
  };
}
factory.$inject = ['$interval', '$q'];

export default factory;
