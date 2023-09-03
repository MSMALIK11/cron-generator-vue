import cronstrue from 'cronstrue/i18n';
import { openBlock, createElementBlock, createTextVNode, toDisplayString, createElementVNode, Fragment, renderList, resolveComponent, createVNode, createCommentVNode, normalizeClass, createBlock } from 'vue';

var HEADER_VALUES = {
    MINUTES: 'Minutes',
    HOURLY: 'Hourly',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    CUSTOM: 'Custom'
};

var defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY, HEADER_VALUES.CUSTOM];

var metadata = [{
    name: HEADER_VALUES.MINUTES,
    initialCron: ['0','0/1','*','*','*','?','*']
}, {
    name: HEADER_VALUES.HOURLY,
    initialCron: ['0','0','0','1/1','*','?','*']
}, {
    name: HEADER_VALUES.DAILY,
    initialCron: ['0','0','0','1/1','*','?','*']
}, {
    name: HEADER_VALUES.WEEKLY,
    initialCron: ['0','0','0','?','*','*','*']
}, {
    name: HEADER_VALUES.MONTHLY,
    initialCron: ['0','0','0','1','1/1','?','*']
}, {
    name: HEADER_VALUES.CUSTOM,
    initialCron: ['*','*','*','*','*','*','*']
}];

var validateHeaders = function (headers) {
    var validatedHeaders = [];
    headers.forEach(function (header) {
        if(!HEADER_VALUES[header]) {
            throw new Error('Invalid header ' + header);
            // Avoid duplicates
        } else if(validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
            validatedHeaders.push(HEADER_VALUES[header]);
        }
    });
    return validatedHeaders;
};

/**
 * Validate and load headers
 * @param {*} options 
 */
var loadHeaders = function (options) {
    if(options) {
        if(options.headers) {
            if(!options.headers.length) {
                throw new Error('Atleast one header is required.');
            }
            return validateHeaders(options.headers);
        }
    }
    return defaultTabs;
};

var translateFn = function (key, translations) {
    var translatedText = key;
    if(translations) {
        translatedText = translations[key];
        if(typeof translatedText !== 'string') {
            throw new Error('translateFn expects a string translation');
        }
    }
    return translatedText;
};

var script$8 = {
    props:['value'],
    methods: {
        onChange: function onChange(e) {
            if((e.target.value > 0 && e.target.value < 60) || e.target.value === '') {
                var val = this.value;
                val[1] = e.target.value ? ("0/" + (e.target.value)) : val[1];  
                this.$emit("change-val", val);
            }  
        }
    }
};

var _hoisted_1$8 = { className: "well" };
var _hoisted_2$7 = ["value"];

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$8, [
    createTextVNode(toDisplayString(_ctx.$parent.translate('Every')) + " ", 1 /* TEXT */),
    createElementVNode("input", {
      type: "Number",
      onInput: _cache[0] || (_cache[0] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onChange && $options.onChange.apply($options, args));
  }),
      value: $props.value[1].split('/')[1],
      min: "1",
      max: "60"
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$7),
    createTextVNode(" " + toDisplayString(_ctx.$parent.translate('minute(s)')), 1 /* TEXT */)
  ]))
}

script$8.render = render$8;
script$8.__file = "src/lib/cron-tab/minutes.vue";

var script$7 = {
    props:['disabled','value'],
};

var _hoisted_1$7 = ["disabled", "value"];

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("select", {
    disabled: $props.disabled,
    className: "hours",
    onChange: _cache[0] || (_cache[0] = function ($event) { return (_ctx.$emit('change', $event)); }),
    value: $props.value
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(60, function (n, index) {
      return createElementVNode("option", {
        key: index + n
      }, toDisplayString(index), 1 /* TEXT */)
    }), 64 /* STABLE_FRAGMENT */))
  ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$7))
}

script$7.render = render$7;
script$7.__file = "src/lib/select/minutes.vue";

var script$6 = {
    props:['disabled','value'],
};

var _hoisted_1$6 = ["disabled", "value"];
var _hoisted_2$6 = ["value"];

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("select", {
    disabled: $props.disabled,
    className: "hours",
    onChange: _cache[0] || (_cache[0] = function ($event) { return (_ctx.$emit('change', $event)); }),
    value: $props.value
  }, [
    (openBlock(), createElementBlock(Fragment, null, renderList(24, function (n, index) {
      return createElementVNode("option", {
        key: index + n,
        value: index
      }, toDisplayString(index), 9 /* TEXT, PROPS */, _hoisted_2$6)
    }), 64 /* STABLE_FRAGMENT */))
  ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$6))
}

