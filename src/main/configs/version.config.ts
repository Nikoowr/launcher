export class VersionConfig {
  public versionIsGreater(versionOne: string, versionTwo: string): boolean {
    const components1 = versionOne.replace('v', '').split('.').map(Number);
    const components2 = versionTwo.replace('v', '').split('.').map(Number);

    // Determine the greater number of components between the two versions
    const maxLength = Math.max(components1.length, components2.length);

    for (let i = 0; i < maxLength; i++) {
      // Use 0 as the default value for missing components
      const num1 = components1[i] ?? 0;
      const num2 = components2[i] ?? 0;

      // Compare numeric components
      if (num1 > num2) {
        return true;
      } else if (num1 < num2) {
        return false;
      }
      // If components are equal, continue to the next component
    }

    // All comparable parts are equal, so the versions are considered equal
    return false;
  }
}

export const versionConfig = new VersionConfig();
