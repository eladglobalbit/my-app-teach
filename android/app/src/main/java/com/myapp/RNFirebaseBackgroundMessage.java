//imports
package com.myapp;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;


//creating the service class
public class RNFirebaseBackgroundMessage extends HeadlessJsTaskService {

    public static void startService(@NonNull Context context) {
        //if (!AppDetector.isAppInForeground(context)) {
        Intent intentService = new Intent(context, RNFirebaseBackgroundMessage.class);
        context.startService(intentService);
        //    HeadlessJsTaskService.acquireWakeLockNow(context);
        //}
    }

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
      return new HeadlessJsTaskConfig(
          "RNFirebaseBackgroundMessage",
          null,
          5000);
  }



  
}