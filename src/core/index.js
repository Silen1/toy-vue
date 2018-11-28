import {observe, myWatch} from './observer'

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
  document.body.innerText = `The last season's MVP is ${data.name}, he's from ${data.team}, he has a teammate ${data.teammate.name}, ${data.teammate.name} was played for ${data.teammate.team.before}`
}

observe(data)

myWatch(render, render)

data.name = 123
data.stars.push(1)


