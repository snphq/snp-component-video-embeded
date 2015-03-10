/*! snp-component-video-embeded 0.0.1 */
define(function(require) {
  var Backbone, EmbededVideoComponent, MixinBackbone, SuperClass, VideoModel;
  Backbone = require('backbone');
  MixinBackbone = require('backbone-mixin');
  require('epoxy');
  SuperClass = MixinBackbone(Backbone.Epoxy.View);
  VideoModel = Backbone.Epoxy.Model.extend({
    defaults: {
      video: "",
      image: "",
      showvideo: false
    },
    computeds: {
      video_embed: {
        deps: ["video", "image", "showvideo"],
        get: function(video, image, showvideo) {
          var img, video_url;
          video_url = video + (video.indexOf("?") > 0 ? "&" : "?") + "autoplay=1";
          img = "<div class=\"videoembeded_component--image\" style=\"background-image:url('" + image + "')\" />\n<div class=\"videoembeded_component--play\" data-js-video-play />";
          if (!showvideo) {
            return img;
          }
          if (video) {
            return "<iframe src=\"" + video_url + "\" frameborder=\"0\" allowfullscreen ></iframe>";
          } else {
            return img;
          }
        }
      }
    }
  });
  return EmbededVideoComponent = SuperClass.extend({
    templateFunction: function() {
      return "";
    },
    className: "videoembeded_component",
    ui: {
      play: "[data-js-video-play]"
    },
    bindings: {
      ":el": "embeded:video_embed",
      "@ui.play": "classes:{hide:showvideo}"
    },
    events: {
      "click @ui.play": "onClickPlay"
    },
    bindingHandlers: {
      embeded: function($el, html) {
        $el.empty();
        return $el.html(html);
      }
    },
    initialize: function(opts) {
      if (opts == null) {
        opts = {};
      }
      this.viewModel = new VideoModel;
      opts = _.defaults(opts, {
        data: null
      });
      if (opts.data) {
        this.setData(opts.data);
      }
      if (this.model) {
        return this.setModel(this.model);
      }
    },
    onChangeModel: function() {
      return this._parseModel(this.model);
    },
    setData: function(data) {
      return this.viewModel.set(data);
    },
    setModel: function(model) {
      if (this.model && this.model !== model) {
        this.stopListening(this.model);
      }
      this.model = model;
      this.listenTo(this.model, "change", this.onChangeModel);
      return this._parseModel(model);
    },
    _parseModel: function(model) {
      var data;
      data = _.extend(_.result(this.model, 'defaults'), {
        video: model.get('video'),
        image: model.get("image")
      });
      return this.setData(data);
    },
    hidePlayer: function() {},
    play: function() {
      return this.viewModel.set({
        showvideo: true
      });
    },
    stop: function() {
      return this.viewModel.set({
        showvideo: false
      });
    },
    onClose: function() {
      return this.stop();
    },
    onClickPlay: function() {
      return this.viewModel.set({
        showvideo: true
      });
    }
  });
});
