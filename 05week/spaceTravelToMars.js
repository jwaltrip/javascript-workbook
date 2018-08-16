'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

/* WHITEBOARD

class CrewMember
  PROPERTIES:
    name - string - value assigned in constructor
    job - string - value assigned in constructor
    specialSkill - string - value assigned in constructor
    ship - value will be assigned as null in constructor - will be updated when assigned to a Ship by CrewMember.enterShip() method
  METHODS:
    enterShip(Ship) - will assign CrewMember.ship = the instance of Ship it's entering
                    - will add this CrewMember class instance to the Ship.crew array
                    - does not return value

class Ship
  PROPERTIES:
    name - string - value assigned in constructor
    type - string - value assigned in constructor
    ability - string - value assigned in constructor
    crew - array of CrewMembers - value assigned as empty array in constructor
  METHODS:
    missionStatement() - if Ship has no crew members, then return "Can't perform a mission yet."
                       - if Ship DOES have 1+ crew members (using CrewMember.enterShip(shipVar)), return Ship.ability
                       - returns string
*/


class CrewMember {
  constructor(name, job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null; // this will be assigned by the enterShip() method (not by the constructor)
  }

  enterShip(ship) {
    // assign CrewMember.ship = the instance of Ship it's entering
    this.ship = ship;
    // add this CrewMember class instance to the Ship.crew array
    ship.crew.push(this);
  }
}

class Ship {
  constructor(name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }

  missionStatement() {
    // if crew has a length > 0, then return this.ability
    if (this.crew.length > 0) {
      return this.ability;
    } // else, no crew on ship, cannot perform a mission
    else {
      return "Can't perform a mission yet.";
    }
  }
}




//tests
if (typeof describe === 'function'){
  describe('CrewMember', () => {
    it('should have a name, a job, a specialSkill and ship upon instantiation', () => {
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', () => {
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', () => {
    it('should have a name, a type, an ability and an empty crew upon instantiation', () => {
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', () => {
      const mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      const crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      const hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      const crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
