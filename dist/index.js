/*! snp-component-video-embeded 0.0.1 */
define(function(require) {
  var Backbone, EmbededVideoComponent, MixinBackbone, SuperClass, VideoModel;
  Backbone = require('backbone');
  MixinBackbone = require('backbone-mixin');
  require('epoxy');
  SuperClass = MixinBackbone(Backbone.Epoxy.View);
  VideoModel = Backbone.Epoxy.Model.extend({
    defaults: {
      video_title: "",
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
          img = "<div class=\"image\" style=\"background-image:url('" + image + "')\" />\n<div class=\"play\" data-js-video-play />";
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
    className: "videoembeded_widget",
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
    initialize: function() {
      return this.model = new VideoModel;
    },
    showPlayer: function($el, model) {
      var data;
      $el.append(this.$el);
      this.delegateEvents();
      data = _.extend(_.result(this.model, 'defaults'), {
        video: model.get('video'),
        video_title: model.get('video_title'),
        image: model.get("image")
      });
      return this.model.set(data);
    },
    hidePlayer: function() {},
    onClose: function() {
      return this.model.set({
        showvideo: false
      });
    },
    onClickPlay: function() {
      return this.model.set({
        showvideo: true
      });
    }
  });
});