script$6.render = render$6;
script$6.__file = "src/lib/select/hour.vue";

var script$5 = {
    props:['value'],
    components: {
        Hour: script$6,
        Minutes: script$7
    },
    methods: {
        everyHour: function everyHour() {
            var val = ['0','0','0/1','1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        atHour: function atHour() {
            var val = ['0','0','0','1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        onHourChange: function onHourChange(e) {
            if((e.target.value > 0 && e.target.value < 24) || e.target.value === '') {
                var val = this.value;
                val[2] = "0/" + (e.target.value ? e.target.value : '*');
                this.$emit("change-val", val);
            } 
        },
        onAtHourChange: function onAtHourChange(e) {
            var val = ['0',this.value[1],'*','1/1','*','?','*'];
            val[2] = "" + (e.target.value);
            this.$emit("change-val", val);
        },
        onAtMinuteChange: function onAtMinuteChange(e) {
            var val = ['0','*', this.value[2],'1/1','*','?','*'];
            val[1] = "" + (e.target.value);
            this.$emit("change-val", val);
        }
    }
};

var _hoisted_1$5 = { className: "tab-content" };
var _hoisted_2$5 = { className: "tab-pane active" };
var _hoisted_3$4 = { className: "mb well-small" };
var _hoisted_4$4 = ["checked"];
var _hoisted_5$2 = ["disabled", "value"];
var _hoisted_6$2 = { className: "mb well-small margin-right-0 margin-left-0" };
var _hoisted_7$2 = { className: "text_align_right w-100" };
var _hoisted_8$2 = ["checked"];
var _hoisted_9$2 = { className: "" };

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Hour = resolveComponent("Hour");
  var _component_Minutes = resolveComponent("Minutes");

  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    createElementVNode("div", _hoisted_2$5, [
      createElementVNode("div", _hoisted_3$4, [
        createElementVNode("input", {
          type: "radio",
          onChange: _cache[0] || (_cache[0] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.everyHour && $options.everyHour.apply($options, args));
  }),
          checked: $props.value[2].indexOf('/') != -1
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_4$4),
        createElementVNode("span", null, toDisplayString(_ctx.$parent.translate('Every')), 1 /* TEXT */),
        createElementVNode("input", {
          disabled: $props.value[2].indexOf('/') == -1,
          type: "number",
          onInput: _cache[1] || (_cache[1] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.onHourChange && $options.onHourChange.apply($options, args));
  }),
          value: this.value[2].split('/')[1] ? this.value[2].split('/')[1] : '',
          max: 24,
          maxLength: "2"
        }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_5$2),
        createElementVNode("span", null, toDisplayString(_ctx.$parent.translate('hour(s)')), 1 /* TEXT */)
      ]),
      createElementVNode("div", _hoisted_6$2, [
        createElementVNode("div", _hoisted_7$2, [
          createElementVNode("input", {
            type: "radio",
            onChange: _cache[2] || (_cache[2] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.atHour && $options.atHour.apply($options, args));
  }),
            checked: $props.value[2].indexOf('/') == -1
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_8$2),
          createElementVNode("span", _hoisted_9$2, toDisplayString(_ctx.$parent.translate('At *')), 1 /* TEXT */),
          createVNode(_component_Hour, {
            disabled: $props.value[2].indexOf('/') != -1,
            onChange: $options.onAtHourChange,
            value: $props.value[2]
          }, null, 8 /* PROPS */, ["disabled", "onChange", "value"]),
          createVNode(_component_Minutes, {
            disabled: $props.value[2].indexOf('/') != -1,
            onChange: $options.onAtMinuteChange,
            value: $props.value[1]
          }, null, 8 /* PROPS */, ["disabled", "onChange", "value"])
        ])
      ])
    ])
  ]))
}

script$5.render = render$5;
script$5.__file = "src/lib/cron-tab/hourly.vue";

