define (require)->
  Backbone = require 'backbone'
  MixinBackbone = require 'backbone-mixin'
  require 'epoxy'


  SuperClass = MixinBackbone(Backbone.Epoxy.View)

  VideoModel = Backbone.Epoxy.Model.extend
    defaults:
      video:""
      image:""
      showvideo:false

    computeds:
      video_embed:
        deps:["video","image", "showvideo"]
        get:(video,image, showvideo)->
          video_url = video + (if video.indexOf("?") > 0 then "&" else "?") + "autoplay=1"
          img = """
            <div class=\"videoembeded_component--image\" style=\"background-image:url('#{image}')\" />
            <div class=\"videoembeded_component--play\" data-js-video-play />
            """
          return img unless showvideo
          if video
            "<iframe src=\"#{video_url}\" frameborder=\"0\" allowfullscreen ></iframe>"
          else img

  EmbededVideoComponent = SuperClass.extend
    templateFunction: -> ""
    className:"videoembeded_component"

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

    initialize:(opts={})->
      @viewModel = new VideoModel
      opts = _.defaults opts, {
        data: null
      }
      @setData opts.data if opts.data
      @setModel @model if @model

    onChangeModel: -> @_parseModel @model

    setData: (data)-> @viewModel.set data

    setModel: (model)->
      if @model and @model isnt model
        @stopListening @model
      @model = model
      @listenTo @model, "change", @onChangeModel
      @_parseModel model

    _parseModel: (model)->
      data = _.extend _.result(@model,'defaults'),{
        video:        model.get('video')
        image:        model.get("image")
      }
      @setData data

    hidePlayer:->

    play: -> @viewModel.set {showvideo: true}

    stop: -> @viewModel.set {showvideo: false}

    onClose:-> @stop()

    onClickPlay:-> @viewModel.set {showvideo:true}
