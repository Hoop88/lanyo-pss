package com.lanyotech.pps.mvc;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.MapUtils;

import com.easyjf.container.annonation.Action;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Globals;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

@Action
public class PortalDemoAction extends AbstractPageCmdAction {
	/**
	 * 只是用于测试后台参数
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	public Page doGetPortalReport(WebForm form) throws Exception {
		Map<?, ?> map = form.getTextElement();
		int width = MapUtils.getInteger(map, "width", 502);
		int height = MapUtils.getInteger(map, "height", 297);
		String bbImg = MapUtils.getString(map, "img", "baobiao.jpg");
		HttpServletResponse response = ActionContext.getContext().getResponse();
		response.setContentType("image/jpg");
		String imgPath = Globals.APP_BASE_DIR + "//data//chart//" + bbImg;
		java.io.FileInputStream in = new FileInputStream(imgPath);
		Image img = ImageIO.read(in);
		BufferedImage tag = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		tag.getGraphics().drawImage(img, 0, 0, width, height, null);
		ServletOutputStream out = response.getOutputStream();
		JPEGImageEncoder encoder = com.sun.image.codec.jpeg.JPEGCodec.createJPEGEncoder(out);
		encoder.encode(tag);
		return Page.nullPage;
	}
}
