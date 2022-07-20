"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var parser = require("@babel/parser");
var traverse_1 = require("@babel/traverse");
var core_1 = require("@babel/core");
var fs = require("fs");
var path = require("path");
var options = require("./webpack.config");
var Parser = {
    getAst: function (path) {
        var content = fs.readFileSync(path, 'utf-8');
        return parser.parse(content, {
            sourceType: 'module'
        });
    },
    getDependecies: function (ast, filename) {
        var dependecies = {};
        // 遍历所有的 import 模块,存入dependecies
        (0, traverse_1["default"])(ast, {
            // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
            ImportDeclaration: function (_a) {
                var node = _a.node;
                var dirname = path.dirname(filename);
                // 保存依赖模块路径,之后生成依赖关系图需要用到
                var filepath = '../node_modules/' + path.join(dirname, node.source.value);
                dependecies[node.source.value] = filepath;
            }
        });
        return dependecies;
    },
    getCode: function (ast) {
        var code = (0, core_1.transformFromAst)(ast, null, {
            presets: ['@babel/preset-env']
        }).code;
        return code;
    }
};
var complile = /** @class */ (function () {
    function complile(options) {
        var entry = options.entry, output = options.output;
        this.entry = entry;
        this.output = output;
        this.moudles = [];
    }
    complile.prototype.run = function () {
        var _this = this;
        this.info = this.build(this.entry);
        this.moudles.push(this.info);
        this.moudles.forEach(function (_a) {
            var dependecies = _a.dependecies;
            if (!dependecies)
                return;
            for (var dependecie in dependecies) {
                _this.moudles.push(_this.build(dependecies[dependecie]));
            }
        });
        var dependencyGraph = this.moudles.reduce(function (graph, item) {
            var _a;
            return (__assign(__assign({}, graph), (_a = {}, _a[item.filename] = {
                dependecies: item.dependecies,
                code: item.code
            }, _a)));
        }, {});
        this.generate(dependencyGraph);
    };
    complile.prototype.build = function (filename) {
        var ast = Parser.getAst(filename);
        var dependecies = Parser.getDependecies(ast, filename);
        var code = Parser.getCode(ast);
        return {
            filename: filename,
            dependecies: dependecies,
            code: code
        };
    };
    complile.prototype.generate = function (code) {
        console.log(code);
        var outputPath = path.join(this.output.path, this.output.filename);
        var bundle = "(function(graph){\n            function require(module){\n                function localRequire(relativePath){\n                    return require(graph[module].dependecies[relativePath])\n                }\n                var exports = {};\n                (function(require,exports,code){\n                    eval(code)\n                })(localRequire,exports,graph[module].code);\n                return exports;\n            }\n            require('".concat(this.entry, "')\n        })(").concat(JSON.stringify(code), ")");
        fs.writeFileSync(outputPath, bundle, 'utf-8');
    };
    return complile;
}());
new complile(options).run();
