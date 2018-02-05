<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CtrlUserAppFrame.ascx.cs" Inherits="Zj.WebFrame.PC.Web.Votes.CtrlUserAppFrame" %>

<table width="100%" height="100%" border="0" style="position:relative;height:100%" cellpadding="0" cellspacing="5"> 
		<tr id="mainTitle"  style="display:none;">
			<td height="21">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="21" height="21" class="ImgBanTop1">
                                
							</td>
							<td class="ImgBanTop2" id="banTitleTd"></td>
							<td width="92" align="left" class="ImgBanTop3">
                                
							</td>
						</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td valign="top" height="100%" bgcolor="#ffffff" id='FuncPane<%="SELF_PORTAL_FUNCTION_ID"%>'>
				<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td valign="top" class="BanBgColor" style="PADDING-RIGHT:3px; PADDING-LEFT:3px; PADDING-BOTTOM:3px; PADDING-TOP:3px">
                        
                            <iframe id="frmUserAppFrame" width="100%" height="100%" frameborder="0" scrolling="auto" src="./UserAppIndex.aspx"></iframe>
						</td>
					</tr>
					<tr>
						<td class="BanBgColor" height="5"><table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="5" height="5" class="ImgBanBottom1">	</td>
									<td> </td>
									<td width="5" height="5" class="ImgBanBottom2">	</td>
								</tr>
							</table></td>
						
					</tr>
				</table>
			</td>
		</tr>
</table>