var script$4 = {
    props:['value'],
    components: {
        Hour: script$6,
        Minutes: script$7
    },
    methods: {
        everyDay: function everyDay() {
            var val = ['0',this.value[1],this.value[2],'1/1','*','?','*'];
            this.$emit("change-val", val);
        },
        weekDay: function weekDay() {
            var val = ['0', this.value[1], this.value[2],'?','*', 'MON-FRI','*'];
            this.$emit("change-val", val);
        },
        onDayChange: function onDayChange(e) {
            if(!e.target.value || (e.target.value > 0 && e.target.value < 32 )) {
                var val = ['0', this.getValueByIndex(1), this.getValueByIndex(1),'*','*','?','*'];
                val[3]= (e.target.value ? ("1/" + (e.target.value)) : e.target.value);
                this.$emit("change-val", val);
            }
        },
        getValueByIndex: function getValueByIndex(index) {
            return this.value[index] === '*' ? '0' : this.value[index];
        },
        onAtHourChange: function onAtHourChange(e) {
            var val = this.value;
            val[2] = "" + (e.target.value);
            this.$emit("change-val", val);
        },
        onAtMinuteChange: function onAtMinuteChange(e) {
            var val = this.value;
            val[1] = "" + (e.target.value);
            this.$emit("change-val", val);
        }
    }
};

var _hoisted_1$4 = { className: "tab-pane" };
var _hoisted_2$4 = { className: "daily well-small" };
var _hoisted_3$3 = ["disabled", "value"];
var _hoisted_4$3 = { class: "daily well-small" };

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Hour = resolveComponent("Hour");
  var _component_Minutes = resolveComponent("Minutes");

  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    createElementVNode("div", _hoisted_2$4, [
      createCommentVNode(" <input type=\"radio\" @change=\"everyDay\" :checked=\"value[3].indexOf('/') != -1\" /> "),
      createElementVNode("span", null, toDisplayString(_ctx.$parent.translate(' Recur Every *')), 1 /* TEXT */),
      createElementVNode("input", {
        disabled: $props.value[3].indexOf('/') == -1,
        type: "number",
        onInput: _cache[0] || (_cache[0] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.onDayChange && $options.onDayChange.apply($options, args));
  }),
        value: this.value[3].split('/')[1] ? this.value[3].split('/')[1] :'',
        max: 31,
        maxLength: "2"
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_3$3),
      createElementVNode("span", null, toDisplayString(_ctx.$parent.translate('days')), 1 /* TEXT */)
    ]),
    createCommentVNode(" <div className=\"well well-small\">\r\n            <input @change=\"weekDay\" type=\"radio\"  name=\"DailyRadio\" :checked=\"value[3].indexOf('/') == -1\"/>\r\n            <span>{{$parent.translate('Every week day')}}</span>\r\n        </div> "),
    createElementVNode("div", _hoisted_4$3, [
      createElementVNode("span", null, toDisplayString(_ctx.$parent.translate('Start Time *')), 1 /* TEXT */),
      createVNode(_component_Hour, {
        disabled: $props.value[2].indexOf('/') != -1,
        onChange: $options.onAtHourChange,
        value: $props.value[2]
      }, null, 8 /* PROPS */, ["disabled", "onChange", "value"]),
      createVNode(_component_Minutes, {
        disabled: $props.value[2].indexOf('/') != -1,
        onChange: $options.onAtMinuteChange,
        value: $props.value[1]
      }, null, 8 /* PROPS */, ["disabled", "onChange", "value"])
    ])
  ]))
}

script$4.render = render$4;
script$4.__file = "src/lib/cron-tab/daily.vue";

var script$3 = {
    props:['value'],
    components: {
        Hour: script$6,
        Minutes: script$7
    },
    methods: {
        onAtHourChange: function onAtHourChange(e) {
            var val = this.value;
            val[0] = '0';
            val[2] = "" + (e.target.value);
            this.$emit("change-val", val);
        },
        onAtMinuteChange: function onAtMinuteChange(e) {
            var val = this.value;
            val[0] = '0';
            val[1] = "" + (e.target.value);
            this.$emit("change-val", val);
        },
        onCheck: function onCheck(e) {
            var val = this.value;
            val[0] = '0';
            if(e.target.checked) {
                val[2] = (("" + (val[2])).split('/').length > 1) ? '0' : val[2].toString();
                val[3] = '?';
                val[4] = '*';
                if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
                    val[5] = e.target.value;
                } else {
                    val[5] = val[5] + '!' + e.target.value;
                }
            } else {
                val[5] = val[5].split('!');
                if (val[5].length > 1) {
                    val[5].splice(val[5].indexOf(e.target.value), 1);
                    val[5] = val[5].toString().replace(/,/g, '!');
                }
                else {
                    val[5] = '*';
                }           
            }
            this.$emit("change-val", val);
        }
    }
};

