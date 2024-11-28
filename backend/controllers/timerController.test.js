const Timer = require('../models/RepoTimer');
const getForkTime = require('../utils/getForkTime');
const AppError = require('../utils/AppError');
const { startTimer ,completeTimer} = require('../controllers/timerController');
const httpMocks = require('node-mocks-http');

jest.mock('../models/RepoTimer');
jest.mock('../utils/getForkTime');

describe('startTimer Controller', () => {
  const username = 'sudheer416';
  const repo = 'buildTimerLogger';
  const owner = 'sudheer416';
  const accessToken="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"


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new timer and return it if repo is not present', async () => {
    const mockForkTime = {
      repo: repo,
      startTime: '2024-11-28T00:00:00Z',
    };

    getForkTime.mockResolvedValue(mockForkTime);
    Timer.find.mockResolvedValue([]); // Simulate no existing repo in the database

    const mockSave = jest.fn().mockResolvedValue({
      repo_name: mockForkTime.repo,
      assessment_start_time: new Date(mockForkTime.startTime).toISOString(),
    });

    // Mock Timer constructor to use save
    Timer.mockImplementation(() => ({
      save: mockSave,
    }));
    const timerInstance = new Timer({
        repo_name: 'buildTimerLogger',
        assessment_start_time: new Date('2024-11-28T00:00:00Z'),
      });
     
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {},
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

   const r= await startTimer(req, res, next);
 
    console.log("sdsdsdsd",await getForkTime(owner, repo, username, accessToken)); // Mocked value
    console.log( "ddd",await Timer.find({ repo_name: mockForkTime.repo }));    // Mocked value


    expect(getForkTime).toHaveBeenCalledWith(owner, repo, username, accessToken);
    expect(Timer.find).toHaveBeenCalledWith({ repo_name: mockForkTime.repo });
    const result = await timerInstance.save();
    
     expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual({
    repo_name: 'buildTimerLogger',
    assessment_start_time: '2024-11-28T00:00:00.000Z',
  });
  });

  it('should throw an error if the repo is already present', async () => {
    const mockForkTime = {
      repo: repo,
      startTime: '2024-11-28T00:00:00Z',
    };

    getForkTime.mockResolvedValue(mockForkTime);
    Timer.find.mockResolvedValue([{ repo_name: mockForkTime.repo }]); // Simulate an existing repo

    const req = httpMocks.createRequest({
      method: 'POST',
      body: {},
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    const re=await startTimer(req, res, next);
    console.log("2222...",re)

    expect(getForkTime).toHaveBeenCalledWith(owner, repo, username, expect.any(String));
    expect(Timer.find).toHaveBeenCalledWith({ repo_name: mockForkTime.repo });
    expect(next).toHaveBeenCalledWith(expect.any(AppError));

    const error = next.mock.calls[0][0];
    expect(error.message).toBe('Project already started');
    expect(error.statusCode).toBe(400);
  });

  it('should call next with an error if getForkTime fails', async () => {
    const mockError = new Error('Failed to fetch fork time');

    getForkTime.mockRejectedValue(mockError);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: {},
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await startTimer(req, res, next);

    expect(getForkTime).toHaveBeenCalledWith(owner, repo, username, expect.any(String));
    expect(next).toHaveBeenCalledWith(mockError);
  });
});

describe('completeTimer Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should complete the timer for a valid repo', async () => {
        const mockTimer = {
          repo_name: 'buildTimerLogger',
          assessment_start_time: new Date('2024-11-28T00:00:00Z'),
          assessment_end_time: null,
          save: jest.fn().mockResolvedValue(true),
        };
      
        // Mock Timer.findOne to return mockTimer
        Timer.findOne.mockResolvedValue(mockTimer);
      
        const req = httpMocks.createRequest({
          method: 'POST',
          body: { repo: 'buildTimerLogger' },
        });
      
        const res = httpMocks.createResponse();
        const next = jest.fn();
      
        await completeTimer(req, res, next);
      
        // Debugging: Check if Timer.findOne was called
        console.log('Timer.findOne calls:', Timer.findOne.mock.calls);
      
        expect(Timer.findOne).toHaveBeenCalledWith({ repo_name: 'buildTimerLogger' });
        expect(mockTimer.assessment_end_time).not.toBeNull(); // Ensure end time is updated
        expect(mockTimer.save).toHaveBeenCalled(); // Ensure save was called
      
        // Debugging: Check if mockTimer.save was called
        console.log('mockTimer.save calls:', mockTimer.save.mock.calls);
      
        expect(res.statusCode).toBe(200);
      
        const data = res._getJSONData();
        expect(data.repo_name).toBe('buildTimerLogger');
        expect(new Date(data.assessment_end_time)).not.toBeNaN(); // Check valid date
      });
      
    
    
})