import LMThree from '../../3d/THREEJS/LMThree'

export default class JSONTest extends LMThree{
  constructor() {
    super()
    let options = {
      renderOption: {
        canvasFatherId: 'canvasFather',
        height: document.querySelector('#canvasFather').clientHeight,
        width: document.querySelector('#canvasFather').clientWidth
      }
    }
    this.init(options)

    this.load({
      path: './',
      name: 'cat.json'
    })
  }
}
