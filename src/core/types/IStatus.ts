export interface IStatus {
  /**
   * Identifier for specific state
   */
  type: string;
  /**
   * The status name
   */
  name: string;
  /**
   * The explanation of the status
   */
  explanation: string;
}
