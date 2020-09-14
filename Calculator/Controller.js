const parseelements = [
   [false,   (vars)=>{return true},   (vars)=>{return  calculateAll([vars[0]. split(" "),[]]). reverse()}],
];

var parsecache = [];

/***/
function parse(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, parseelements, parsecache);
}

function mapparse(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return parse(currentVariables);
   }).filter(x => x != null);
}

function htmlparse(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(parse(variables));
}


const calculateAllelements = [
   [false,   (vars)=>{return vars[0]. length==0&&true},   (vars)=>{return vars[1]}],
   [false,   (vars)=>{return true},   (vars)=>{var  newText=vars[0]. slice(0,vars[0]. length-1); var  newStack= calculateSingle([vars[0][vars[0]. length-1],vars[1]]); return  calculateAll([ newText, newStack])}],
];

var calculateAllcache = [];

/***/
function calculateAll(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, calculateAllelements, calculateAllcache);
}

function mapcalculateAll(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return calculateAll(currentVariables);
   }).filter(x => x != null);
}

function htmlcalculateAll(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(calculateAll(variables));
}


const splitStack1elements = [
   [false,   (vars)=>{return true},   (vars)=>{var  stackHead=vars[0]. slice(0,vars[0]. length-1); var  argA=vars[0][vars[0]. length-1]; return [ stackHead, argA]}],
];

var splitStack1cache = [];

/***/
function splitStack1(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, splitStack1elements, splitStack1cache);
}

function mapsplitStack1(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return splitStack1(currentVariables);
   }).filter(x => x != null);
}

function htmlsplitStack1(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(splitStack1(variables));
}


const splitStack2elements = [
   [false,   (vars)=>{return true},   (vars)=>{var  stackHead=vars[0]. slice(0,vars[0]. length-2); var  argA=vars[0][vars[0]. length-1]; var  argB=vars[0][vars[0]. length-2]; return [ stackHead, argA, argB]}],
];

var splitStack2cache = [];

/***/
function splitStack2(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, splitStack2elements, splitStack2cache);
}

function mapsplitStack2(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return splitStack2(currentVariables);
   }).filter(x => x != null);
}

function htmlsplitStack2(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(splitStack2(variables));
}


const calculateSingleelements = [
   [false,   (vars)=>{return vars[0]=="+"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( argA+ argB)}],
   [false,   (vars)=>{return vars[0]=="-"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( argA- argB)}],
   [false,   (vars)=>{return vars[0]=="*"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( argA* argB)}],
   [false,   (vars)=>{return vars[0]=="/"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( argA/ argB)}],
   [false,   (vars)=>{return vars[0]=="%"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( argA% argB)}],
   [false,   (vars)=>{return vars[0]=="^"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat( Math. pow( argA, argB))}],
   [false,   (vars)=>{return vars[0]=="::"&&true},   (vars)=>{var [ stackHead, argA, argB]= splitStack2([vars[1]]); return  stackHead.concat([ genList([ argA, argB])])}],
   [false,   (vars)=>{return vars[0]==":"&&true},   (vars)=>{return [vars[1]. reverse()]}],
   [false,   (vars)=>{return vars[0]==".+"&&true},   (vars)=>{var [ stackHead, argA]= splitStack1([vars[1]]); return  stackHead.concat(salSum( argA))}],
   [false,   (vars)=>{return vars[0]==".*"&&true},   (vars)=>{var [ stackHead, argA]= splitStack1([vars[1]]); return  stackHead.concat(salProduct( argA))}],
   [false,   (vars)=>{return vars[0]. startsWith(":(")&&vars[0]. endsWith(")")&&true},   (vars)=>{var  f= new Function("x","return "+vars[0]. substring(2,vars[0]. length-1)); var [ stackHead, argA]= splitStack1([vars[1]]); return  stackHead.concat( mapFunction([ f, argA]))}],
   [false,   (vars)=>{return vars[0]. startsWith(".(")&&vars[0]. endsWith(")")&&true},   (vars)=>{var  f= new Function("x, y","return "+vars[0]. substring(2,vars[0]. length-1)); var [ stackHead, argA]= splitStack1([vars[1]]); return  stackHead.concat( reduceFunction([ f, argA]))}],
   [false,   (vars)=>{return true},   (vars)=>{return vars[1].concat( parseFloat(vars[0]))}],
];

var calculateSinglecache = [];

/***/
function calculateSingle(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, calculateSingleelements, calculateSinglecache);
}

function mapcalculateSingle(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return calculateSingle(currentVariables);
   }).filter(x => x != null);
}

function htmlcalculateSingle(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(calculateSingle(variables));
}


const genListelements = [
   [false,   (vars)=>{return true},   (vars)=>{return salListGenerator(vars[0],vars[1])}],
];

var genListcache = [];

/***/
function genList(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, genListelements, genListcache);
}

function mapgenList(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return genList(currentVariables);
   }).filter(x => x != null);
}

function htmlgenList(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(genList(variables));
}


const mapFunctionelements = [
   [false,   (vars)=>{return vars[1]. length},   (vars)=>{return [vars[1]. map(vars[0])]}],
   [false,   (vars)=>{return true},   (vars)=>{return [vars[1]]. map(vars[0])}],
];

var mapFunctioncache = [];

/***/
function mapFunction(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, mapFunctionelements, mapFunctioncache);
}

function mapmapFunction(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return mapFunction(currentVariables);
   }).filter(x => x != null);
}

function htmlmapFunction(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(mapFunction(variables));
}


const reduceFunctionelements = [
   [false,   (vars)=>{return vars[1]. length==2},   (vars)=>{return vars[0](vars[1][1],vars[1][0])}],
   [false,   (vars)=>{return true},   (vars)=>{var [ stackHead, argA]= splitStack1([vars[1]]); return vars[0]( argA, reduceFunction([vars[0], stackHead]))}],
];

var reduceFunctioncache = [];

/***/
function reduceFunction(variables){
   if(typeof(variables) != "object") variables = [variables];
   return salfunction(variables, reduceFunctionelements, reduceFunctioncache);
}

function mapreduceFunction(variables){
   return variables.shift().map(variable => {
      var currentVariables = variables.slice(0, variables.length);
      currentVariables.unshift(variable);
      return reduceFunction(currentVariables);
   }).filter(x => x != null);
}

function htmlreduceFunction(HTMLelement, variables) {
   HTMLelement.innerHTML = JSON.stringify(reduceFunction(variables));
}


