import { ProgressCircle } from './ProgressCircle.jsx';

export function Dashboard({ rooms, isLoggedIn, loadingRooms, overallProgress, isMobile = false }) {
  if (isMobile) {
    return (
      <>
        <h3 className="text-[22pt] font-bold mt-2 mb-2">Dashboard</h3>
        <div className="bg-[#FAF6E3] rounded-[1rem] p-3 flex flex-row gap-2 mb-4 items-stretch">
          <div className="flex-1 flex flex-col min-w-0 pr-2">
            <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: '150px' }}>
              {rooms.length > 0 ? (
                rooms.map((room, idx) => (
                  <div key={room._id || idx} className="flex flex-col">
                    <span className="font-semibold text-[#58482D] text-[11pt] mb-1">{room.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#D0C3A4] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${room.progress || 0}%`,
                            background:
                              idx === 0
                                ? '#A05C4E'
                                : idx === 1
                                ? '#A08B6D'
                                : idx === 2
                                ? '#4E7A5C'
                                : '#8D7C5F',
                            transition: 'width 0.5s'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-[#58482D] font-bold">{room.progress || 0}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center">Login to see your tasks progress</div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pl-2 min-w-[120px]">
            <ProgressCircle percent={overallProgress} size="large" />
            <span className="text-[13pt] font-bold text-[#58482D] mt-1">Overall</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col w-[50vw]">
      <h3 className="text-[36pt] font-bold mt-0 mb-4">Dashboard</h3>
      <div className="flex flex-row h-[33vh] bg-[#FAF6E3] rounded-[1rem]">
        <div className="w-[85%] p-4 flex flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto pr-2">
            {!isLoggedIn ? (
              <div className="text-gray-500 text-center mt-8">Login to see your tasks progress</div>
            ) : loadingRooms ? (
              <div>Loading...</div>
            ) : rooms.length === 0 ? (
              <div className="text-gray-500">No rooms found</div>
            ) : (
              rooms.map(room => (
                <div key={room._id} className="mb-4 p-3 bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[#58482D]">{room.name}</span>
                    <span className="text-sm text-gray-600">{room.progress || 0}%</span>
                  </div>
                  <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-500" 
                      style={{ width: `${room.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center h-full">
          <ProgressCircle percent={overallProgress} size="large" />
          <div className="mt-2 text-[26pt] font-bold text-[#58482D]">Overall</div>
        </div>
      </div>
    </div>
  );
} 