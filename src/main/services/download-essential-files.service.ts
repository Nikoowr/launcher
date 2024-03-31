import {
  DownloadEssentialFilesService as DownloadEssentialFilesServiceInterface,
  FileConfig,
} from '../interfaces';

type EssentialFile = {
  directory: string;
  filename: string;
  url: string;
};

export class DownloadEssentialFilesService
  implements DownloadEssentialFilesServiceInterface
{
  private readonly essentialFiles: EssentialFile[] = [];

  constructor(private readonly fileConfig: FileConfig) {
    this.essentialFiles = [
      {
        url: 'https://pub-544932489c1141f39f9ec4891aa4b222.r2.dev/GrandFantasia.exe',
        directory: this.fileConfig.gameDirectory,
        filename: 'GrandFantasia.exe',
      },
      {
        url: 'https://pub-544932489c1141f39f9ec4891aa4b222.r2.dev/Plugin.dll',
        directory: this.fileConfig.gameDirectory,
        filename: 'Plugin.dll',
      },
      {
        url: 'https://pub-544932489c1141f39f9ec4891aa4b222.r2.dev/fog.dll',
        directory: this.fileConfig.gameDirectory,
        filename: 'fog.dll',
      },
    ];
  }

  public async execute(): Promise<void> {
    const promises = this.essentialFiles.map((essentialFile, index) => {
      if (
        this.fileConfig.exists({
          directory: essentialFile.directory,
          filename: essentialFile.filename,
        })
      ) {
        console.log(
          `[DownloadEssentialFilesService] Essential file ${index} exist`,
        );

        return Promise.resolve();
      }

      console.log(
        `[DownloadEssentialFilesService] Essential file ${index} doesn't exist, downloading...`,
      );

      return this.fileConfig.download({
        directory: essentialFile.directory,
        filename: essentialFile.filename,
        url: essentialFile.url,
        id: essentialFile.url,
      });
    });

    await Promise.all(promises);
  }
}
