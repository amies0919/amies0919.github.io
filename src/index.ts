import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from '@babel/core'
import * as fs from 'fs'
import * as path from 'path'
import * as options from './webpack.config'

interface Options{
    entry: string;
    output: any;
    moudles?: any[]
}
interface buildI {
    filename: string;
    dependecies: any;
    code: any;
}
const Parser = {
  getAst: (path: string)=> {
    const content = fs.readFileSync(path, 'utf-8')
    return parser.parse(content, {
        sourceType: 'module'
    })
  },
  getDependecies: (ast:any , filename: any) => {
   const dependecies = {}
    // 遍历所有的 import 模块,存入dependecies
    traverse(ast, {
      // 类型为 ImportDeclaration 的 AST 节点 (即为import 语句)
      ImportDeclaration({ node }) {
        const dirname = path.dirname(filename)
        // 保存依赖模块路径,之后生成依赖关系图需要用到
        const filepath = '../node_modules/' + path.join(dirname, node.source.value)
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: (ast) => {
    const { code } = transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return code
  }  
  
}
class complile {
    entry: string
    output: any
    moudles: any[];
    info: buildI;
    constructor(options: Options){
        const { entry, output } = options
        this.entry = entry
        this.output = output
        this.moudles = []

    }
    run(){
        this.info = this.build(this.entry)
        this.moudles.push(this.info)
        this.moudles.forEach(({ dependecies })=>{
            if(!dependecies) return
            for(const dependecie in dependecies){
                this.moudles.push(this.build(dependecies[dependecie]))
            }

        })
        const dependencyGraph = this.moudles.reduce((graph, item)=>({
            ...graph,
            [item.filename]: {
                dependecies: item.dependecies,
                code: item.code
            }
        }), {})
        this.generate(dependencyGraph)
    }
    build(filename): buildI{
        const ast = Parser.getAst(filename)
        const dependecies = Parser.getDependecies(ast, filename)
        const code = Parser.getCode(ast)
        return {
            filename,
            dependecies,
            code
        }
    }
    generate(code){
        console.log(code)
        const outputPath = path.join(this.output.path, this.output.filename)
        const bundle = `(function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].dependecies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,graph[module].code);
                return exports;
            }
            require('${this.entry}')
        })(${JSON.stringify(code)})`
        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }
}

new complile(options).run()
