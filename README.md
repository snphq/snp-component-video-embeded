# Embeded video component for generator-sp

Usefull only with [generator-sp](https://github.com/snphq/generator-sp).

## Installation

Install it from bower

```bash
bower install snp-component-video-embeded --save
```

Add styles reference in `main.scss`
```sass
@import "../bower_components/snp-component-video-embeded/lib/index";
```

Add js requirements reference to `main.coffee`

```coffee
require.config
  paths:
    ...
    'EmbededVideoComponent': "#{VENDOR_PATH}/snp-component-video-embeded/dist/index"

```


## Usage

[Example](http://snphq.github.io/generator-sp-playground/#!/embededvideo)

Add VideoEmbededComponent into region and set model to it. Model should have 2 
fields: video, image(preview).

```coffee
EmbededVideoComponent = require "EmbededVideoComponent"

EmbededVideoPage = _Page.extend
    template: "#EmbededVideoPage"
    className: "embededvideo_page"


    regions:
      video1:
        el: "[data-view-video]"
        view: EmbededVideoComponent

      initialize: ->
        @r.video1.setModel @someModel
        # or 
        @r.video1.setData {
          video: "https://www.youtube.com/embed/UBS4Gi1y_nc"
          image: "http://img.youtube.com/vi/UBS4Gi1y_nc/maxresdefault.jpg"
        }
```

Model can passed via scope
```coffee
    regions:
      video1:
        el: "[data-view-video]"
        view: EmbededVideoComponent
        scope: ->
          data:
            video: "https://www.youtube.com/embed/UBS4Gi1y_nc"
            image: "http://img.youtube.com/vi/UBS4Gi1y_nc/maxresdefault.jpg"
          # or
            model: @someModel
    scope: ->
      @someModel = new SomeVideoModel
```

Video can be played and stopped with methods `play` and `stop`.
```coffee
@r.video1.play()
#or 
@r.video1.stop()

```


