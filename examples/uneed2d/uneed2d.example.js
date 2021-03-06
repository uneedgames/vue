var stage = new UN.GameStage({
  root: '#root',
  backgroundColor: 0xFFFFFF,
  viewport: {
    width: 500,
    height: 300
  },
  resolution: 1
});

stage.start();

Vue.config.devtools = true

let texture = UN.Texture.fromImage('data:image/png;base64,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')

UN.vue(stage, {
  template: `
    <layout position="top left">
      <entity>
        <sprite :texture="texture" :x="x" interactive @pointerdown="this.onPointerDown"/>
      </entity>
    </layout>
  `,
  data: {
    texture: texture,
    x: 100
  },

  created() {
  },
  
  methods: {
    onPointerDown(e) {
      console.log(e)
    }
  }
})
