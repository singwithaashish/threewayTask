

interface MessageProps {
    message: {
        from: string;
        to: string;
        content: string;
    };
    user: {
        _id: string;
        name: string;
        email: string;
        isManufacturer: boolean;
        address: string;
    };
}


export default function Message(
    { message, user }: MessageProps
) {
  return (
    <div className="bg-gray-100 p-2 rounded-lg">
      <div className="flex justify-between">
        <div className="text-gray-500">{message.from}</div>
        <div className="text-gray-500">{message.to}</div>
      </div>
      <div className="text-gray-900">{message.content}</div>
    </div>

  )
}
