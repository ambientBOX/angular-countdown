'use strict';

import {expect} from 'chai';
const Pi = Math.PI;

export default function () {

  const countdown = `
    <countdown timer="timer" radius="15" stroke="5"></countdown>
  `;

  let $scope, timer, element, controller;
  beforeEach(angular.mock.inject(function (CountdownTimer, $rootScope, $compile) {
    $scope = $rootScope.$new();
    timer = $scope.timer = new CountdownTimer(1500);
    element = $compile(countdown)($scope);
    controller = element.controller('countdown');
  }));

  describe('Countdown Controller', function () {

    it('exposes a unique scope id', function () {
      expect(controller.$id).to.be.a('number');
    });

    it('begins with a 0 angle', function () {
      expect(controller.angle).to.equal(0);
    });

    it('computes the diameter', function () {
      expect(controller.diameter).to.equal(30);
    });

    it('computes whether the angle is > π', function () {
      expect(controller.mid).to.equal(0);
      controller.angle = Pi + 1;
      expect(controller.mid).to.equal(1);
    });

    it('computes the x coordinate', function () {
      expect(controller.x).to.equal(0);
      controller.angle = Pi / 2;
      expect(controller.x).to.equal(15);
    });

    it('computes the y coordinate', function () {
      expect(controller.y).to.equal(-15);
      controller.angle = Pi / 2;
      expect(controller.y).to.be.closeTo(0, .01);
    });

  });

}
