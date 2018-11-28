import {observe, myWatch} from './observer'
import set from './set'

let data = {
  name: 'James Harden',
  team: 'Houston Rockets',
  teammate: {
    name: 'chris paul',
    team: {
      now: 'rockets',
      before: 'clippers'
    }
  },
  stars: ['kobe', 'jordan', 'wade']
}

function render() {
  document.body.innerText = `The last season's MVP is ${data.name}, he's from ${data.team}, he has a teammate ${data.teammate.name}, ${data.teammate.name} was played for ${data.teammate.team.before}, he is ${data.age} this year`
}

observe(data)

set(data, 'age', 40)

myWatch(render, render)


