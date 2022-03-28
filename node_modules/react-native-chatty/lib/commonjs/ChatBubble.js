"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.ChatBubble = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Chatty = require("./Chatty");

var _ReplyingTo = require("./components/ReplyingTo");

var _UrlPreviewBubble = require("./components/UrlPreviewBubble");

var _Chatty2 = require("./types/Chatty.types");

var _eventEmitter = require("./utils/eventEmitter");

var _helpers = require("./utils/helpers");

var _moti = require("./utils/moti");

var _patterns = require("./utils/patterns");

var _photoView = require("./utils/photoView");

var _ContextMenuWrapper = require("./wrappers/ContextMenuWrapper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ParsedText = (0, _patterns.loadParsedText)();

function _ChatBubble(props) {
  var _propsContext$bubbleP7, _propsContext$bubbleP8, _propsContext$bubbleP18, _propsContext$bubbleP19, _propsContext$bubbleP20, _propsContext$pattern3, _propsContext$pattern4, _propsContext$bubbleP33, _propsContext$bubbleP34, _propsContext$bubbleP35, _propsContext$bubbleP36, _propsContext$bubbleP37, _propsContext$bubbleP38, _propsContext$bubbleP39, _propsContext$bubbleP40, _propsContext$bubbleP43, _propsContext$bubbleP45, _propsContext$listPro7, _propsContext$listPro8, _propsContext$bubbleP46, _propsContext$bubbleP47, _propsContext$bubbleP48, _message$user$avatar, _propsContext$bubbleP49, _message$repliedTo, _propsContext$bubbleP50, _propsContext$bubbleP51, _message$me2, _propsContext$bubbleP52, _propsContext$bubbleP53, _message$me3, _propsContext$bubbleP54, _propsContext$bubbleP55, _message$user$avatar2, _propsContext$bubbleP56;

  const {
    message,
    children
  } = props;
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  const [mediaLoaded, setMediaLoaded] = (0, _react.useState)(false);
  const [showMedia, setShowMedia] = (0, _react.useState)(false);
  const [showUrlPreview, setShowUrlPreview] = (0, _react.useState)(false);
  const [urlPreviewData, setUrlPreviewData] = (0, _react.useState)();
  const createdAt = (0, _react.useMemo)(() => {
    return message && (0, _dayjs.default)(message.createdAt).format('HH:mm');
  }, [message]);
  const avatarSize = (0, _react.useMemo)(() => {
    var _propsContext$bubbleP, _propsContext$bubbleP2, _propsContext$bubbleP3, _propsContext$bubbleP4, _propsContext$bubbleP5, _propsContext$bubbleP6;

    return {
      width: ((_propsContext$bubbleP = propsContext.bubbleProps) === null || _propsContext$bubbleP === void 0 ? void 0 : (_propsContext$bubbleP2 = _propsContext$bubbleP.showAvatars) === null || _propsContext$bubbleP2 === void 0 ? void 0 : _propsContext$bubbleP2.width) || 40,
      height: ((_propsContext$bubbleP3 = propsContext.bubbleProps) === null || _propsContext$bubbleP3 === void 0 ? void 0 : (_propsContext$bubbleP4 = _propsContext$bubbleP3.showAvatars) === null || _propsContext$bubbleP4 === void 0 ? void 0 : _propsContext$bubbleP4.width) || 40,
      borderRadius: ((_propsContext$bubbleP5 = propsContext.bubbleProps) === null || _propsContext$bubbleP5 === void 0 ? void 0 : (_propsContext$bubbleP6 = _propsContext$bubbleP5.showAvatars) === null || _propsContext$bubbleP6 === void 0 ? void 0 : _propsContext$bubbleP6.width) || 40
    };
  }, [(_propsContext$bubbleP7 = propsContext.bubbleProps) === null || _propsContext$bubbleP7 === void 0 ? void 0 : (_propsContext$bubbleP8 = _propsContext$bubbleP7.showAvatars) === null || _propsContext$bubbleP8 === void 0 ? void 0 : _propsContext$bubbleP8.width]);
  const bubbleBackgroundColor = (0, _react.useMemo)(() => {
    var _propsContext$bubbleP9, _propsContext$bubbleP16, _propsContext$bubbleP17;

    if ((_propsContext$bubbleP9 = propsContext.bubbleProps) !== null && _propsContext$bubbleP9 !== void 0 && _propsContext$bubbleP9.containerStyle) {
      if (message !== null && message !== void 0 && message.me) {
        var _propsContext$bubbleP10, _propsContext$bubbleP11;

        return {
          backgroundColor: (_propsContext$bubbleP10 = propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP11 = propsContext.bubbleProps) === null || _propsContext$bubbleP11 === void 0 ? void 0 : _propsContext$bubbleP11.selfBubbleColor) !== null && _propsContext$bubbleP10 !== void 0 ? _propsContext$bubbleP10 : '#afddfa',
          ...propsContext.bubbleProps.containerStyle
        };
      } else {
        var _propsContext$bubbleP12, _propsContext$bubbleP13;

        return {
          backgroundColor: (_propsContext$bubbleP12 = propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP13 = propsContext.bubbleProps) === null || _propsContext$bubbleP13 === void 0 ? void 0 : _propsContext$bubbleP13.otherBubbleColor) !== null && _propsContext$bubbleP12 !== void 0 ? _propsContext$bubbleP12 : '#c8faaf',
          ...propsContext.bubbleProps.containerStyle
        };
      }
    }

    if (message !== null && message !== void 0 && message.me) {
      var _propsContext$bubbleP14, _propsContext$bubbleP15;

      return {
        backgroundColor: (_propsContext$bubbleP14 = propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP15 = propsContext.bubbleProps) === null || _propsContext$bubbleP15 === void 0 ? void 0 : _propsContext$bubbleP15.selfBubbleColor) !== null && _propsContext$bubbleP14 !== void 0 ? _propsContext$bubbleP14 : '#afddfa'
      };
    }

    return {
      backgroundColor: (_propsContext$bubbleP16 = propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP17 = propsContext.bubbleProps) === null || _propsContext$bubbleP17 === void 0 ? void 0 : _propsContext$bubbleP17.otherBubbleColor) !== null && _propsContext$bubbleP16 !== void 0 ? _propsContext$bubbleP16 : '#c8faaf'
    };
  }, [message === null || message === void 0 ? void 0 : message.me, propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP18 = propsContext.bubbleProps) === null || _propsContext$bubbleP18 === void 0 ? void 0 : _propsContext$bubbleP18.otherBubbleColor, propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP19 = propsContext.bubbleProps) === null || _propsContext$bubbleP19 === void 0 ? void 0 : _propsContext$bubbleP19.selfBubbleColor, (_propsContext$bubbleP20 = propsContext.bubbleProps) === null || _propsContext$bubbleP20 === void 0 ? void 0 : _propsContext$bubbleP20.containerStyle]);
  const bubbleAlignment = (0, _react.useMemo)(() => {
    if (message !== null && message !== void 0 && message.me) {
      return {
        alignSelf: 'flex-end'
      };
    }

    return {
      alignSelf: 'flex-start'
    };
  }, [message === null || message === void 0 ? void 0 : message.me]);
  (0, _react.useEffect)(() => {
    if (message !== null && message !== void 0 && message.media) {
      message.media.forEach(media => {
        if (media.type === _Chatty2.MediaType.Image) {
          _reactNative.InteractionManager.runAfterInteractions(() => {
            _reactNative.Image.prefetch(media.uri).then(() => {
              setMediaLoaded(true);
            });
          });
        }
      });
    }

    if (propsContext.enableUrlPreviews) {
      _reactNative.InteractionManager.runAfterInteractions(async () => {
        var _message$text;

        const url = (0, _helpers.extractUrlFromString)((_message$text = message === null || message === void 0 ? void 0 : message.text) !== null && _message$text !== void 0 ? _message$text : '');

        if (url) {
          const data = await (0, _helpers.fetchMetaData)(url);

          if (data) {
            setShowUrlPreview(true);
            setUrlPreviewData(data);
          }
        }
      });
    }
  }, [message === null || message === void 0 ? void 0 : message.media, message === null || message === void 0 ? void 0 : message.text, propsContext.enableUrlPreviews]);
  const onPressPattern = (0, _react.useCallback)((pattern, index) => {
    if (!message) return;
    _eventEmitter.ChatEmitter === null || _eventEmitter.ChatEmitter === void 0 ? void 0 : _eventEmitter.ChatEmitter.emit('patternPressed', pattern, index, message);
  }, [message]);
  const messagePatterns = (0, _react.useMemo)(() => {
    var _propsContext$pattern, _propsContext$pattern2;

    const patterns = [];
    if (!(propsContext !== null && propsContext !== void 0 && propsContext.enablePatterns)) return;
    if (!ParsedText) return;
    (0, _patterns.LoadAllPaternShapes)(onPressPattern);

    if ((_propsContext$pattern = propsContext.patternProps) !== null && _propsContext$pattern !== void 0 && _propsContext$pattern.customPatterns) {
      patterns.push(...propsContext.patternProps.customPatterns);
    }

    if (propsContext !== null && propsContext !== void 0 && (_propsContext$pattern2 = propsContext.patternProps) !== null && _propsContext$pattern2 !== void 0 && _propsContext$pattern2.allowPatterns) {
      propsContext.patternProps.allowPatterns.forEach(pattern => {
        switch (pattern) {
          case 'hashtag':
            patterns.push(_patterns.HASHTAG_PATTERN_SHAPE);
            break;

          case 'mention':
            patterns.push(_patterns.MENTION_PATTERN_SHAPE);
            break;

          case 'url':
            patterns.push(_patterns.URL_PATTERN_SHAPE);
            break;
        }
      });
    } else {
      _patterns.ALL_PATERNS_SHAPES.forEach(pattern => patterns.push(pattern));
    }

    return patterns;
  }, [onPressPattern, propsContext === null || propsContext === void 0 ? void 0 : propsContext.enablePatterns, propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$pattern3 = propsContext.patternProps) === null || _propsContext$pattern3 === void 0 ? void 0 : _propsContext$pattern3.allowPatterns, propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$pattern4 = propsContext.patternProps) === null || _propsContext$pattern4 === void 0 ? void 0 : _propsContext$pattern4.customPatterns]);
  const renderTicks = (0, _react.useCallback)(() => {
    var _propsContext$bubbleP21, _propsContext$bubbleP22, _propsContext$bubbleP23, _propsContext$bubbleP24, _propsContext$bubbleP25, _propsContext$bubbleP26, _propsContext$bubbleP27, _propsContext$bubbleP28, _propsContext$bubbleP29, _propsContext$bubbleP30, _propsContext$bubbleP31, _propsContext$bubbleP32;

    if (message !== null && message !== void 0 && message.status) {
      switch (message.status) {
        case _Chatty2.MessageStatus.Sending:
          return (_propsContext$bubbleP21 = (_propsContext$bubbleP22 = propsContext.bubbleProps) === null || _propsContext$bubbleP22 === void 0 ? void 0 : (_propsContext$bubbleP23 = _propsContext$bubbleP22.tickProps) === null || _propsContext$bubbleP23 === void 0 ? void 0 : _propsContext$bubbleP23.sendingElement) !== null && _propsContext$bubbleP21 !== void 0 ? _propsContext$bubbleP21 : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "\uD83D\uDD04");

        case _Chatty2.MessageStatus.Sent:
          return (_propsContext$bubbleP24 = (_propsContext$bubbleP25 = propsContext.bubbleProps) === null || _propsContext$bubbleP25 === void 0 ? void 0 : (_propsContext$bubbleP26 = _propsContext$bubbleP25.tickProps) === null || _propsContext$bubbleP26 === void 0 ? void 0 : _propsContext$bubbleP26.sentElement) !== null && _propsContext$bubbleP24 !== void 0 ? _propsContext$bubbleP24 : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "\u2714");

        case _Chatty2.MessageStatus.Delivered:
          return (_propsContext$bubbleP27 = (_propsContext$bubbleP28 = propsContext.bubbleProps) === null || _propsContext$bubbleP28 === void 0 ? void 0 : (_propsContext$bubbleP29 = _propsContext$bubbleP28.tickProps) === null || _propsContext$bubbleP29 === void 0 ? void 0 : _propsContext$bubbleP29.deliveredElement) !== null && _propsContext$bubbleP27 !== void 0 ? _propsContext$bubbleP27 : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "\u2611");

        case _Chatty2.MessageStatus.Read:
          return (_propsContext$bubbleP30 = (_propsContext$bubbleP31 = propsContext.bubbleProps) === null || _propsContext$bubbleP31 === void 0 ? void 0 : (_propsContext$bubbleP32 = _propsContext$bubbleP31.tickProps) === null || _propsContext$bubbleP32 === void 0 ? void 0 : _propsContext$bubbleP32.readElement) !== null && _propsContext$bubbleP30 !== void 0 ? _propsContext$bubbleP30 : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "\u2705");
      }
    }

    return null;
  }, [message === null || message === void 0 ? void 0 : message.status, (_propsContext$bubbleP33 = propsContext.bubbleProps) === null || _propsContext$bubbleP33 === void 0 ? void 0 : (_propsContext$bubbleP34 = _propsContext$bubbleP33.tickProps) === null || _propsContext$bubbleP34 === void 0 ? void 0 : _propsContext$bubbleP34.deliveredElement, (_propsContext$bubbleP35 = propsContext.bubbleProps) === null || _propsContext$bubbleP35 === void 0 ? void 0 : (_propsContext$bubbleP36 = _propsContext$bubbleP35.tickProps) === null || _propsContext$bubbleP36 === void 0 ? void 0 : _propsContext$bubbleP36.readElement, (_propsContext$bubbleP37 = propsContext.bubbleProps) === null || _propsContext$bubbleP37 === void 0 ? void 0 : (_propsContext$bubbleP38 = _propsContext$bubbleP37.tickProps) === null || _propsContext$bubbleP38 === void 0 ? void 0 : _propsContext$bubbleP38.sendingElement, (_propsContext$bubbleP39 = propsContext.bubbleProps) === null || _propsContext$bubbleP39 === void 0 ? void 0 : (_propsContext$bubbleP40 = _propsContext$bubbleP39.tickProps) === null || _propsContext$bubbleP40 === void 0 ? void 0 : _propsContext$bubbleP40.sentElement]);
  const renderFooter = (0, _react.useCallback)(() => {
    var _propsContext$bubbleP41, _propsContext$bubbleP42, _message$me;

    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.bubbleFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.date, (propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP41 = propsContext.bubbleProps) === null || _propsContext$bubbleP41 === void 0 ? void 0 : _propsContext$bubbleP41.dateStyle) && (propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP42 = propsContext.bubbleProps) === null || _propsContext$bubbleP42 === void 0 ? void 0 : _propsContext$bubbleP42.dateStyle((_message$me = message === null || message === void 0 ? void 0 : message.me) !== null && _message$me !== void 0 ? _message$me : false))]
    }, createdAt), renderTicks());
  }, [createdAt, message === null || message === void 0 ? void 0 : message.me, propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP43 = propsContext.bubbleProps) === null || _propsContext$bubbleP43 === void 0 ? void 0 : _propsContext$bubbleP43.dateStyle, renderTicks]);
  const renderCornerRounding = (0, _react.useCallback)(() => {
    var _propsContext$bubbleP44;

    if (((_propsContext$bubbleP44 = propsContext.bubbleProps) === null || _propsContext$bubbleP44 === void 0 ? void 0 : _propsContext$bubbleP44.enableCornerRounding) === false) return null;

    if (message !== null && message !== void 0 && message.me) {
      var _propsContext$listPro, _propsContext$listPro2, _propsContext$listPro3;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.rightArrow, bubbleBackgroundColor]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.rightArrowOverlap, {
          backgroundColor: (_propsContext$listPro = (_propsContext$listPro2 = propsContext.listProps) === null || _propsContext$listPro2 === void 0 ? void 0 : (_propsContext$listPro3 = _propsContext$listPro2.containerStyle) === null || _propsContext$listPro3 === void 0 ? void 0 : _propsContext$listPro3.backgroundColor) !== null && _propsContext$listPro !== void 0 ? _propsContext$listPro : '#fff'
        }]
      }));
    } else {
      var _propsContext$listPro4, _propsContext$listPro5, _propsContext$listPro6;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.leftArrow, bubbleBackgroundColor]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.leftArrowOverlap, {
          backgroundColor: (_propsContext$listPro4 = (_propsContext$listPro5 = propsContext.listProps) === null || _propsContext$listPro5 === void 0 ? void 0 : (_propsContext$listPro6 = _propsContext$listPro5.containerStyle) === null || _propsContext$listPro6 === void 0 ? void 0 : _propsContext$listPro6.backgroundColor) !== null && _propsContext$listPro4 !== void 0 ? _propsContext$listPro4 : '#fff'
        }]
      }));
    }
  }, [bubbleBackgroundColor, message === null || message === void 0 ? void 0 : message.me, (_propsContext$bubbleP45 = propsContext.bubbleProps) === null || _propsContext$bubbleP45 === void 0 ? void 0 : _propsContext$bubbleP45.enableCornerRounding, (_propsContext$listPro7 = propsContext.listProps) === null || _propsContext$listPro7 === void 0 ? void 0 : (_propsContext$listPro8 = _propsContext$listPro7.containerStyle) === null || _propsContext$listPro8 === void 0 ? void 0 : _propsContext$listPro8.backgroundColor]);
  const renderMedia = (0, _react.useCallback)(() => {
    if (message !== null && message !== void 0 && message.media) {
      var _message$media$;

      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          flexWrap: 'wrap'
        }
      }, message === null || message === void 0 ? void 0 : message.media.map((media, index) => {
        if (index < 3) {
          return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
            onPress: () => setShowMedia(true)
          }, media.type === _Chatty2.MediaType.Image && /*#__PURE__*/_react.default.createElement(_moti.Skeleton, {
            show: !mediaLoaded
          }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
            source: {
              uri: media.uri
            },
            style: styles.media
          })));
        }

        return null;
      }), message.media.length > 3 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => setShowMedia(true)
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
        style: styles.media,
        source: {
          uri: (_message$media$ = message.media[3]) === null || _message$media$ === void 0 ? void 0 : _message$media$.uri
        },
        imageStyle: {
          borderRadius: 15
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.backgroundOverlay
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          color: '#fff',
          textAlign: 'center',
          fontSize: 20
        }
      }, "+ ", message.media.length - 3)))), _photoView.PhotoView && /*#__PURE__*/_react.default.createElement(_photoView.PhotoView, {
        images: message === null || message === void 0 ? void 0 : message.media,
        imageIndex: 0,
        visible: showMedia,
        onRequestClose: () => setShowMedia(false)
      }));
    }

    return null;
  }, [mediaLoaded, message, showMedia]);
  const renderUrlPreview = (0, _react.useMemo)(() => {
    if (showUrlPreview && urlPreviewData && !(message !== null && message !== void 0 && message.repliedTo)) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: 10
        }
      }, /*#__PURE__*/_react.default.createElement(_UrlPreviewBubble.UrlPreviewBubble, {
        title: urlPreviewData.title,
        description: urlPreviewData.description,
        image: urlPreviewData.image,
        url: urlPreviewData.url
      }));
    }

    return null;
  }, [message === null || message === void 0 ? void 0 : message.repliedTo, showUrlPreview, urlPreviewData]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.wrapper, bubbleAlignment]
  }, ((_propsContext$bubbleP46 = propsContext.bubbleProps) === null || _propsContext$bubbleP46 === void 0 ? void 0 : _propsContext$bubbleP46.trailingAccessory) && (message === null || message === void 0 ? void 0 : message.me) && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, propsContext.bubbleProps.trailingAccessory), ((_propsContext$bubbleP47 = propsContext.bubbleProps) === null || _propsContext$bubbleP47 === void 0 ? void 0 : (_propsContext$bubbleP48 = _propsContext$bubbleP47.showAvatars) === null || _propsContext$bubbleP48 === void 0 ? void 0 : _propsContext$bubbleP48.visible) && !(message !== null && message !== void 0 && message.me) && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: (_message$user$avatar = message === null || message === void 0 ? void 0 : message.user.avatar) !== null && _message$user$avatar !== void 0 ? _message$user$avatar : require('./assets/images/noavatar.png'),
    style: [styles.avatar, avatarSize]
  }), /*#__PURE__*/_react.default.createElement(_ContextMenuWrapper.ContextMenuWrapper, {
    message: message
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [bubbleBackgroundColor, styles.container, (_propsContext$bubbleP49 = propsContext.bubbleProps) === null || _propsContext$bubbleP49 === void 0 ? void 0 : _propsContext$bubbleP49.containerStyle, {
      padding: message !== null && message !== void 0 && message.repliedTo ? 5 : 15
    }]
  }, children ? children : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (message === null || message === void 0 ? void 0 : message.repliedTo) && /*#__PURE__*/_react.default.createElement(_ReplyingTo.ReplyingTo, {
    username: message === null || message === void 0 ? void 0 : (_message$repliedTo = message.repliedTo) === null || _message$repliedTo === void 0 ? void 0 : _message$repliedTo.user.username,
    text: message === null || message === void 0 ? void 0 : message.repliedTo.text,
    messageId: message === null || message === void 0 ? void 0 : message.repliedTo.id
  }), propsContext !== null && propsContext !== void 0 && propsContext.enablePatterns && ParsedText ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderMedia(), /*#__PURE__*/_react.default.createElement(ParsedText, {
    parse: messagePatterns,
    style: (propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP50 = propsContext.bubbleProps) === null || _propsContext$bubbleP50 === void 0 ? void 0 : _propsContext$bubbleP50.labelStyle) && ((_propsContext$bubbleP51 = propsContext.bubbleProps) === null || _propsContext$bubbleP51 === void 0 ? void 0 : _propsContext$bubbleP51.labelStyle((_message$me2 = message === null || message === void 0 ? void 0 : message.me) !== null && _message$me2 !== void 0 ? _message$me2 : false))
  }, message === null || message === void 0 ? void 0 : message.text), renderUrlPreview, renderFooter()) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null, renderMedia(), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: (propsContext === null || propsContext === void 0 ? void 0 : (_propsContext$bubbleP52 = propsContext.bubbleProps) === null || _propsContext$bubbleP52 === void 0 ? void 0 : _propsContext$bubbleP52.labelStyle) && ((_propsContext$bubbleP53 = propsContext.bubbleProps) === null || _propsContext$bubbleP53 === void 0 ? void 0 : _propsContext$bubbleP53.labelStyle((_message$me3 = message === null || message === void 0 ? void 0 : message.me) !== null && _message$me3 !== void 0 ? _message$me3 : false))
  }, message === null || message === void 0 ? void 0 : message.text), renderUrlPreview, renderFooter())), renderCornerRounding())), ((_propsContext$bubbleP54 = propsContext.bubbleProps) === null || _propsContext$bubbleP54 === void 0 ? void 0 : (_propsContext$bubbleP55 = _propsContext$bubbleP54.showAvatars) === null || _propsContext$bubbleP55 === void 0 ? void 0 : _propsContext$bubbleP55.visible) && (message === null || message === void 0 ? void 0 : message.me) && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: (_message$user$avatar2 = message === null || message === void 0 ? void 0 : message.user.avatar) !== null && _message$user$avatar2 !== void 0 ? _message$user$avatar2 : require('./assets/images/noavatar.png'),
    style: [styles.avatarMe, avatarSize]
  }), ((_propsContext$bubbleP56 = propsContext.bubbleProps) === null || _propsContext$bubbleP56 === void 0 ? void 0 : _propsContext$bubbleP56.trailingAccessory) && !(message !== null && message !== void 0 && message.me) && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, propsContext.bubbleProps.trailingAccessory));
}

const ChatBubble = /*#__PURE__*/_react.default.memo(_ChatBubble);

exports.ChatBubble = ChatBubble;

const styles = _reactNative.StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    margin: 20,
    maxWidth: _reactNative.Dimensions.get('screen').width - 120,
    borderRadius: 10
  },
  rightArrow: {
    position: 'absolute',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -7
  },
  rightArrowOverlap: {
    position: 'absolute',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20
  },
  leftArrow: {
    position: 'absolute',
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10
  },
  leftArrowOverlap: {
    position: 'absolute',
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20
  },
  date: {
    color: '#a8a8a8',
    fontSize: 11
  },
  avatar: {
    marginLeft: 10
  },
  avatarMe: {
    marginRight: 10
  },
  bubbleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 5
  },
  moreMedia: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc'
  },
  media: {
    width: 110,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10
  },
  backgroundOverlay: {
    width: 110,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});

exports.styles = styles;
//# sourceMappingURL=ChatBubble.js.map