var _hoisted_1$3 = { className: "container-fluid" };
var _hoisted_2$3 = { className: "well-weekly well-small row" };
var _hoisted_3$2 = { className: "span6 col-sm-12 d-flex align-items-center mb" };
var _hoisted_4$2 = { className: "font-weight-bold" };
var _hoisted_5$1 = { className: "d-flex align-items-center weeklyBox" };
var _hoisted_6$1 = ["checked"];
var _hoisted_7$1 = ["checked"];
var _hoisted_8$1 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_9$1 = ["checked"];
var _hoisted_10$1 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_11$1 = ["checked"];
var _hoisted_12 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_13 = ["checked"];
var _hoisted_14 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_15 = ["checked"];
var _hoisted_16 = /*#__PURE__*/createElementVNode("br", null, null, -1 /* HOISTED */);
var _hoisted_17 = ["checked"];
var _hoisted_18 = { className: "d-flex" };
var _hoisted_19 = { className: "font-weight-bold w-10" };

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Hour = resolveComponent("Hour");
  var _component_Minutes = resolveComponent("Minutes");

  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("div", _hoisted_2$3, [
      createElementVNode("div", _hoisted_3$2, [
        createElementVNode("h6", _hoisted_4$2, toDisplayString(_ctx.$parent.translate('Allowed Days*')), 1 /* TEXT */),
        createElementVNode("div", _hoisted_5$1, [
          createElementVNode("input", {
            type: "checkbox",
            value: "SUN",
            onChange: _cache[0] || (_cache[0] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('SUN') !== -1 ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_6$1),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Sun')) + " ", 1 /* TEXT */),
          createElementVNode("input", {
            type: "checkbox",
            value: "MON",
            onChange: _cache[1] || (_cache[1] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('MON') !== -1  ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_7$1),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Mon')), 1 /* TEXT */),
          _hoisted_8$1,
          createElementVNode("input", {
            type: "checkbox",
            value: "WED",
            onChange: _cache[2] || (_cache[2] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('WED') !== -1 ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_9$1),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Wed')), 1 /* TEXT */),
          _hoisted_10$1,
          createElementVNode("input", {
            type: "checkbox",
            value: "FRI",
            onChange: _cache[3] || (_cache[3] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('FRI') !== -1  ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_11$1),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Fri')), 1 /* TEXT */),
          _hoisted_12,
          createElementVNode("input", {
            type: "checkbox",
            value: "TUE",
            onChange: _cache[4] || (_cache[4] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('TUE') !== -1 ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_13),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Tuesday')), 1 /* TEXT */),
          _hoisted_14,
          createElementVNode("input", {
            type: "checkbox",
            value: "THU",
            onChange: _cache[5] || (_cache[5] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('THU') !== -1 ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_15),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Thursday')), 1 /* TEXT */),
          _hoisted_16,
          createElementVNode("input", {
            type: "checkbox",
            value: "SAT",
            onChange: _cache[6] || (_cache[6] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onCheck && $options.onCheck.apply($options, args));
  }),
            checked: this.value[5].search('SAT') !== -1 ? true : false
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_17),
          createTextVNode(toDisplayString(_ctx.$parent.translate('Saturday')), 1 /* TEXT */)
        ])
      ]),
      createCommentVNode(" <div className=\"span6 col-sm-6 \">\r\n                <div className=\"text_align_left d-flex\">\r\n                    <input type=\"checkbox\" value=\"TUE\" @change=\"onCheck\" :checked=\"this.value[5].search('TUE') !== -1 ? true : false\"/>{{$parent.translate('Tuesday')}}<br />\r\n                    <input type=\"checkbox\" value=\"THU\" @change=\"onCheck\" :checked=\"this.value[5].search('THU') !== -1 ? true : false\"/>{{$parent.translate('Thursday')}}<br />\r\n                    <input type=\"checkbox\" value=\"SAT\" @change=\"onCheck\" :checked=\"this.value[5].search('SAT') !== -1 ? true : false\"/>{{$parent.translate('Saturday')}}\r\n                </div><br /><br />\r\n            </div> ")
    ]),
    createElementVNode("div", _hoisted_18, [
      createElementVNode("h6", _hoisted_19, toDisplayString(_ctx.$parent.translate('Start time')), 1 /* TEXT */),
      createVNode(_component_Hour, {
        disabled: $props.value[2].indexOf('/') != -1,
        onChange: $options.onAtHourChange,
        value: $props.value[2]
      }, null, 8 /* PROPS */, ["disabled", "onChange", "value"]),
      createVNode(_component_Minutes, {
        disabled: $props.value[2].indexOf('/') != -1,
        onChange: $options.onAtMinuteChange,
        value: $props.value[1]
      }, null, 8 /* PROPS */, ["disabled", "onChange", "value"])
    ])
  ]))
}

script$3.render = render$3;
script$3.__file = "src/lib/cron-tab/weekly.vue";

var script$2 = {
    props:['value'],
    components: {
        Hour: script$6,
        Minutes: script$7
    },
    methods: {
        everyMonthDay: function everyMonthDay() {
            var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'1','1/1', '?','*'];
            this.$emit("change-val", val);
        },
        lastDayOfMonth: function lastDayOfMonth() {
            var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'L','*', '?','*'];
            this.$emit("change-val", val);
        },
        lastWeekDayOfMonth: function lastWeekDayOfMonth() {
            var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'LW','*', '?','*'];
            this.$emit("change-val", val);
        },
        oneDayBeforeEnd: function oneDayBeforeEnd() {
            var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'*','*', '?','*'];
            val[3] = "L-1";
            this.$emit("change-val", val);
        },
        dayBeforeEnd: function dayBeforeEnd(e) {
            var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),'*','*', '?','*'];
            val[3] = "L-" + (e.target.value);
            this.$emit("change-val", val);
        },
        onDayChange: function onDayChange(e) {
             if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
                var val = ['0',this.getValueByIndex(1), this.getValueByIndex(2),this.value[3],'1/1', '?','*'];
                val[3] = "" + (e.target.value);
                this.$emit("change-val", val);
            }
        },
        getValueByIndex: function getValueByIndex(index) {
            return this.value[index] === '*' ? '0' : this.value[index];
        },
        onAtHourChange: function onAtHourChange(e) {
            var val = this.value;
            val[2] = "" + (e.target.value);
            this.$emit("change-val", val);
        },
        onAtMinuteChange: function onAtMinuteChange(e) {
            var val = this.value;
            val[1] = "" + (e.target.value);
            this.$emit("change-val", val);
        }
    }
};

