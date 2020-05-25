import { writable } from 'svelte/store';
import geoData from './data/geodata.json';
import networkData from './data/artists_200525.json';

export const VIEW = writable(undefined);
VIEW.set("Network");

export const selectedArtist = writable(undefined);
export const selectedArtistDetails = writable({});

export const hoveredArtist = writable(undefined);
hoveredArtist.set(undefined);

export const GEODATA = writable(undefined);
GEODATA.set(geoData);

export const NETWORKDATA = writable(undefined);
NETWORKDATA.set(networkData);

export const MOUSE = writable(undefined);
MOUSE.set({ x: 0, y: 0});

export const NETWORKCOORDINATES = writable(undefined);
NETWORKCOORDINATES.set([{"x":324.797477886407,"y":275.4560095353061},{"x":378.59387285468756,"y":283.06031671330595},{"x":303.57669566020644,"y":129.2636934267305},{"x":346.51267240019865,"y":350.9815377680766},{"x":467.8207214370328,"y":309.1448670464625},{"x":373.62475532719674,"y":289.5703013926098},{"x":338.8155444535707,"y":313.4758276783061},{"x":229.5526037133656,"y":349.80812331228805},{"x":302.0379898107636,"y":228.51427507095735},{"x":376.04331291501245,"y":269.4174366905792},{"x":342.7043285979643,"y":276.287293718057},{"x":434.3164480006232,"y":326.2422724334007},{"x":382.3526405257502,"y":384.4347761972072},{"x":418.0505062305907,"y":287.6520005328351},{"x":417.77519474230826,"y":382.59315789264275},{"x":377.44692013537934,"y":329.19191689931955},{"x":345.45203796055813,"y":322.02419238206517},{"x":418.98320383019274,"y":280.9500362078091},{"x":386.9318253809736,"y":302.4436148654052},{"x":396.7038046004464,"y":277.48862234332455},{"x":275.79431645568224,"y":312.5412004058614},{"x":340.33548001490846,"y":346.02811737257946},{"x":342.95261248622455,"y":340.0934954364892},{"x":231.974442569381,"y":219.70174631383952},{"x":422.2541920994927,"y":262.754507028251},{"x":242.8331843607979,"y":329.0557622170468},{"x":377.6621236333528,"y":301.8088974904283},{"x":256.25831662739785,"y":501.4731226206644},{"x":367.95383262895507,"y":70.34700336398384},{"x":350.62277334090885,"y":320.20431471208286},{"x":127.19725477086703,"y":334.64187959887147},{"x":383.7901555093742,"y":294.0996913364562},{"x":380.74712055310346,"y":359.0347566568463},{"x":386.4937353326248,"y":86.46433359074578},{"x":365.91604998919837,"y":337.6793204032452},{"x":368.65800050170884,"y":364.4400139842341},{"x":329.5323098097313,"y":239.265510511429},{"x":365.13403905874446,"y":351.15255202035996},{"x":288.8550331452135,"y":254.3033715686777},{"x":354.55854664218253,"y":332.8571842609869},{"x":306.7592418076525,"y":525.0561841069308},{"x":409.7662271055879,"y":315.31209508078643},{"x":378.1075725375265,"y":311.74053903657625},{"x":364.5300369661846,"y":319.0436408835468},{"x":356.2944144115474,"y":273.48445081759604},{"x":328.15947932207035,"y":341.96972419284145},{"x":329.3803199784934,"y":286.4197600292081},{"x":407.0974815428258,"y":321.6340475988321},{"x":257.2744215269269,"y":363.7077670283679},{"x":291.90078725513973,"y":71.68574434117915},{"x":386.0044525456113,"y":339.45204893358664},{"x":112.06199113749332,"y":302.62104656548775},{"x":371.43143006260925,"y":284.3242324852785},{"x":277.2374507844261,"y":322.8034905915969},{"x":229.364309208224,"y":302.3713607623049},{"x":408.931467444146,"y":275.68661090831915},{"x":253.66084366706193,"y":298.97353999630826},{"x":307.7292464822663,"y":263.93517684493537},{"x":403.3387218132297,"y":351.30103470085317},{"x":364.7470114036,"y":297.51775704428155},{"x":327.3812912808563,"y":292.6507944812435},{"x":398.1603131174122,"y":370.6558336119561},{"x":248.4885985185924,"y":81.82909165810214},{"x":278.6292648768209,"y":247.63373758786977},{"x":254.18257182255337,"y":245.32327047947106},{"x":371.5428661879105,"y":335.2333124362387},{"x":413.14644301216293,"y":328.54444473271286},{"x":354.3715100829362,"y":301.90873902835165},{"x":431.11428351912764,"y":303.83812014632645},{"x":321.6435395660332,"y":103.37263136144051},{"x":366.2284748299328,"y":274.28433335788793},{"x":377.2389833077872,"y":351.23930225562924},{"x":323.82478815959365,"y":325.0325998135827},{"x":529.1137824633993,"y":128.33881524416293},{"x":351.87321825715634,"y":357.6349649208279},{"x":204.5816100640531,"y":103.84300095804966},{"x":430.03466015805066,"y":330.1090852622177},{"x":282.8966063691969,"y":335.12997783601685},{"x":428.51870764601074,"y":56.99736518420075},{"x":468.7612481625339,"y":513.5447630829224},{"x":308.698628367188,"y":317.54941295130067},{"x":429.8600453212758,"y":269.2447603233501},{"x":350.626451402155,"y":309.06809651677844},{"x":317.1079593611609,"y":374.18226433236055},{"x":389.99155442340134,"y":347.2231933970688},{"x":356.5983863180342,"y":344.26511463778104},{"x":371.3153690907349,"y":272.6377527141475},{"x":388.363413344093,"y":318.32374883938013},{"x":215.1667651952855,"y":326.94685828087773},{"x":282.78940048216526,"y":279.95742946887736},{"x":345.16782276585263,"y":314.15394872785004},{"x":365.810359831203,"y":283.6316838544645},{"x":309.3243954302441,"y":363.91345275776854},{"x":269.01944999391776,"y":220.56186595670317},{"x":396.6724811162887,"y":301.3829105823378},{"x":390.1866522979072,"y":364.28159130392424},{"x":225.65702312614752,"y":374.54684530016203},{"x":265.50387173710635,"y":335.29007676958395},{"x":361.6779924333938,"y":313.07010617619375},{"x":351.05951183236203,"y":95.57753449725766},{"x":426.2338613708762,"y":538.811036770415},{"x":134.93328588332128,"y":173.4730185074355},{"x":390.86119282136474,"y":311.6884709590746},{"x":433.43452596048576,"y":336.17433114692636},{"x":372.3911232172845,"y":348.25798422617896},{"x":397.8120014247602,"y":322.4441056124742},{"x":353.79054950830835,"y":337.7184004193949},{"x":416.7495815179117,"y":89.10505856226152},{"x":289.5400475564451,"y":362.1155120794676},{"x":315.7939940314763,"y":247.093552161241},{"x":434.3884587126167,"y":309.661175117282},{"x":245.6932781687569,"y":330.6196140284514},{"x":341.6719391866605,"y":237.6695361923277},{"x":413.24195448937087,"y":389.679965237252},{"x":334.66033032912185,"y":387.1843089729594},{"x":294.15410884846295,"y":245.8805260129175},{"x":274.4774560658719,"y":364.68008179120005},{"x":466.4241737729131,"y":298.3204007309922},{"x":590.83314372912,"y":397.23111712013144},{"x":298.2027834467628,"y":340.8499723738901},{"x":403.7299845303236,"y":291.825653992615},{"x":425.519783002516,"y":347.72189880776796},{"x":281.30523763019835,"y":291.7477583938672},{"x":436.27031772866695,"y":372.9084146914974},{"x":380.8346565382206,"y":337.5686753051612},{"x":343.67949847988757,"y":32.21108136737662},{"x":432.054834826219,"y":343.6473322096152},{"x":443.28190931717813,"y":349.6124352532885},{"x":362.86966282448384,"y":327.98369889142975},{"x":388.7804230995015,"y":335.274281611064},{"x":355.8265354440416,"y":264.0390165766176},{"x":399.74641301020375,"y":330.087385933038}]);



