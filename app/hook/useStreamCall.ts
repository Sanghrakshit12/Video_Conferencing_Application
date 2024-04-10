import { useCall } from "@stream-io/video-react-sdk"

export default function useStreamCall() {
    const call = useCall()
    if (!call) {
        throw new Error("useStreamCall Must be Used in a Streamcall Component with a Valid Call Prop.")
    }
    return call;
}