var _hoisted_1$2 = { className: "tab-pane" };
var _hoisted_2$2 = { className: "well-monthly well-small" };
var _hoisted_3$1 = ["checked"];
var _hoisted_4$1 = ["disabled", "value"];
var _hoisted_5 = { className: "well-monthly well-small" };
var _hoisted_6 = ["checked"];
var _hoisted_7 = { className: "mb well-small" };
var _hoisted_8 = ["checked"];
var _hoisted_9 = { className: "well-monthly well-small" };
var _hoisted_10 = ["checked"];
var _hoisted_11 = ["disabled", "value"];

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Hour = resolveComponent("Hour");
  var _component_Minutes = resolveComponent("Minutes");

  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createElementVNode("div", _hoisted_2$2, [
      createElementVNode("input", {
        type: "radio",
        onChange: _cache[0] || (_cache[0] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.everyMonthDay && $options.everyMonthDay.apply($options, args));
  }),
        value: "1",
        name: "MonthlyRadio",
        checked: $props.value[4] == '1/1'
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_3$1),
      createTextVNode(" " + toDisplayString(_ctx.$parent.translate('Day')) + " ", 1 /* TEXT */),
      createElementVNode("input", {
        disabled: $props.value[4] != '1/1',
        type: "number",
        value: this.value[3],
        onInput: _cache[1] || (_cache[1] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.onDayChange && $options.onDayChange.apply($options, args));
  })
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_4$1),
      createTextVNode(" " + toDisplayString(_ctx.$parent.translate('of every month(s)')), 1 /* TEXT */)
    ]),
    createElementVNode("div", _hoisted_5, [
      createElementVNode("input", {
        onChange: _cache[2] || (_cache[2] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.lastDayOfMonth && $options.lastDayOfMonth.apply($options, args));
  }),
        type: "radio",
        value: "2",
        name: "DailyRadio",
        checked: $props.value[3] == 'L'
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_6),
      createTextVNode(" " + toDisplayString(_ctx.$parent.translate('Last day of every month')), 1 /* TEXT */)
    ]),
    createElementVNode("div", _hoisted_7, [
      createElementVNode("input", {
        onChange: _cache[3] || (_cache[3] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.lastWeekDayOfMonth && $options.lastWeekDayOfMonth.apply($options, args));
  }),
        type: "radio",
        value: "3",
        name: "WeekRadio",
        checked: $props.value[3] == 'LW'
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_8),
      createTextVNode(" " + toDisplayString(_ctx.$parent.translate('On the last weekday of every month')), 1 /* TEXT */)
    ]),
    createElementVNode("div", _hoisted_9, [
      createElementVNode("input", {
        type: "radio",
        onInput: _cache[4] || (_cache[4] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.oneDayBeforeEnd && $options.oneDayBeforeEnd.apply($options, args));
  }),
        value: "4",
        name: "MonthlyRadio",
        checked: $props.value[3].startsWith('L-')
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_10),
      createElementVNode("input", {
        disabled: !$props.value[3].startsWith('L-'),
        type: "number",
        value: this.value[3].split('-')[1],
        onInput: _cache[5] || (_cache[5] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.dayBeforeEnd && $options.dayBeforeEnd.apply($options, args));
  })
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_11),
      createTextVNode(" " + toDisplayString(_ctx.$parent.translate('day(s) before the end of the month')), 1 /* TEXT */)
    ]),
    createElementVNode("span", null, toDisplayString(_ctx.$parent.translate('Start time')), 1 /* TEXT */),
    createVNode(_component_Hour, {
      disabled: $props.value[2].indexOf('/') != -1,
      onChange: $options.onAtHourChange,
      value: $props.value[2]
    }, null, 8 /* PROPS */, ["disabled", "onChange", "value"]),
    createVNode(_component_Minutes, {
      disabled: $props.value[2].indexOf('/') != -1,
      onChange: $options.onAtMinuteChange,
      value: $props.value[1]
    }, null, 8 /* PROPS */, ["disabled", "onChange", "value"])
  ]))
}

