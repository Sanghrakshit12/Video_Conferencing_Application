import useStreamCall from "@/app/hook/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

export default function EndCallButton(){
const call=useStreamCall()
const {useLocalParticipant}=useCallStateHooks()

const localParticipant=useLocalParticipant()
const channelOwner=localParticipant && call.state.createdBy && localParticipant.userId===call.state.createdBy.id
if(!channelOwner){
return null
}
return <button className="mx-auto block font-medium text-red-500 hover:underline" onClick={()=>{
    call.endCall
    call.camera.disable()
    call.microphone.disable()
}}>End Call For Everyone</button>
}