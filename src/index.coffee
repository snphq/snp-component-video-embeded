define (require)->
  Backbone = require 'backbone'
  MixinBackbone = require 'backbone-mixin'
  require 'epoxy'


  SuperClass = MixinBackbone(Backbone.Epoxy.View)

  VideoModel = Backbone.Epoxy.Model.extend
    defaults:
      video_title:""
      video:""
      image:""
      showvideo:false

    computeds:
      video_embed:
        deps:["video","image", "showvideo"]
        get:(video,image, showvideo)->
          video_url = video + (if video.indexOf("?") > 0 then "&" else "?") + "autoplay=1"
          img = """
            <div class=\"image\" style=\"background-image:url('#{image}')\" />
            <div class=\"play\" data-js-video-play />
            """
          return img unless showvideo
          if video
            "<iframe src=\"#{video_url}\" frameborder=\"0\" allowfullscreen ></iframe>"
          else img

  EmbededVideoComponent = SuperClass.extend
    templateFunction: -> ""
    className:"videoembeded_widget"

    ui:
      play:"[data-js-video-play]"

    bindings:
      ":el":"embeded:video_embed"
      "@ui.play":"classes:{hide:showvideo}"

    events:
      "click @ui.play":"onClickPlay"

    bindingHandlers:
      embeded:($el,html)->
        $el.empty()
        $el.html html

    initialize:->
      @model = new VideoModel

    showPlayer:($el,model)->
      $el.append @$el
      @delegateEvents()
      data = _.extend _.result(@model,'defaults'),{
        video:        model.get('video')
        video_title:  model.get('video_title')
        image:        model.get("image")
      }
      @model.set data

    hidePlayer:->

    onClose:-> @model.set {showvideo:false}

    onClickPlay:-> @model.set {showvideo:true}