script$2.render = render$2;
script$2.__file = "src/lib/cron-tab/monthly.vue";

var script$1 = {
    props:['value'],
    methods: {
        onChange: function onChange(e) {
            var val = e.target.value.replace(/,/g, '!').split(" ");
            this.$emit("change-val", val);
        },
    }
};

var _hoisted_1$1 = { className: "well" };
var _hoisted_2$1 = ["value"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createTextVNode(toDisplayString(_ctx.$parent.translate('Cron Expression *')) + " ", 1 /* TEXT */),
    createElementVNode("input", {
      type: "text",
      onInput: _cache[0] || (_cache[0] = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return ($options.onChange && $options.onChange.apply($options, args));
  }),
      value: this.value.toString().replace(/,/g,' ').replace(/!/g, ',')
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$1)
  ]))
}

script$1.render = render$1;
script$1.__file = "src/lib/cron-tab/custom.vue";

var script = {
    components: {
        Minutes: script$8,
        Hourly: script$5,
        Daily: script$4,
        Weekly: script$3,
        Monthly: script$2,
        Custom: script$1
    },
    data: function data() {
        return {
            value: ['*','*','*','*','*','*','*'],
            headers:loadHeaders(this.options),
            selectedTab:loadHeaders(this.options)[0],
            metadata:metadata,
            headerValues:HEADER_VALUES
        };
    },
    props:['showResultCron', 'showResultText', 'options', 'translations', 'cron', 'locale'],
    methods: {
        getVal: function getVal() {
            var val = cronstrue.toString(this.value.toString().replace(/,/g,' ').replace(/!/g, ','), { throwExceptionOnParseError: false, locale: this.locale ? this.locale : 'en' });
            if(val.search('undefined') === -1) {
                return val;
            }
            return '-';   
        },
        translate: function translate(key) {
            return translateFn(key, this.translations)
        },
        changeTab: function changeTab(tab) {
            this.value = this.getDefaultVal(tab);
            this.selectedTab = tab;
            this.parentChange(this.value);
        },
        changeVal: function changeVal(val) {
            this.value = val;
            this.parentChange(val);
        },
        parentChange: function parentChange(val) {
            this.$emit('cron-change', this.getCronString(val));
        },
        getDefaultVal: function getDefaultVal(tab) {
            return this.metadata.find(function (me) { return me.name == tab; }).initialCron;
        },
        setTab: function setTab(tab) {
            var index = this.headers.indexOf(tab);
            if(index != -1) {
                this.selectedTab = tab;
            } else {
                this.selectedTab = HEADER_VALUES.CUSTOM;
            }
        },
        setValue: function setValue(value) {
            var val = value;
            if(val  && val.split(' ').length === 6) {
                val += ' *';
            }
            if(!val  || val.split(' ').length !== 7) {
                this.selectedTab = this.headers[0];
                this.value = this.getDefaultVal(this.headers[0]);
                this.parentChange(this.value);
                return;
            }
            val = val.replace(/,/g, '!').split(' ');
            if((val[1].search('/') !== -1) && (val[2] === '*')) {
                this.setTab(HEADER_VALUES.MINUTES);
            } else if((val[3] === '1/1')) {
                 this.setTab(HEADER_VALUES.HOURLY);
            } else if((val[3].search('/') !== -1) || (val[5] === 'MON-FRI')) {
                 this.setTab(HEADER_VALUES.DAILY);
            } else if (val[3] === '?') {
                this.setTab(HEADER_VALUES.WEEKLY);
            } else if (val[3].startsWith('L') || val[4] === '1/1') {
                this.setTab(HEADER_VALUES.MONTHLY);
            } else {
                 this.setTab(HEADER_VALUES.CUSTOM);
            }
            this.value = val;
        },
        getCronString: function getCronString(val) {
            var newVal = val.toString().replace(/,/g,' ');
            newVal = newVal.replace(/!/g, ',');
            return newVal;
        }
    },
    created: function created() {
        if(this.cron) {
            this.setValue(this.cron);
        }
        if(this.translations && !this.locale) {
            console.log('Warning !!! locale not set while using translations');
        }
    },
    watch: {
        cron: {
            immediate: true, 
            handler: function handler (val) {
                if(val && (val != this.getCronString(this.value))) {
                    this.setValue(this.cron);
                }
            }
        }
    }
};

