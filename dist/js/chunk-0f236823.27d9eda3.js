(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f236823"],{"553f":function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"config"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"email"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"author"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:50}};i.loc.source={body:"query {\r\n  config {\r\n    email\r\n    author\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach(function(e){t(e,n)}),e.variableDefinitions&&e.variableDefinitions.forEach(function(e){t(e,n)}),e.definitions&&e.definitions.forEach(function(e){t(e,n)})}var a={};(function(){i.definitions.forEach(function(e){if(e.name){var n=new Set;t(e,n),a[e.name.value]=n}})})(),e.exports=i},"97c2":function(e,n,i){"use strict";i.r(n);var t=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[e._v("\n\t\t这是graphql请求\n\t\t"),t("ApolloQuery",{attrs:{query:i("553f")},scopedSlots:e._u([{key:"default",fn:function(n){var i=n.result,a=i.loading,o=i.error,r=i.data;return[a?t("div",{staticClass:"loading apollo"},[e._v("Loading...")]):o?t("div",{staticClass:"error apollo"},[e._v("An error occured")]):r?t("div",{staticClass:"result apollo"},[e._v("graphql: "+e._s(r))]):t("div",{staticClass:"no-result apollo"},[e._v("No result :(")])]}}])})],1)},a=[],o={name:"demo"},r=o,l=i("2877"),s=Object(l["a"])(r,t,a,!1,null,null,null);n["default"]=s.exports}}]);