import { readable, writable } from 'svelte/store';
import geoData from './data/geodata.json';
import networkData from './data/artists_200527.json';

export const VIEW = writable(undefined);
VIEW.set("Network");

export const VIEWMODE = writable(undefined);
VIEWMODE.set("Day");

export const selectedArtist = writable(undefined);
export const selectedArtistDetails = writable(undefined);

export const hoveredArtist = writable(undefined);
hoveredArtist.set(undefined);

export const GEODATA = writable(undefined);
GEODATA.set(geoData);

export const NETWORKDATA = writable(undefined);
NETWORKDATA.set(networkData);

export const MOUSE = writable(undefined);
MOUSE.set({ x: 0, y: 0});

export const LEGEND = writable(undefined);
LEGEND.set([
  {id: 1, label:  "Painting / Drawing / Collage" },
  {id: 2, label:  "Installation / Performance" },
  {id: 3, label:  "Music / Sound" },
  {id: 4, label:  "Photography / Film" },
  {id: 5, label:  "Conceptual art / Mixed media / Generative art" },
  {id: 6, label:  "Sculpture" },
  {id: 7, label:  "Writing" },
  {id: 8, label:  "Curator" },
]);

export const COLORS = writable(undefined);
COLORS.set({
  day: {
    network: "rgb(69, 69, 255)",
    circleDefault: "blue",
    circleSelected: "#D56285",
    circleBorder: "white",
    textDefault: "black",
    textHeading: "rgb(69, 69, 255)",
    textTooltip: "black",
    berlinMap: "#c7c7c7",
    berlinSbahn: "#3d3d3d",
    background: "white"
  }, 
  night: {
    network: "white",
    circleDefault: "white",
    circleSelected: "yellow",
    circleBorder: "rgb(51,51,51)",
    textDefault: "white",
    textHeading: "white",
    textTooltip: "black",
    berlinMap: "white",
    berlinSbahn: "white",
    background: "rgb(51,51,51)"
  }
});

