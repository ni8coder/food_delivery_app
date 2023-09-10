//
//  RCTCalendarModule.m
//  food_delivery
//
//  Created by Muhammad Awais Iqbal on 07/09/2023.
//

#import "RCTCalendarModule.h"
#import <React/RCTLog.h>

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *eventId = @123;
  
  if (eventId) {
      resolve(eventId);
    } else {
      reject(@"event_failure", @"no event id returned", nil);
    }
  
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event", @"ANOTHER_EVENT_NAME": @"Another Event" };
}

@end