var _hoisted_1 = { class: "cron_builder" };
var _hoisted_2 = { class: "nav nav-tabs" };
var _hoisted_3 = ["onClick"];
var _hoisted_4 = { className: "cron_builder_bordering" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Minutes = resolveComponent("Minutes");
  var _component_Hourly = resolveComponent("Hourly");
  var _component_Daily = resolveComponent("Daily");
  var _component_Weekly = resolveComponent("Weekly");
  var _component_Monthly = resolveComponent("Monthly");
  var _component_Custom = resolveComponent("Custom");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("ul", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.headers, function (d) {
        return (openBlock(), createElementBlock("li", {
          class: "nav-item",
          key: d
        }, [
          createElementVNode("a", {
            class: normalizeClass(["nav-link", $data.selectedTab == d ? 'active' : '']),
            onClick: function ($event) { return ($options.changeTab(d)); }
          }, toDisplayString($options.translate(d)), 11 /* TEXT, CLASS, PROPS */, _hoisted_3)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    createElementVNode("div", _hoisted_4, [
      ($data.selectedTab == $data.headerValues.MINUTES)
        ? (openBlock(), createBlock(_component_Minutes, {
            key: 0,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true),
      ($data.selectedTab == $data.headerValues.HOURLY)
        ? (openBlock(), createBlock(_component_Hourly, {
            key: 1,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true),
      ($data.selectedTab == $data.headerValues.DAILY)
        ? (openBlock(), createBlock(_component_Daily, {
            key: 2,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true),
      ($data.selectedTab == $data.headerValues.WEEKLY)
        ? (openBlock(), createBlock(_component_Weekly, {
            key: 3,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true),
      ($data.selectedTab == $data.headerValues.MONTHLY)
        ? (openBlock(), createBlock(_component_Monthly, {
            key: 4,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true),
      ($data.selectedTab == $data.headerValues.CUSTOM)
        ? (openBlock(), createBlock(_component_Custom, {
            key: 5,
            value: $data.value,
            onChangeVal: $options.changeVal
          }, null, 8 /* PROPS */, ["value", "onChangeVal"]))
        : createCommentVNode("v-if", true)
    ]),
    createCommentVNode(" <div className=\"cron-builder-bg\" v-if=\"showResultText\">\r\n                {{ getVal() }}\r\n            </div>\r\n            <div v-if=\"showResultCron\" className=\"cron-builder-bg\">\r\n                {{getCronString(value)}}\r\n            </div> ")
  ]))
}

script.render = render;
script.__file = "src/lib/cron.vue";

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('CronGeneratorVue', script);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export { script as default, install };
