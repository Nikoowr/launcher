export enum GameDownloadStatusEnum {
  Checking = 'download-check',
  Downloading = 'downloading-game-zip',
  Extracting = 'extracting-game-zip',
  Done = 'download-and-extract-done',
}

export enum GameUpdateStatusEnum {
  Checking = 'update-check',
  Downloading = 'downloading-updates',
  Updating = 'updating',
  Done = 'update-done',
}

export enum GameFilesEnum {
  Connects = 'connects.ini',
  Connect = 'connect.ini',
  GameInfo = 'game.json',
}

export enum GameUpdaterActionsEnum {
  Modified = 'M',
  Deleted = 'D',
  Added = 'A',
}
