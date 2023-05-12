import {syncCallback} from "./sync";
import {createTimeDrivenTriggers} from "./triggers";
import {checkConfig, logAllCalIds} from "./calendar";

checkConfig()

createTimeDrivenTriggers();
syncCallback();
if (process.env.DO_CAL_LOG !== "false"){
    logAllCalIds()
}
