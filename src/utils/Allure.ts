import { allure as mochaAllure } from 'allure-mocha/runtime';
import { default as allure } from '@wdio/allure-reporter';
import dotenv from 'dotenv';
import winston from 'winston';
dotenv.config();

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [new winston.transports.Console()]
});

/**
 * @description: Class for Allure Reporter functions
 */
export class Allure {
  /**
   * This method outputs logs into generated Allure Report
   *
   * @param desc description to be included on the logstep
   */
  logStep = async (desc: string) => {
    if (process.env.npm_lifecycle_script?.includes('mocha')) {
      mochaAllure.logStep(desc);
    } else {
      allure.addStep(desc);
    }
    // Use the winston logger to log the desc
    logger.info(desc);
  };

  /**
   * This method outputs logs into generated Allure Report
   *
   * @param desc description to be included on the attachment
   */
  attachment = async (desc: string, content: string) => {
    if (process.env.npm_lifecycle_script?.includes('mocha')) {
      mochaAllure.attachment(desc, JSON.stringify(JSON.parse(content), null, 2), 'text/plain');
    } else {
      allure.addAttachment(desc, JSON.stringify(JSON.parse(content), null, 2), 'text/plain');
    }
    //log the desc and content
    logger.info(`${desc}: ${content}`);
  };
}

export default new Allure();
