import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Website {
  url: string;
  status: string;
  history: { timestamp: string; status: string }[];
}

interface UpdateData {
  websites: Website[];
  timestamp: string;
}

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [timestamp, setTimestamp] = useState<string>("N/A");

  useEffect(() => {
    socket.on("update", (data: UpdateData) => {
      setWebsites(data.websites);
      setTimestamp(data.timestamp);
    });

    return () => {
      socket.off("update");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Website Monitoring</h1>
      <p className="text-gray-500">Last updated: {timestamp}</p>
      <ul>
        {websites.map((website) => (
          <li
            key={website.url}
            className={`flex flex-col mb-4 p-4 border ${
              website.status === "Online"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`status-circle w-3 h-3 rounded-full mr-2 ${
                  website.status === "Online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <strong>{website.url}:</strong> {website.status}
            </div>
            <div className="mt-2 flex flex-wrap">
              {website.history.map((entry, index) => (
                <span
                  key={index}
                  className={`history-square w-3 h-3 inline-block mr-1 mb-1 ${
                    entry.status === "Online" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
