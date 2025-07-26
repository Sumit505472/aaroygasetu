import { useEffect } from "react";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const { appointmentId } = useParams();

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: `ArogyaMithra-${appointmentId}`,
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
      configOverwrite: {},
      interfaceConfigOverwrite: {},
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    return () => api.dispose(); // Clean up
  }, [appointmentId]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Video Call</h2>
      <div id="jitsi-container" style={{ height: "600px" }}></div>
    </div>
  );
};

export default VideoCall;