export const NETWORKCOORDINATES = writable(undefined);
NETWORKCOORDINATES.set([{"x":304.2214464191955,"y":246.47348031716575},{"x":352.45677337962286,"y":277.25741441587417},{"x":334.29032601114505,"y":106.5403095526032},{"x":336.76987752272896,"y":386.3665616897251},{"x":517.2513704973719,"y":308.0102723220086},{"x":379.7662354972056,"y":296.16513019390845},{"x":336.8645869601694,"y":323.1877418376581},{"x":160.3296030847858,"y":323.4839238752326},{"x":307.21506869341937,"y":167.0225333420196},{"x":356.81880286031674,"y":236.96699751799258},{"x":293.42935882283354,"y":285.06463319543997},{"x":463.58071569012304,"y":344.6129336479496},{"x":358.1966790575072,"y":389.3255007110736},{"x":430.2134382275254,"y":259.54114868491587},{"x":452.2257221523686,"y":416.7282972019142},{"x":414.51317613635973,"y":289.00103469474226},{"x":344.0671614594547,"y":299.3976522531312},{"x":370.8549600464409,"y":201.32555181447677},{"x":390.8568391828198,"y":283.92292540273115},{"x":312.2266826449611,"y":283.0115672309146},{"x":215.50020087262263,"y":292.8121162747352},{"x":355.6450488405887,"y":401.4430594016069},{"x":287.1682727453687,"y":339.3677235671519},{"x":214.18767634781852,"y":159.88198302934117},{"x":478.14357247885,"y":269.1177803295982},{"x":210.48282640154596,"y":384.9849545162462},{"x":381.28954723600276,"y":316.7004787784855},{"x":276.6720687806241,"y":499.26760134120093},{"x":415.9070224526033,"y":90.28466690910938},{"x":311.05409332916923,"y":386.31471201039994},{"x":127.23415769414326,"y":311.919428440297},{"x":367.9551173318012,"y":289.45681943495424},{"x":440.99215305649426,"y":320.6998915062953},{"x":459.0934029235979,"y":106.84187118913366},{"x":359.4814944956735,"y":373.545766443375},{"x":384.6539082728168,"y":406.2387149577985},{"x":255.9274211858983,"y":241.2011279021365},{"x":317.4554680451304,"y":356.5121093616284},{"x":288.0900384633055,"y":191.06415657633096},{"x":329.05616781380724,"y":337.2936227298992},{"x":326.84583106952897,"y":509.9429413418283},{"x":450.641150158948,"y":300.5801755848706},{"x":360.2232978302813,"y":302.7995713345925},{"x":413.5719157018837,"y":242.75548944780047},{"x":342.62001878216864,"y":251.0061591758714},{"x":262.9243704567322,"y":266.7419921496053},{"x":347.6240979304144,"y":214.01630537732498},{"x":408.4083507934175,"y":324.07639934973037},{"x":182.8382926499058,"y":301.20109183234416},{"x":327.09082928767845,"y":79.84473137666942},{"x":389.48567030502016,"y":368.0977203149959},{"x":132.64634655272624,"y":232.26663592643817},{"x":331.2842476515074,"y":288.6101200799874},{"x":241.33958589624814,"y":365.3259570738459},{"x":181.22083483694047,"y":403.44676209747485},{"x":421.05047990709045,"y":250.68894840780936},{"x":176.68335657446528,"y":238.1208433120028},{"x":299.37083048803004,"y":236.48674440739012},{"x":435.9813122480491,"y":376.93937285760796},{"x":405.1083841261981,"y":269.2746168688292},{"x":282.364866846152,"y":305.9817039721168},{"x":424.6909803092713,"y":408.1563249737416},{"x":285.17914074119733,"y":95.21835154558312},{"x":194.1876158724629,"y":225.95867289526936},{"x":206.92670842924545,"y":195.60138492700142},{"x":326.2987725347043,"y":366.1755319417672},{"x":400.2541496639871,"y":301.05962979349806},{"x":316.4970728427964,"y":311.93539788532934},{"x":394.5125229746546,"y":206.39282099965632},{"x":397.57438995157736,"y":112.95865543372147},{"x":389.5030415870632,"y":243.70153982909403},{"x":398.1243452049357,"y":341.8491275643955},{"x":290.8729527091189,"y":361.9980944006327},{"x":530.3549516109739,"y":176.93271557155512},{"x":401.2349366687765,"y":387.1169822163436},{"x":249.16005049053604,"y":111.35629731992549},{"x":486.7735517365049,"y":345.94773371950936},{"x":222.62468331908738,"y":315.40785626111966},{"x":504.67081897959594,"y":147.13645674603276},{"x":460.8360840754953,"y":495.1602275607294},{"x":250.7833844860549,"y":304.6520441611576},{"x":471.64753007216666,"y":254.47601805270077},{"x":450.30899542021297,"y":258.15213807987885},{"x":233.35552395509444,"y":244.5570343412106},{"x":421.6913174199976,"y":308.2795741065524},{"x":338.8222265979592,"y":344.7836968655987},{"x":347.6483678897523,"y":266.11182818932696},{"x":383.8357711566379,"y":343.79355477517913},{"x":193.1292841605279,"y":431.16479990665374},{"x":210.99788689554487,"y":257.1442186838693},{"x":330.05405043768167,"y":303.78246880416856},{"x":309.0287674544367,"y":324.7356712411382},{"x":279.19163780227456,"y":427.08368841269566},{"x":283.07889265213953,"y":144.56498204091486},{"x":406.33490595870984,"y":372.05735219397013},{"x":377.36183536482554,"y":376.7511324700355},{"x":170.58203215418115,"y":335.2025352802451},{"x":231.60986326310652,"y":411.4188098780138},{"x":371.63384476338354,"y":329.7502769500956},{"x":428.3915734359229,"y":118.80321483779673},{"x":391.0637681269468,"y":513.2857281164188},{"x":177.72150120845214,"y":160.29620792649158},{"x":363.93372085058274,"y":261.85000006712386},{"x":458.13919343361925,"y":356.55172600558825},{"x":418.55302308610203,"y":381.13649872193093},{"x":434.30239814414796,"y":340.17024802927},{"x":358.0494863596488,"y":347.22510258815316},{"x":475.2169159777748,"y":132.7774522396907},{"x":257.6447424124979,"y":411.6012197311297},{"x":274.61229154164835,"y":225.43743557532787},{"x":475.4789445849562,"y":311.0116027394513},{"x":149.9281933234414,"y":254.27268226157463},{"x":344.2102045715758,"y":175.03618609021814},{"x":474.3488330441526,"y":408.66894371138613},{"x":400.1693693170873,"y":434.58335896326537},{"x":219.55787110484636,"y":218.3776780937368},{"x":253.67402989734728,"y":430.11294703790145},{"x":514.8517416844762,"y":289.1248111015338},{"x":577.2534982272755,"y":325.65300781252483},{"x":269.50986748563014,"y":393.5993956694765},{"x":435.1696576900927,"y":283.3160034169725},{"x":464.54940402569173,"y":368.14948346684156},{"x":223.7256421526287,"y":338.96167276459363},{"x":494.9028466858828,"y":393.0164627907652},{"x":362.4865673120414,"y":357.370993527975},{"x":370.225642804549,"y":84.13283585680047},{"x":465.2426245135376,"y":331.63961826296617},{"x":472.7488083886785,"y":420.6969266138588},{"x":353.12961633134483,"y":330.8753047295865},{"x":393.4624500524393,"y":313.93895864276567},{"x":426.43987070672244,"y":225.99346407732432},{"x":418.6702109644369,"y":340.3232760590733}]);